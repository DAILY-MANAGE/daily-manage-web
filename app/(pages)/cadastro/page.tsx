import Link from 'next/link';

import Logo from '../../components/Custom/logo';

import RegisterForm from './components/register-form';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastro | Daily Manage',
  description: 'Faça seu cadastro para ter acesso ao seus formulários.',
};

export default function Cadastro() {

  return (
    <div className="flex flex-row align-center justify-center w-[100vw] h-[100vh]">
      <div className="h-[100vh] flex flex-col align-center justify-center md:w-[30vw] lg:w-[30w] w-[80vw] px-0 lg:px-16 md:px-10">
        <div className="w-full flex flex-row align-center items-center gap-3 justify-start h-[5%]">
          <Logo width={50} height={100} />{' '}
        </div>
        <div className="flex flex-col align-center justify-center h-[90%] w-[90%] mx-auto">
          <h1 className="font-bold text-lg mb-1">Crie sua conta</h1>
          <p className="text-sm mb-2 text-gray-900">
            Tenha acesso a plataforma e torne o
            processo de gerenciamento de formulários mais ágil e prático.
          </p>
          <RegisterForm />
          <div className="font-normal w-full text-center mt-6 flex justify-center">
            <p className="mr-1">Já possui uma conta? </p>
            <Link href="/login">
              <span className="font-medium underline underline-offset-2">
                Fazer Login
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[70vw] bg-light-100 hidden md:flex lg:flex bg-dark h-[100vh] bg-cadastro bg-cover bg-center bg-no-repeat"></div>
    </div>
  );
}
