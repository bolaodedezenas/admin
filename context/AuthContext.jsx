"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db} from "@/libs/firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore"; // <-- importa doc/getDoc
import { loginWithGoogle, logout } from "@/libs/firebase/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // 🔥 Listener para mudanças de login e logout
    const unsubscribeAuth = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const snap = await getDoc(docRef);
        // Aguardar 1 segundo antes de atualizar o estado
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (snap.exists()) {
          setUser({ uid: firebaseUser.uid, ...snap.data() });
        } else {
          setUser(firebaseUser);
        }

        localStorage.setItem('Photo', JSON.stringify(firebaseUser.photoURL));
      } else {
        setUser(null);
      }
    });

    // 🔥 Listener para mudanças no ID Token (renovação automática do Firebase)
    const unsubscribeToken = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const newToken = await user.getIdToken();
        setUserToken(newToken);
      } else {
        setUserToken(null);
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });

    // ✅ remover
    return () => {
      unsubscribeAuth();
      unsubscribeToken();
    };
  }, []);

  const handleLoginWithGoogle = async () => {
    const { user, error } = await loginWithGoogle();
    if (error) return { error };
    return { user };
  };

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null); // atualiza o state do contexto setUser(null);
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, userToken, setUser, setLoading, handleLoginWithGoogle, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
