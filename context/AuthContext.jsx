"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db} from "@/libs/firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore"; // <-- importa doc/getDoc
import { loginWithGoogle, logout, loginWithEmail } from "@/libs/firebase/authService";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);



  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribeAuth = auth.onAuthStateChanged(async (firebaseUser) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (!firebaseUser) {
          console.log('❌ Usuário não logado');
          setUser(null);
          setLoading(false)
          return;
        }

        if (firebaseUser) {
          //Verifica se o e-mail foi confirmado
          if (!firebaseUser.emailVerified && !isRegistering) {
            console.log('❌ E-mail nao verificado');
            setLoading(false);
            return;
          }

          const docRef = doc(db, 'users', firebaseUser.uid);
          const snap = await getDoc(docRef);

          if (snap.exists()) {
            setUser(snap.data());
            localStorage.setItem('Photo', JSON.stringify(snap.data().photoURL));
          } else {
            setUser(firebaseUser);
            localStorage.setItem('Photo', JSON.stringify(firebaseUser.photoURL));
          }

          setLoading(false)
          setIsRegistering(false);
        }
        
      });

      // verifica se o token mudou para atualizar o state do contexto 
      const unsubscribeToken = auth.onIdTokenChanged(async (user) => {
        if (user) {
          const newToken = await user.getIdToken();
          setUserToken(newToken);
        } else {
          setUserToken(null);
        }
      });
      
      return () => {
        unsubscribeAuth();
        unsubscribeToken();
      };
    } catch (error) {
      console.error('Erro no useEffect:', error);
    }
  }, []);


  const handleLoginWithGoogle = async () => {
    const { user, error } = await loginWithGoogle();
    if (error) return { error };
    return { user };
  };

  const handleLoginWithEmail = async (email, password) => {
    setLoading(true);
    const { user, error } = await loginWithEmail(email, password);
    if (error) return { error };
    setUser(user);
    return { user };
  };

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null); // atualiza o state do contexto setUser(null);
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, userToken,setIsRegistering,  setUser, setLoading, handleLoginWithGoogle, handleLoginWithEmail,  handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
