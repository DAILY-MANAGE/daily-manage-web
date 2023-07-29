'use client'
import Link from 'next/link';

export default function FourOFour() {
  return (
    <>
      <div className="flex align-center justify-center flex-col text-center w-fit m-auto py-auto h-screen">
        <h1 className="font-black text-2xl mb-2">404</h1>
      <h1 className="font-medium text-lg mb-2">
        Não foi possível encontrar essa página...
      </h1>
      <p className="font-normal text-md text-gray-900 mb-2">Tente outro endereço ou volte para a página principal.</p>
      <div className="font-normal mx-auto w-fit p-2 px-4 text-center mt-6 flex justify-center outline outline-1 rounded-lg">
        <Link href="/login">
          <span className="font-medium">
            <b>&larr;</b> Voltar para Login
          </span>
        </Link>
      </div>
      </div>
    </>
  );
}
