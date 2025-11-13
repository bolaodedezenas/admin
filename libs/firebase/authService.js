import { auth, googleProvider, db } from './FirebaseConfig';
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';


export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const id = result.user.uid;

    const data = {
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      phone: '',
      cep: '',
      state: '',
      city: '',
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
    const snap = await getDoc(doc(db, 'users', id));
    return { user: { id, ...snap.data() } };
  } catch (error) {
    return { error };
  }
};

// Verifica se o usuário existe
export async function userExists(id) {
  try {
    const userRef = doc(db, 'users', id);
    const snapshot = await getDoc(userRef);
    return snapshot.exists();
  } catch (error) {
    console.error('Erro ao verificar usuário:', error);
    return false;
  }
}

// Login com email e senha
export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    if (!user.emailVerified) {
      await signOut(auth);
      return {
        error: new Error("Seu e-mail ainda não foi verificado. Verifique sua caixa de entrada."),
      };
    }

    return { user };
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
    await signOut(auth);

    const user = result.user;
    if (!user?.uid) {
      return { error: new Error('Não foi possível criar o usuário.') };
    }

    // Envia e-mail de verificação
    await sendEmailVerification(user);

    // salva os dados no banco
    const saved = await saveUser(user.uid, Data);
    return { user: saved.user };
  } catch (error) {
    return { error };
  }
};

// salva o usuário no banco
export async function saveUser(id, data) {
  try {
    const userRef = doc(db, 'users', id);
    const userData = {
      ...data,
      createdAt: serverTimestamp(),
    };

    await setDoc(userRef, userData, { merge: true });

    return {
      success: true,
      user: { id, ...userData },
    };
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return { success: false, error };
  }
}

// Envia e-mail de redefinição de senha
export async function sendPasswordReset(email) {
  try {
    // Defina actionCodeSettings com a URL da sua página
    const actionCodeSettings = {
      url: 'https://www.bolaodedezenas.com.br/resetPassword', // sua página
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings);

    return { ok: true, message: 'E-mail enviado com sucesso!' };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

export  async function  handleResetPassword(oobCode, password) {
  try {
    // Aqui fazemos o reset da senha usando o oobCode
    await confirmPasswordReset(auth, oobCode, password);
    return {status: true, message: 'Senha redefinida com sucesso!'};
  } catch (error) {
    return  {status: false, message: error.message};
  }
};
