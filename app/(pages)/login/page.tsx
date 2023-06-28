"use client";

import Link from 'next/link';

import { redirect } from 'next/navigation'

import Button from '@/app/components/button';
import LoginValidation from '@/app/components/login/loginValidation';
import Logo from '@/app/components/logo';

export default function Login() {
  return (
    <>
      <div className="flex flex-row align-center justify-center w-[100vw] h-[100vh]">
        <div className="w-[50vw] h-[100vh] flex flex-col align-center justify-center sm:px-0 md:w-[100vw] sm:w-[80vw] md:px-16 px-32">
          <div className="w-full flex flex-row align-center justify-start h-[5%]">
            <Logo width={50} height={100}></Logo>
          </div>
          <div className="flex flex-col align-center justify-center h-[90%] w-[90%] mx-auto">
            <h1 className="font-bold text-lg mb-1">Bem-vindo de volta!</h1>
            <p className="text-sm mb-2 text-gray-200">Entre na sua conta</p>
            <LoginValidation />
            <Button
              theme="dark-900"
              size="sm"
              onClick={() => redirect('/cadastro')}
            >
              Registrar
            </Button>
            <p className="font-normal w-full text-center mt-6">Esqueceu a senha? <Link href="/recuperar-senha"><span className="font-medium underline underline-offset-2">Recuperar Senha</span></Link></p>
          </div>
        </div>
        <div className="w-[50vw] md:hidden sm:hidden bg-dark h-[100vh] bg-login bg-cover bg-no-repeat"></div>
      </div>
    </>
  );
}
