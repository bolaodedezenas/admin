"user client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// components
import FormLayout from "@/components/Forms/FormLayout";
import Label from "@/components/Label";
import InputUi from "@/components/InputUi";
import SignInButton from "@/components/Btns/SignInButton";
import Title from "@/components/Title";
import InputLayout from "@/components/InputLayout";
//icons
import Icon from "@/components/Icon";

export default function SignInForm({ onGoogleLogin, onEmailLogin,  visible }) {
    const router = useRouter();
    const perfil = JSON.parse(localStorage.getItem("Photo")) || null;

    const [showPassword, setShowPassword] = useState(true);

  return (
    <FormLayout visible={visible}>
        <form onSubmit={(e) => onEmailLogin(e)} className="w-full flex flex-col items-center pt-2 pb-5">
            {perfil === null ?
                <Icon 
                    className="rounded-full "
                    name="account_circle" 
                    size={50} 
                    color="rgb(var(--icon))" 
                /> :
                <Image
                    src={perfil}
                    alt="Foto de perfil" 
                    width={50}
                    height={50} 
                    className="rounded-full mb-1.5 mt-1.5"
                />
            }
            <Title text="Recuperar Senha" />
            <p className="pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal">Entre com seus dados abaixo:</p>
            <InputLayout>
                <Label id="email">Email</Label>
                <InputUi 
                    id="email" 
                    type="email" 
                    placeholder="Email@example.com" 
                    autocomplete="email" 
                    required
                />
            </InputLayout>
                   
            <p className="w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mb-4">Lembrou sua  senha? 
                <span 
                    className="text-[rgb(var(--text-links))] font-bold cursor-pointer hover:underline"
                    onClick={() => router.replace('/loginr')}
                >
                    Entrar
                </span>
            </p>
            <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5  ">
                <SignInButton   text="Enviar"/>
            </div>
             <p className="w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mt-4">Não tem uma conta? 
                <span 
                    className="text-[rgb(var(--text-links))] cursor-pointer hover:underline"
                    onClick={() => router.replace('/register')}
                >
                    Cadastre-se agora
                </span>
            </p>
        </form>
    </FormLayout>
  );
}