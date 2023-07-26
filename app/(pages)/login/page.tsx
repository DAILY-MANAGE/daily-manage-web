'use client';

import Link from 'next/link';

import Button from '@/app/components/Button';
import Logo from '@/app/components/Logo';
import { Form } from '@/app/components/Form';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ToastWrapper } from '@/app/utils/ToastWrapper';

import { RxReload } from "react-icons/rx";
import { useState } from 'react';

interface Login {
  email: string;
  password: string;
};

const loginFormValues : Login = {
  email: '',
  password: '',
};

const delayTillSubmit = 1000;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: loginFormValues
  });

  const [loginLoadingDelay, setLoginLoadingDelay] = useState(false)
  const [cadastroLoadingDelay, setCadastroLoadingDelay] = useState(false)

  const [loginAttempts, setLoginAttempts] = useState(0)
  const [submitQueue, setSubmitQueue] = useState(0)

  const router = useRouter();

  function goToCadastro() {
    setCadastroLoadingDelay(true);
    router.push('/cadastro');
    setTimeout(() => {
      setCadastroLoadingDelay(false);
    }, 1000)
  }

  function handleLoginAttemptsQueue() {
    setSubmitQueue(state => state + 1)
    const savedQueue = submitQueue;
    setTimeout(() => {
      if (submitQueue == savedQueue) {
        setLoginAttempts(0);
      }
    }, 5000)
  }

  function handleLogin(data: Login) {
    if (loginAttempts > 5) {
      ToastWrapper.warn('Você tentou fazer login muitas vezes! Espere alguns segundos...');
      return;
    }
    if (data.email == 'admin@admin.com' && data.password == '12345') {
      ToastWrapper.success('Login realizado com sucesso!');
      return router.push('/dashboard');
    }
    ToastWrapper.error('Senha ou e-mail incorreto!');
  }

  const onSubmit = (data: Login) => {
    setLoginAttempts(state => state + 1)
    setLoginLoadingDelay(true)
    handleLoginAttemptsQueue();
    setTimeout(() => {
      setLoginLoadingDelay(false)
      handleLogin(data)
    }, delayTillSubmit);
  };

  return (
    <div className="flex flex-row align-center justify-center w-[100vw] h-[100vh]">
      <div className="w-[40vw] h-[100vh] flex flex-col align-center justify-center sm:px-0 md:w-[100vw] sm:w-[80vw] md:px-16 px-32">
        <div className="w-full flex flex-row align-center justify-start h-[5%]">
          <Logo width={50} height={100} />
        </div>
        <div className="flex flex-col align-center justify-center h-[90%] w-[90%] mx-auto">
          <h1 className="font-bold text-lg mb-1">Bem-vindo de volta!</h1>
          <p className="text-sm mb-2 text-gray-900">Entre na sua conta</p>
          <Form.Root onSubmit={handleSubmit(onSubmit)}>
            <Form.Label label="E-mail" />
            <Form.Input
              autoComplete="email"
              htmlFor="email"
              error={errors.email}
              placeholder="Entre com seu e-mail"
              aria-invalid={errors.email ? 'true' : 'false'}
              onInvalid={(e: any) => {
                e.preventDefault();
              }}
              {...register('email', {
                required: 'E-mail é obrigatório',
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'O endereço de e-mail deve ser válido',
                },
              })}
              type="email"
              id="email"
            />
            <Form.Error message={errors.email?.message} />

            <Form.Label label="Senha" className="mt-2" />
            <Form.Input
              autoComplete="current-password"
              htmlFor="password"
              type="password"
              id="password"
              error={errors.password}
              placeholder="Entre com sua senha"
              aria-invalid={errors.password ? 'true' : 'false'}
              onInvalid={(e: any) => {
                e.preventDefault();
              }}
              {...register('password', {
                required: 'Senha é obrigatória',
              })}
            />
            <Form.Error message={errors.password?.message} />

            <Button theme="dark-900" size="full" type="submit" data-loginLoadingDelay={loginLoadingDelay} className="mt-4 flex items-center justify-center gap-2 data-[loginLoadingDelay=true]:opacity-50">
               { loginLoadingDelay && (<RxReload className='w-4 h-4 animate-spin'/>) } <span>Entrar com E-mail</span>
            </Button>
          </Form.Root>
          <Button
            theme="dark-900"
            size="sm"
            data-cadastroLoadingDelay={cadastroLoadingDelay}
            onClick={goToCadastro}
            className="flex items-center justify-center gap-2 data-[cadastroLoadingDelay=true]:opacity-50"
          >
               { cadastroLoadingDelay && (<RxReload className='w-4 h-4 animate-spin'/>) } <span>Cadastrar</span>
          </Button>
          <div className="font-normal w-full text-center mt-6 flex justify-center">
            <p className="mr-1">Esqueceu a senha? </p>
            <Link href="/recuperar-senha">
              <span className="font-medium underline underline-offset-2">
                Recuperar Senha
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[60vw] md:hidden sm:hidden bg-dark h-[100vh] bg-login bg-cover bg-no-repeat"></div>
    </div>
  );
}
