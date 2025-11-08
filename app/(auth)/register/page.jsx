"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import SignUpForm from "@/components/Forms/AuthForms/SignUpForm";


export default function LoginPage() {
  const router = useRouter();
  const { handleEmailLogin, handleLoginWithGoogle, user, loading, setLoading  } = useAuth(); // pega as funções do contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

   useEffect(() => {
    if (user) {
      router.replace("/"); // usuário já logado vai para raiz
    }
  }, [user, router]);


  // Login com email e senha
  const onRegister = async (e) => {
    e.preventDefault();
    // setError("");
    // const { user, error } = await handleEmailLogin(email, password);
    // if (error) return setError("Email ou senha inválidos.");
    // alert(`Login realizado! Bem-vindo, ${user.displayName || user.email}`);
    // router.push("/dashboard")
  };

   if (loading) return  <Loading />;

  return (
    <div className="
      min-h-screen 
      flex items-center justify-center flex-col
      bg-gradient-to-t from-[rgb(var(--background-secundary))] to-[rgb(var(--background))]
      px-3
      sm:p-4
      "
    >
      <SignUpForm visible={visible}  onRegister={onRegister} />
      {/* <p className={`${visible ? "hidden" : "flex"} font-light text-[0.9rem] text-[rgb(var(--white))] mt-8`}>Tecnologia desenvolvida por Rixxer</p> */}
    </div>
  );
}
