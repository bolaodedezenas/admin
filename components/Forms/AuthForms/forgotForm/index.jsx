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
import {sendPasswordReset} from "@/libs/firebase/authService";
// toast
import toast from "react-hot-toast";

export default function SignInForm() {
    const router = useRouter();
    const perfil = JSON.parse(localStorage.getItem("Photo")) || null;
    const [email, setEmail] = useState("");
    const [time , setTime] = useState(0);

    async function hendleSubmit(e) {
        e.preventDefault();
        if (!email) return toast.error('Por favor, preencha todos os campos!');
        if(time > 0) return toast.error('Por favor, aguarde o tempo para enviar outro e-mail.');
        
        const res = await sendPasswordReset(email);
        console.log(res);
        if (res.ok === false) return toast.error(res.error);
        if (res.ok === true) {
            setTime(60);
            startCountdown();
            toast.success('Email enviado com sucesso!');
        }
    }

    // Contagem regressiva
    function startCountdown() {
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return (
      <FormLayout>
        <form
          onSubmit={(e) => hendleSubmit(e)}
          className='w-full flex flex-col items-center pt-2 pb-5'
        >
          {perfil === null ? (
            <Icon
              className='rounded-full '
              name='account_circle'
              size={50}
              color='rgb(var(--icon))'
            />
          ) : (
            <Image
              src={perfil}
              alt='Foto de perfil'
              width={50}
              height={50}
              className='rounded-full mb-1.5 mt-1.5'
            />
          )}
          <Title text='Recuperar Senha' />
          <p className='pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal'>
            Entre com seus dados abaixo:
          </p>
          <div className='w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5 mt-8 '>
            <InputLayout>
              <Label id='email'>Email *</Label>
              <InputUi
                id='email'
                type='email'
                placeholder='Email@example.com'
                autocomplete='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputLayout>
          </div>
          <p className='w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mb-4'>
            Lembrou sua senha?{" "}
            <span
              className='text-[rgb(var(--text-links))] font-bold cursor-pointer hover:underline text-[1rem]'
              onClick={() => router.replace('/login')}
            >
              Entrar
            </span>
          </p>
          <div className='w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5  '>
            <span
              className={` display: ${
                time > 0 ? 'block' : 'hidden'
              } font-semibold text-[rgb(var(--text))] text-[1.4rem] pb-1 text-center texte-[rgb(var(--text))]`}
            >
              {time}
            </span>
            <SignInButton text='Enviar' />
          </div>
          <p className='w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mt-4'>
            Não tem uma conta?{" "}
            <span
              className='text-[rgb(var(--text-links))] cursor-pointer hover:underline '
              onClick={() => router.replace('/register')}
            >
             Cadastre-se agora
            </span>
          </p>
        </form>
      </FormLayout>
    );
}
