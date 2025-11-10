'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/schemas/authSchemas';
// components
import FormLayout from '@/components/Forms/FormLayout';
import Label from '@/components/Label';
import InputUi from '@/components/InputUi';
import SignInButton from '@/components/Btns/SignInButton';
import GoogleButton from '@/components/Btns/GoogleButton';
import Title from '@/components/Title';
import InputLayout from '@/components/InputLayout';
//icons
import Icon from '@/components/Icon';
import { FiEyeOff, FiEye } from 'react-icons/fi';
// hooks
import { registerWithEmail } from '@/libs/firebase/authService';
// toast
import toast from 'react-hot-toast';
// context
import { useAuth } from '@/context/AuthContext';

export default function SignUpForm() {
  const { setLoading, handleLoginWithGoogle } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [cep, setCep] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [terms, setTerms] = useState(false);

  const hendleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) return toast.error('Ops!, senhas diferentes verifique e tente novamente .');

    const formData = {
      name,
      email,
      password,
      phone,
      cep,
      state,
      city,
      terms,
      photoURL: '',
      permissions: [],
      status: false,
    };
    // Validação com Zod
    const result = await registerSchema.safeParseAsync(formData);
    if (!result.success) {
      const Error = result.error.issues[0].message;
      toast.error(Error);
      return;
    }
    //Cria usuário no Firebase
    const { user, error } = await registerWithEmail(email, password, formData);
    //Tratar erro DO FIREBASE
    if (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Este e-mail já está em uso. Tente outro.');
        return;
      }
      // Para outros erros
      toast.error(error.message || 'Erro ao registrar');
      console.log(error.message);
      return;
    }
    setLoading(true);
    toast.success('Conta criada com sucesso!');
  };

  // Login com Google
  const onGoogleLogin = async () => {
    setLoading(true);
    const { user, error } = await handleLoginWithGoogle();
    if (error) return setError('Erro ao entrar com Google.');
    setLoading(true);
    if (user) {
      router.push('/'); // redireciona para a página raiz
    }
  };

  return (
    <FormLayout>
      <form
        onSubmit={hendleSubmit}
        className='w-full flex flex-col items-center'
      >
        {/* <Icon
          className='rounded-full'
          name='Diamond'
          size={50}
          color='rgb(var(--icon))'
        /> */}
        <Title text='Criar Conta' />
        <p className='pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal'>
          Registre-se e Comece a ganhar hoje!
        </p>
        <div className='w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5 mt-5'>
          <InputLayout>
            <Label id='name'>Nome *</Label>
            <InputUi
              id='name'
              type='text'
              placeholder='Digite seu nome'
              value={name}
              onChange={(e) => setName(e.target.value)}
              autocomplete='name'
            />
          </InputLayout>
          <InputLayout>
            <Label id='email'>Email *</Label>
            <InputUi
              id='email'
              type='email'
              placeholder='Email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autocomplete='email'
            />
          </InputLayout>
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
          <InputLayout>
            <Label id='tel'>Telefone</Label>
            <InputUi
              id='tel'
              type='text'
              placeholder='(99) 99999-9999'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autocomplete='tel'
            />
          </InputLayout>
          <InputLayout>
            <Label id='cep'>CEP *</Label>
            <InputUi
              id='cep'
              type='text'
              placeholder='Digite seu CEP'
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              autocomplete='new-cep'
            />
          </InputLayout>
          <InputLayout>
            <Label id='uf'>Estado</Label>
            <InputUi
              id='uf'
              type='text'
              placeholder='Escolha seu estado'
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <Icon
              name='keyboard_arrow_down'
              size={30}
              color='rgb(var(--icon-secundary)) '
              className='block cursor-pointer position: absolute right-2 top-4'
            />
          </InputLayout>
          <InputLayout>
            <Label id='city'>Cidade</Label>
            <InputUi
              id='city'
              type='text'
              placeholder='Escolha sua cidade'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Icon
              name='keyboard_arrow_down'
              size={30}
              color='rgb(var(--icon-secundary)) '
              className='block cursor-pointer position: absolute right-2 top-4'
            />
          </InputLayout>
          <div className='flex items-center mb-4 cursor-pointer gap-3'>
            <InputUi
              type='checkbox'
              width='20px'
              height='20px'
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <p className='max-w-[90%] text-[rgb(var(--text))] text-[0.9rem] font-medium'>
              Declaro ter 18+
              <span className='text-[rgb(var(--text-links))] cursor-pointer hover:underline pl-1'>
                Termos e Condições
              </span>{' '}
              *
            </p>
          </div>
          <SignInButton text='Criar Conta' />
          <p className='text-[rgb(var(--text))] text-[0.9rem] font-medium text-center mt-1.5 mb-1.5'>
            OU CONTINUAR COM
          </p>
          <GoogleButton
            onClick={() => {
              onGoogleLogin();
            }}
          />
        </div>
        <p className='w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mt-4'>
          Já tem conta?
          <span
            className='text-[rgb(var(--text-links))] cursor-pointer hover:underline font-bold'
            onClick={() => router.replace('/login')}
          >
            {' '}
            Entrar
          </span>
        </p>
      </form>
    </FormLayout>
  );
}
