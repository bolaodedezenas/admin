"user client";

import { useRef, useState } from "react";
import Image from "next/image";
// components
import FormLayout from "@/components/Forms/FormLayout";
import Label from "@/components/Label";
import InputUi from "@/components/InputUi";
import { FiEyeOff } from "react-icons/fi";
import SignInButton from "@/components/Btns/SignInButton";
import { FiEye } from "react-icons/fi";
import GoogleButton from "@/components/Btns/GoogleButton";
//icons
import Icon from "@/components/Icon";

export default function SignInForm({ onGoogleLogin, onEmailLogin,  visible }) {
    const perfil = JSON.parse(localStorage.getItem("Photo")) || null;
    console.log(perfil);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
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
                    src={perfil}        // caminho da imagem
                    alt="Foto de perfil" 
                    width={50}         // largura em px
                    height={50}        // altura em px
                    className="rounded-full mb-1.5 mt-1.5"
                />
            }
            <h1 className="text-[rgb(var(--text-title))] text-[1.2rem] font-bold">Acesso ao Painel</h1>
            <p className="pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal">Entre na sua conta com seus dados abaixo:</p>
            <div className="min-w-[98%] sm:min-w-[85%] pl-5  pr-5 mt-8 ">
                
                <div 
                    onClick={() => emailRef.current?.focus()}
                    className="flex items-center justify-center  bg-[rgb(var(--input-bg))] rounded-[5px] mb-4 cursor-pointer flex-col h-13 position: relative pl-4"
                >
                    <Label id="email">Email</Label>
                    <InputUi 
                        ref={emailRef} 
                        id="email" 
                        type="email" 
                        placeholder="Email@example.com" 
                        autocomplete="email" 
                    />
                </div>
                
                <div 
                    onClick={() => passwordRef.current?.focus()}
                    className="flex items-center justify-center  bg-[rgb(var(--input-bg))] rounded-[5px] cursor-pointer flex-col h-13 position: relative pl-4"
                >
                    <Label id="password">Senha</Label>
                    <InputUi 
                        ref={passwordRef} 
                        id="password" 
                        type={showPassword ? "password" : "text"} 
                        placeholder="Digite sua senha" 
                        autocomplete="new-password"
                    />
                    {showPassword ? 
                        <FiEyeOff onClick={(e) => {e.stopPropagation(); setShowPassword(false)}}  className=" 
                        text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem]  cursor-pointer position: absolute right-4" /> 
                        :
                        <FiEye onClick={(e) => {e.stopPropagation(); setShowPassword(true)}} className="
                        text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer position: absolute right-4"  />
                    }
                </div>

            </div>
            <p className="text-[rgb(var(--text))] text-[0.9rem] w-full text-center cursor-pointer hover:underline mb-3.5 mt-3 italic font-medium">Esqueceu a senha?</p>
            <div className="min-w-[98%] sm:min-w-[85%] pl-5  pr-5  ">
                <SignInButton  text="Entrar"/>
            </div>
            <p className="text-[rgb(var(--text))] text-[0.9rem] font-medium text-center mt-1.5 mb-1.5">OU CONTINUAR COM</p>
            <div className="min-w-[98%] sm:min-w-[85%] pl-5  pr-5  ">
                <GoogleButton onClick={() => {onGoogleLogin()}} />
            </div>
            <p className="w-[190px] sm:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mt-4">Não tem uma conta? <span className="text-[rgb(var(--text-links))] cursor-pointer hover:underline">Cadastre-se agora</span></p>
        </form>
    </FormLayout>
  );
}