'use client';

import { useRouter } from 'next/navigation';

import Logo from '../Custom/logo';
import NotFoundButton from './not-found-button';

export default function NotFoundRoot() {
  const router = useRouter();

  return (
    <>
      <div className="flex align-center justify-center flex-col text-center w-fit m-auto py-auto h-screen px-10 md:px-4">
        <div className="w-fit h-fit mb-6 mx-auto">
          <Logo width={50} height={50} />
        </div>
        <h1 className="font-black text-2xl mb-2">ERRO 404</h1>
        <h1 className="font-medium text-md md:text-lg mb-2 text-gray-900">
          Não foi possível encontrar essa página...
        </h1>
        <div className="grid grid-cols-[0.5fr_0.5fr] gap-3 w-full mt-3">
          <NotFoundButton text="Voltar" callback={() => router.back()} />
          <NotFoundButton
            text="Ir para Login"
            callback={() => router.push('/login')}
          />
        </div>
      </div>
    </>
  );
}
