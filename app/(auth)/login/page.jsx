"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
// components
import Loading from "@/components/Loading";
import SignInForm from "@/components/Forms/AuthForms/SignInForm";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth(); // pega as funções do contexto

   useEffect(() => {
    if (user) {
      console.log(user.status);
      if(user?.status === false) return router.replace('/welcome');
      if(user?.status) router.replace("/");
    }
  }, [user, router]);
  if (loading) return  <Loading />;

  return (
    <div className="
      min-h-screen 
      flex items-center justify-center flex-col
      bg-gradient-to-t from-[rgb(var(--background-secundary))] to-[rgb(var(--background))]
      p-4
      sm:p-10
      "
    >
      <SignInForm />
      <p className={`font-light text-[0.9rem] text-[rgb(var(--white))] mt-8`}>Tecnologia desenvolvida por Rixxer</p>
    </div>
  );
}
