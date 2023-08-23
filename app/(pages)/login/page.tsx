import Logo from '@/app/components/Custom/logo';

import LoginForm from './components/login-form';
import GoToRegister from './components/go-to-register';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Daily Manage',
  description: 'Faça login para ter acesso ao seus formulários.',
};

export default function Login() {

  return (
    <div className="flex flex-row align-center justify-center w-[100vw] h-[100vh]">
      <div className="h-[100vh] flex flex-col align-center justify-center w-[80vw] md:w-[30vw] lg:w-[30w] px-0 lg:px-16 md:px-10">
        <div className="w-full flex flex-row align-center justify-start h-[5%]">
          <Logo width={50} height={100} />
        </div>
        <div className="flex flex-col align-center justify-center h-[90%] w-[90%] mx-auto">
          <h1 className="font-bold text-lg mb-1">Bem-vindo de volta!</h1>
          <p className="text-sm mb-2 text-gray-900">Entre na sua conta</p>
          <LoginForm />
          <GoToRegister />
        </div>
      </div>
      <div className="w-[70vw] hidden bg-light-100 md:flex lg:flex h-[100vh] bg-login bg-cover bg-no-repeat"></div>
    </div>
  );
}
