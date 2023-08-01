'use client';

import Link from 'next/link';

import Button from '@/app/components/Button';
import Logo from '@/app/components/Logo';
import { Form } from '@/app/components/Form';

import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { ToastWrapper } from '@/app/utils/ToastWrapper';

import { RxReload } from 'react-icons/rx';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Metadata } from 'next';
import { Input } from '@/components/ui/input';

interface Login {
  email: string;
  password: string;
  rememberSession: boolean;
}

const loginFormValues: Login = {
  email: '',
  password: '',
  rememberSession: false,
};

const delayTillSubmit = 1000;
const delayTillResetDebounce = 5000;

export const metadata: Metadata = {
  title: 'Login | Daily Manage',
  description: 'Faça login para ter acesso ao seus formulários.',
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: loginFormValues,
  });

  const [loginAttempts, setLoginAttempts] = useState(0);
  const [submitQueue, setSubmitQueue] = useState(0);

  const router = useRouter();

  const goToCadastro = () => {
    setTimeout(() => {
      router.push('/cadastro');
    }, delayTillSubmit)
  }

  const handleLoginAttemptsQueue = ()  => {
    setSubmitQueue((state) => state + 1);
    const savedQueue = submitQueue;
    setTimeout(() => {
      if (submitQueue == savedQueue) {
        setLoginAttempts(0);
      }
    }, delayTillResetDebounce);
  }

  const handleLogin = (data: Login) => {
    if (loginAttempts > 5) {
      ToastWrapper.warn(
        'Você tentou fazer login muitas vezes! Espere alguns segundos...'
      );
      return;
    }
    if (data.email == 'admin@admin.com' && data.password == '12345') {
      ToastWrapper.success('Login realizado com sucesso!');
      return router.push('/dashboard');
    }
    ToastWrapper.error('Senha ou e-mail incorreto!');
  }

  const onSubmit = (data: Login) => {
    setLoginAttempts((state) => state + 1);
    handleLoginAttemptsQueue();
    setTimeout(() => {
      handleLogin(data);
    }, delayTillSubmit);
  };

  return (
    <div className="flex flex-row align-center justify-center w-[100vw] h-[100vh]">
      <div className="h-[100vh] flex flex-col align-center justify-center md:w-[30vw] lg:w-[30w] w-[80vw] px-0 lg:px-16 md:px-10">
        <div className="w-full flex flex-row align-center justify-start h-[5%]">
          <Logo width={50} height={100} />
        </div>
        <div className="flex flex-col align-center justify-center h-[90%] w-[90%] mx-auto">
          <h1 className="font-bold text-lg mb-1">Bem-vindo de volta!</h1>
          <p className="text-sm mb-2 text-gray-900">Entre na sua conta</p>
          <Form.Root onSubmit={handleSubmit(onSubmit)}>
            <Form.Label label="E-mail" />
            <Input
              autoComplete="email"
              htmlFor="email"
              error={errors.email}
              placeholder="Entre com seu e-mail"
              aria-invalid={errors.email ? 'true' : 'false'}
              className="shadow"
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
            <Input
              autoComplete="current-password"
              htmlFor="password"
              type="password"
              id="password"
              error={errors.password}
              placeholder="Entre com sua senha"
              className="shadow"
              aria-invalid={errors.password ? 'true' : 'false'}
              onInvalid={(e: any) => {
                e.preventDefault();
              }}
              {...register('password', {
                required: 'Senha é obrigatória',
              })}
            />
            <Form.Error message={errors.password?.message} />
            <div className="flex w-full h-4 mt-3 mb-8">
              <div className="w-1/2 h-full flex justify-start items-center gap-2">
                <Checkbox className="border border-black/20 m-0 rounded my-auto shadow" />
                <span className="text-sm my-auto h-full leading-[1.1rem]">Lembrar senha</span>
              </div>
              <div className="md:w-1/2 md:flex h-full justify-end items-center gap-2 block">
                {' '}
                <Link href="/recuperar-senha">
                  <span className="font-medium text-sm underline underline-offset-2">
                    Recuperar Senha
                  </span>
                </Link>
              </div>
            </div>

            <Button
              theme="dark-900"
              size="full"
              type="submit"
              className="mt-4 flex items-center justify-center gap-2 data-[loginloadingdelay=true]:opacity-50"
            >
              <span>Entrar</span>
            </Button>
          </Form.Root>
          <Button
            theme="dark-900"
            size="sm"
            onClick={goToCadastro}
            className="flex items-center justify-center gap-2 data-[cadastroloadingdelay=true]:opacity-50"
          >
            <span>Cadastrar</span>
          </Button>
        </div>
      </div>
      <div className="w-[70vw] hidden bg-light-100 md:flex lg:flex h-[100vh] bg-login bg-cover bg-no-repeat"></div>
    </div>
  );
}
