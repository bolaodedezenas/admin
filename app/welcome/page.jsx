"use client";

// components
import Loading from "@/components/Loading";
// context
import { useAuth } from "@/context/AuthContext";
// hooks
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function Welcome() {
  const { handleLogout, loading  } = useAuth();

  useProtectedRoute();
  if (loading) return  <Loading />;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--background-secundary))]  px-4'>
      <div className='bg-white shadow-xl rounded-3xl p-10 text-center max-w-lg'>
        {/* Ícone de sucesso */}
        <div className='text-green-500 text-6xl mb-6'>✅</div>

        {/* Título */}
        <h1 className='text-3xl md:text-4xl font-bold mb-4 text-gray-900'>
          Bem-vindo(a) ao Bolão das Dezenas!
        </h1>

        {/* Mensagem principal */}
        <p className='text-gray-700 mb-4 text-lg'>
          Seu cadastro foi realizado com sucesso.
        </p>

        {/* Explicação do próximo passo */}
        <p className='text-gray-600 mb-6 text-base'>
          Agradecemos por se registrar! Nosso administrador entrará em contato
          em <span className='font-semibold text-gray-800'>poucos minutos</span>{' '}
          para liberar seu acesso ao painel.
        </p>
        <button
          onClick={() => handleLogout()}
          className='bg-gray-100 text-black text-lg px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer transition-colors duration-300  ease-in-out shadow-xl'
        >
          Sair
        </button>
      </div>
    </div>
  );
}
