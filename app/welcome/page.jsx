// "use client";

// // components
// import Loading from "@/components/Loading";
// // context
// import { useAuth } from "@/context/AuthContext";
// // hooks
// import { useProtectedRoute } from "@/hooks/useProtectedRoute";

// export default function Welcome() {
//   const { handleLogout, loading  } = useAuth();

//   useProtectedRoute();
//   if (loading) return  <Loading />;

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--background-secundary))]  p-4'>
//       <div className='bg-white shadow-xl rounded-3xl p-10 text-center max-w-lg'>
//         {/* Ícone de sucesso */}
//         <div className='text-green-500 text-6xl mb-6'>✅</div>

//         {/* Título */}
//         <h1 className='text-3xl md:text-4xl font-bold mb-4 text-gray-900'>
//           Bem-vindo(a) ao Bolão das Dezenas!
//         </h1>

//         {/* Mensagem principal */}
//         <p className='text-gray-700 mb-4 text-lg'>
//           Seu cadastro foi realizado com sucesso.
//         </p>

//         {/* Explicação do próximo passo */}
//         <p className='text-gray-600 mb-6 text-base'>
//           Agradecemos por se registrar! Nosso administrador entrará em contato
//           em <span className='font-semibold text-gray-800'>poucos minutos</span>{' '}
//           para liberar seu acesso ao painel.
//         </p>
//         <button
//           onClick={() => handleLogout()}
//           className='bg-gray-100 text-black text-lg px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer transition-colors duration-300  ease-in-out shadow-xl'
//         >
//           Sair
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import Loading from '@/components/Loading';
import { useAuth } from '@/context/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import SignInButton from '@/components/Btns/SignInButton';

export default function Welcome() {
  const {user, handleLogout, loading } = useAuth();

  useProtectedRoute();
  if (loading) return <Loading />;

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--background-secundary))] p-6'>
      <div className='flex flex-col items-center justify-center relative bg-white/90 shadow-2xl  rounded-3xl p-12 w-full max-w-[600px] text-center border border-gray-100 backdrop-blur-md'>
        {/* Ícone animado */}
        <div className='relative flex items-center justify-center w-25 h-25 rounded-full   '>
          <span className='text-6xl animate-spin'>🕓</span>
        </div>
        <p className='text-[rgb(var(--blue-700))] text-[1.8rem] xl:text-[2.3rem] font-semibold mb-4'>
          Bolão das Dezenas!
        </p>
        <p className='text-[1.6rem] xl:text-[2rem] font-extrabold text-[rgb(var(--blue-900))]  leading-snug'>
          Bem-vindo(a)
        </p>
        <h2 className='text-[rgb(var(--text-title))] text-[1.1rem] xl:text-[1.3rem] mb-4'>
          {user?.name}
        </h2>

        {/* Mensagem principal */}
        <p className='text-[rgb(var(--blue-700))] text-[1.3rem] mb-2'>
          Seu cadastro foi concluído com sucesso 🎉
        </p>
        {/* Explicação */}
        <p className='text-gray-600 leading-relaxed mb-10 text-base'>
          Agora é só aguardar um pouquinho. Nosso administrador está
          configurando seu acesso e suas permissões.
          <br />
          <span className='font-semibold text-gray-800'>
            Assim que tudo estiver pronto, você poderá acessar o painel.
          </span>
        </p>
        <div className='w-[100px]'>
          <SignInButton text='Sair' onClick={() => handleLogout()} />
        </div>
        <p className='text-sm text-gray-400 mt-10'>
          © {new Date().getFullYear()} Bolão das Dezenas. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
}
