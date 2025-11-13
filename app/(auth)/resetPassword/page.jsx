"use client";

import { useAuth } from "@/context/AuthContext";
// components
import Loading from "@/components/Loading";
import ResetPasswordForm from "@/components/Forms/AuthForms/ResetPasswordForm";

export default function ResetPassword() {
  
  const { loading } = useAuth(); // pega as funções do contexto
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
