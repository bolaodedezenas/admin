'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/schemas/authSchemas';
// components
import FormLayout from '@/components/Forms/FormLayout';
import Label from '@/components/Label';
import InputUi from '@/components/InputUi';
import SignInButton from '@/components/Btns/SignInButton';
import Title from '@/components/Title';
import InputLayout from '@/components/InputLayout';
import { FiEyeOff, FiEye } from 'react-icons/fi';
// toast
import toast from 'react-hot-toast';
// context
import { useAuth } from '@/context/AuthContext';
// icons
import Icon from '@/components/Icon';
import  {handleResetPassword }from '@/libs/firebase/authService';
import { auth } from '@/libs/firebase/FirebaseConfig';
import { verifyPasswordResetCode } from 'firebase/auth';

export default function ResetPasswordForm() {
  const { setLoading } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [oobCode, setOobCode] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);


   useEffect(() => {
     const query = new URLSearchParams(window.location.search);
     const code = query.get('oobCode');
     if (!code) { 
      // toast.error('Código inválido ou ausente na URL.')
      return;
     }
       
     setOobCode(code);

     verifyPasswordResetCode(auth, code)
       .then((email) => {
         // Código válido
         console.log('Código válido para o e-mail:', email);
         setIsValidCode(true);
       })
       .catch((err) => {
         // Código inválido ou expirado
         console.error(err);
         toast.error('O link de redefinição é inválido ou expirou.');
         setIsValidCode(false);
       });
   }, []);

  const hendleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm)
      return toast.error(
        'Ops!, senhas diferentes verifique e tente novamente .'
      );

    // Validação com Zod
    const result = await registerSchema.safeParseAsync(password);
    if (!result.success) {
      const Error = result.error.issues[0].message;
      toast.error(Error);
      return;
    }

    const success = await handleResetPassword(oobCode, password, toast);
    if (!success) return 

    setLoading(true);
    toast.success('Senha redefinida com sucesso!');
  };

  return (
    <>
      {isValidCode ? 
      <FormLayout>
        <form
          onSubmit={hendleSubmit}
          className='w-full flex flex-col items-center pt-5 pb-10'
        >
          <Icon
            className='rounded-full '
            name='Security'
            size={50}
            color='rgb(var(--icon))'
          />
          <Title text='Redefinição de Senha' />
          <p className='pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal'>
            Por favor, preencha os campos abaixo!
          </p>
          <div className='w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5 mt-5'>
            <InputLayout>
              <Label id='password'>Senha *</Label>
              <InputUi
                id='password'
                type={showPassword ? 'password' : 'text'}
                placeholder='Digite sua senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autocomplete='new-password'
              />
              {showPassword ? (
                <FiEyeOff
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPassword(false);
                  }}
                  className='text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer position: absolute right-4'
                />
              ) : (
                <FiEye
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPassword(true);
                  }}
                  className='text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer position: absolute right-4'
                />
              )}
            </InputLayout>
            <InputLayout>
              <Label id='passwordConfirm'>Confirmar Senha *</Label>
              <InputUi
                id='passwordConfirm'
                type={showPassword ? 'password' : 'text'}
                placeholder='Repita a sua senha'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                autocomplete='new-password'
              />
            </InputLayout>
            <div className='pt-5'>
              <SignInButton text='Redefinir Senha' />
            </div>
          </div>
        </form>
      </FormLayout> :
        <div className='w-full h-screen flex items-center justify-center'>
          <p>O link de redefinição é inválido ou expirou.</p>
        </div>
      }
    </>
  );
}
