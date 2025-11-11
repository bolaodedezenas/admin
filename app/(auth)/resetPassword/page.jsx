"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
// components
import Loading from "@/components/Loading";
import ResetPasswordForm from "@/components/Forms/AuthForms/ResetPasswordForm";

export default function ResetPassword() {
  const router = useRouter();
  const { user, loading } = useAuth(); // pega as funções do contexto

   useEffect(() => {
    if (user) {
      if (user?.status) router.replace('/');
      if(user?.status === false) return router.replace('/welcome');
    }
  }, [user,  router]);
  if (loading) return  <Loading />;

  return (
    <div
      className='
      min-h-screen 
      flex items-center justify-center flex-col
      bg-gradient-to-t from-[rgb(var(--background-secundary))] to-[rgb(var(--background))]
      p-4
      sm:p-10
      '
    >
      <ResetPasswordForm />
    </div>
  );
}
