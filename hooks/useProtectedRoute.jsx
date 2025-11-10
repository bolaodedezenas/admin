"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const useProtectedRoute = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // se não estiver logado, redireciona para login
    }
  }, [user, loading, router]);
};

export default useProtectedRoute;