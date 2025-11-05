"use client";
import { useAuth } from "@/context/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import FallingBalls from "@/components/FallingBalls";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();
  useProtectedRoute();

  const { user, loading } = useAuth();

   useEffect(() => {
      if (loading && !user) {
        router.replace("/login"); // usuário já logado vai para raiz
      }
    }, [user, loading, router]);

  if (loading || !user) return <Loading />;

  return (
    <main className="min-h-screen flex gap-2 flex-col items-center justify-center bg-black p-4">
      <Header />
      <FallingBalls count={8} /> {/* Número de bolas */}
      <h1 className="sm:text-[4.3rem] text-[2.2rem] text-center  text-white  font-bold justify-center position:relative z-10 "> Bolão de Dezenas</h1>
      <p className="sm:text-[2.3rem]  text-[1.7rem]  text-center text-white position:relative z-10 ">Em construção!</p>
    </main>
  );
}
