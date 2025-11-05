"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const { user, handleLogout } = useAuth();
  const router = useRouter();
  console.log("Header user:", user);
  if (!user) return null; // não mostra header se não estiver logado

  const firstName = user.displayName?.split(" ")[0] || "Usuário";
  const photoURL = user.photoURL || "/default-avatar.png"; // coloque um avatar padrão se não tiver

  const logoutUser = async () => {
    await handleLogout();
    router.push("/login");
  };

  return (
    <header className="fixed top-0 z-50 w-full border-0  flex justify-between items-center p-6 text-white">
      <div className="flex items-center gap-3">
        <Image
            src={photoURL}
            alt="Avatar"
            width={48}
            height={48}
            className="rounded-full object-cover"
        />
        <div>
          <p className="font-bold text-lg">Olá, {firstName}!</p>
          <p className="text-sm opacity-90">Bem-vindo de volta</p>
        </div>
      </div>

      <button
        onClick={logoutUser}
        className="bg-white text-black text-lg px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Sair
      </button>
    </header>
  );
}
