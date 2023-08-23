'use client'

import { useRouter } from 'next/navigation';
import { Metadata } from 'next';

import Logo from './components/Custom/logo';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Error 404 | Daily Manage',
  description: 'Página não encontrada.',
};

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>ABC</title>
      </Head>
      <div className="flex align-center justify-center flex-col text-center w-fit m-auto py-auto h-screen px-10 md:px-4">
        <div className="w-fit h-fit mb-6 mx-auto">
          <Logo width={50} height={50} />
        </div>
        <h1 className="font-black text-2xl mb-2">Erro 404</h1>
        <h1 className="font-medium text-md md:text-lg mb-2">
          Não foi possível encontrar essa página...
        </h1>
        <p className="font-normal text-md text-gray-900 mb-2">Tente outro endereço ou volte para a página principal.</p>
        <div className='grid grid-cols-[0.5fr_0.5fr] gap-3 w-full mt-3'>
          <div className="font-normal mx-auto w-full text-center p-2 px-4 flex justify-center outline outline-1 rounded-lg">
            <button onClick={() => router.back()}>
              <span className="font-medium">
                Voltar
              </span>
            </button>
          </div>
          <div className="font-normal mx-auto w-full text-center flex p-2 px-4 justify-center outline outline-1 rounded-lg">
            <button onClick={() => router.push('/login')}>
              <span className="font-medium">
                Ir para Login
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
