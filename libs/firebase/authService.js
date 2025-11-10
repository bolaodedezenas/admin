import { auth, googleProvider, db } from "./FirebaseConfig";
import { signInWithPopup, signOut, createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

export const loginWithGoogle = async () => {

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const id = result.user.uid;

    const data = {
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      phone: "",
      cep: "",
      state: "",
      city: "",
      terms: true,
      permissions: [],
      status: false,
    };

    const exists = await userExists(id);
    if (!exists) {
      const saved = await saveUser(id, data);
      return { user: saved.user };
    }
    // usuário já existe → pega os dados do db
    const snap = await getDoc(doc(db, "users", id));
    return { user: {id, ...snap.data() } };
  } catch (error) {
    return { error };
  }
};


// Verifica se o usuário existe
export async function userExists(id) {
  try {
    const userRef = doc(db, "users", id);
    const snapshot = await getDoc(userRef);
    return snapshot.exists(); 
  } catch (error) {
    console.error("Erro ao verificar usuário:", error);
    return false;
  }
}

// Login com email e senha
export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user };
  } catch (error) {
    return { error };
  }
};

// desloga o usuário
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const registerWithEmail = async (email, password, formData) => {
  try {
    // remove password 
    const { password: _, ...Data } = formData;

    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    if (!user?.uid) {
      return { error: new Error("Não foi possível criar o usuário.") };
    }
    // salva os dados no banco
    await saveUser(user.uid,  Data);
    return { user };
  } catch (error) {
    return { error };
  }
};

// salva o usuário no banco
export async function saveUser(id, data) {
  try {
    const userRef = doc(db, "users", id);
    const userData = {
      ...data,
      createdAt: serverTimestamp(),
    };

    await setDoc(userRef, userData, { merge: true });

    return {
      success: true,
      user: { uid: id, ...userData }
    };
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
    return { success: false, error };
  }
}
