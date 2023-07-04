'use client';

import Link from 'next/link';

import Button from '@/app/components/Button';
import Logo from '@/app/components/Logo';
import { Form } from '@/app/components/Form';

import { useForm } from 'react-hook-form';
import { redirect, useRouter } from 'next/navigation';
import { ToastWrapper } from '@/app/utils/ToastWrapper';

interface Login {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  let loginAttemps = 0;
  const onSubmit = (data: Login) => {
    console.log(data)
    loginAttemps += 1
    if (loginAttemps > 5) {
      ToastWrapper.warn('Você tentou fazer login muitas vezes! Espere alguns segundos...', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setTimeout(() => {
        loginAttemps = 0;
      }, 5000)
      return;
    }
    if (data.email == 'admin@admin.com' && data.password == '12345') {
      ToastWrapper.success('Login realizado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return router.push('/dashboard');
    } else {
      ToastWrapper.error('Senha ou e-mail incorreto!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
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
              error={errors.password}
              placeholder="Entre com sua senha"
              aria-invalid={errors.password ? 'true' : 'false'}
              onInvalid={(e: any) => {
                e.preventDefault();
              }}
              {...register('password', {
                required: 'Senha é obrigatória',
              })}
              type="password"
              id="password"
            />
            <Form.Error message={errors.password?.message} />

            <Button theme="dark-900" size="full" type="submit" className="mt-4">
              Entrar
            </Button>
          </Form.Root>
          <Button
            theme="dark-900"
            size="sm"
            onClick={() => {
              router.push('/cadastro');
            }}
          >
            Cadastrar
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
