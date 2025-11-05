"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";


export default function LoginPage() {

  const router = useRouter();
  const { handleEmailLogin, handleLoginWithGoogle, user, loading } = useAuth(); // pega as funções do contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



   useEffect(() => {
    if (!loading && user) {
      router.replace("/"); // usuário já logado vai para raiz
    }
  }, [user, loading, router]);

  if (loading || user) return  <Loading />;

  // Login com email e senha
  const onEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { user, error } = await handleEmailLogin(email, password);
    if (error) return setError("Email ou senha inválidos.");
    alert(`Login realizado! Bem-vindo, ${user.displayName || user.email}`);
    // router.push("/dashboard")
  };

  // Login com Google
  const onGoogleLogin = async () => {
    setError("");
    const { user, error } = await handleLoginWithGoogle();
    if (error) return setError("Erro ao entrar com Google.");
    // Exemplo dentro do onEmailLogin ou onGoogleLogin
    if (user) {
      router.push("/"); // redireciona para a página raiz
    }
    // router.push("/dashboard")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] px-4">
      <div className="w-full max-w-[360px] bg-white p-6 rounded-[20px] shadow-lg">
        <h1 className="text-3xl text-[#3d3d3d] font-bold mb-6 text-center">Login</h1>
        {error && (
          <div className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={onEmailLogin} className="space-y-6">
          <div>
            <label className="block mb-1 text-2xl text-[#3a3a3a] font-bold">Email</label>
            <input
              type="email"
              className="w-full text-lg text-black font-medium border-0 bg-[#f2f2f2] px-5 py-3 rounded outline-none placeholder-[#7e7e7e] hover:bg-[#eeeeee] cursor-pointer transition-colors duration-300"
              placeholder="seuemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-2xl text-[#3d3d3d] font-bold">Senha</label>
            <input
              type="password"
              className="w-full text-lg text-black font-medium border-0 bg-[#f2f2f2] px-5 py-3 rounded outline-none placeholder-[#7e7e7e] hover:bg-[#eeeeee] cursor-pointer transition-colors duration-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white text-xl py-3 rounded shadow-md hover:bg-cyan-700 transition-colors duration-800 cursor-pointer font-bold"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={onGoogleLogin}
            className="w-full border border-gray-300 text-[#3d3d3d] py-3 rounded flex items-center justify-center gap-2 hover:bg-[#f2f2f2f2] transition-colors duration-800 cursor-pointer text-[1rem]"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Entrar com Google
          </button>
        </div>

        <p className="flex justify-center items-center gap-2 text-center text-[#3d3d3d] text-sm mt-6">
          Não tem conta?
          <a
            href="/auth/register"
            className="text-cyan-600 hover:underline hover:text-cyan-800 font-400"
          >
            Criar conta
          </a>
        </p>
      </div>
    </div>
  );
}
