"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
//components
import Icon from "@/components/Icon";

export default function Header() {
  const perfil = JSON.parse(localStorage.getItem("Photo")) || null;
  const { user, handleLogout } = useAuth();
  const router = useRouter();

  const userName = user.name?.split(" ")[0] || user.displayName?.split(" ")[0] || "usuário";
  const photoURL = user.photoURL
  const logoutUser = async () => {
    try {
      await handleLogout();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-0  flex justify-between items-center p-6 text-white">
      <div className="flex items-center gap-3">
        {perfil === null ?
          <Icon 
              className="rounded-full "
              name="account_circle" 
              size={50} 
              color="rgb(var(--white))" 
          /> :
          <Image
              src={perfil || photoURL}        // caminho da imagem
              alt="Foto de perfil" 
              width={50}         // largura em px
              height={50}        // altura em px
              className="rounded-full object-cover"
          />
       }
        <div>
          <p className="font-bold text-lg">Olá, {userName}!</p>
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
