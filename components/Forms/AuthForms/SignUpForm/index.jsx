"user client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function SignUpForm({ onGoogleLogin, onEmailLogin,  visible }) {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(true);

  return (
    <FormLayout visible={visible}>
        <form onSubmit={(e) => onEmailLogin(e)} className="w-full flex flex-col items-center pt-2 pb-5">
            <Icon 
                className="rounded-full"
                name="Diamond" 
                size={50} 
                color="rgb(var(--icon))" 
            />
            <h1 className="text-[rgb(var(--text-title))] text-[1.2rem] font-bold">Criar Conta</h1>
            <p className="pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal">Registre-se
                e Comece a ganhar hoje!</p>
            <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5 mt-8 ">
                
                <div 
                    className="flex items-center justify-center  bg-[rgb(var(--input-bg))] rounded-[5px] mb-4 cursor-pointer flex-col h-13 position: relative pl-4"
                >
                    <Label id="email">Email</Label>
                    <InputUi 
                        id="email" 
                        type="email" 
                        placeholder="Email@example.com" 
                        autocomplete="email" 
                    />
                </div>
                
                <div 
                    className="flex items-center justify-center  bg-[rgb(var(--input-bg))] rounded-[5px] mb-4 cursor-pointer flex-col h-13 position: relative pl-4"
                >
                    <Label id="password">Senha</Label>
                    <InputUi 
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

                <div 
                    className="flex items-center justify-center  bg-[rgb(var(--input-bg))] rounded-[5px] mb-4 cursor-pointer flex-col h-13 position: relative pl-4"
                >
                    <Label id="password-confirm">Confirme a Senha</Label>
                    <InputUi 
                        id="password-confirm" 
                        type={showPassword ? "password" : "text"} 
                        placeholder="Repita sua senha" 
                        autocomplete="new-password"
                    />
                </div>

                <div 
                    className="flex items-center justify-center  bg-[rgb(var(--input-bg))] rounded-[5px] mb-4 cursor-pointer flex-col h-13 position: relative pl-4"
                >
                    <Label id="tel">Telefone</Label>
                    <InputUi 
                        id="tel" 
                        type="text" 
                        placeholder="(99) 99999-9999" 
                        autocomplete="new-tel"
                    />
                </div>

                <div 
                    className="flex items-center justify-center  bg-[rgb(var(--input-bg))] rounded-[5px] mb-4 cursor-pointer flex-col h-13 position: relative pl-4"
                >
                    <Label id="uf">Estado</Label>
                    <InputUi 
                        id="uf" 
                        type="text" 
                        placeholder="Escolha seu estado" 
                    />
                    <Icon 
                        name="keyboard_arrow_down" 
                        size={30} 
                        color="rgb(var(--icon-secundary)) "
                        className="block cursor-pointer position: absolute right-2 top-4" 
                    />
                        
                </div>

                <div 
                    className="flex items-center justify-center  bg-[rgb(var(--input-bg))] rounded-[5px]
                    mb-4 cursor-pointer flex-col h-13 position: relative pl-4"
                >
                    <Label id="city">Cidade</Label>
                    <InputUi 
                        id="city" 
                        type="text"
                        placeholder="Escolha sua cidade" 
                    />
                    <Icon 
                        name="keyboard_arrow_down" 
                        size={30} 
                        color="rgb(var(--icon-secundary)) "
                        className="block cursor-pointer position: absolute right-2 top-4" 
                    />
                </div>

                <div 
                     className="flex items-center  mb-4 cursor-pointer  gap-3"
                    >
                        <InputUi 
                            type={"checkbox"} 
                            width={"20px"}
                            height={"20px"}
                        />
                        <p className="text-[rgb(var(--text))] text-[0.9rem] font-medium">Concordo com os 
                            <span className="text-[rgb(var(--text-links))] cursor-pointer hover:underline">Termos</span>  e a <span className="text-[rgb(var(--text-links))] cursor-pointer hover:underline">Política</span>
                        </p>
                </div>
            </div>

            <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5  ">
                <SignInButton  text="Criar Conta"/>
            </div>
            
            <p className="text-[rgb(var(--text))] text-[0.9rem] font-medium text-center mt-1.5 mb-1.5">
                OU CONTINUAR COM
            </p>

            <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5  ">
                <GoogleButton onClick={() => {onGoogleLogin()}} />
            </div>

            <p className="w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mt-4">Já tem conta?    <span className="text-[rgb(var(--text-links))] cursor-pointer hover:underline font-bold"
                onClick={() => router.replace('/login')}
            >
                Entrar
            </span>
            </p>
        </form>
    </FormLayout>
  );
}