"use client";
import { useAuth } from "@/context/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import FallingBalls from "@/components/FallingBalls";
import Header from "@/components/Header";

export default function Painel() {
  const router = useRouter();
  useProtectedRoute();
  const { user, loading} = useAuth();

   useEffect(() => {
     if (!user) {
       router.replace('/login'); // usuário já logado vai para raiz
     }
    //  if(!user.status) router.replace('/welcome');
   }, [user,  loading,  router]);

  if (loading) return  <Loading />;


  return (
    <main className="min-h-screen flex  flex-col items-center justify-center bg-black p-4">
      <Header />
      <FallingBalls count={8} /> {/* Número de bolas */}
      <h1 className="text-[2rem] sm:text-[4.3rem] lg:text-[6rem] text-center  text-white  font-bold justify-center position:relative z-10 "> Bolão de Dezenas</h1>
      <p className="text-[1.5rem] sm:text-[2rem] lg:text-[3rem]  text-center text-white position:relative z-10 ">Em construção!</p>
    </main>
  );
}
