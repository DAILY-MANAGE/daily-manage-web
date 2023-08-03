'use client';
import Link from 'next/link';

import { ToastWrapper } from '@/app/utils/ToastWrapper';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Form } from '@/app/components/Form';

import { FiEyeOff, FiEye } from 'react-icons/fi';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/app/components/Button';

interface Login {
  email: string;
  password: string;
  rememberSession: boolean[];
}

const loginFormValues: Login = {
  email: '',
  password: '',
  rememberSession: [true],
};

const delayTillSubmit = 1000;
const delayTillResetDebounce = 5000;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: loginFormValues,
  });

  const router = useRouter();

  const [loginAttempts, setLoginAttempts] = useState(0);
  const [submitQueue, setSubmitQueue] = useState(0);
  const [passwordHidden, setPasswordHidden] = useState(false);

  const handleLoginAttemptsQueue = () => {
    setSubmitQueue((state) => state + 1);
    const savedQueue = submitQueue;
    setTimeout(() => {
      if (submitQueue == savedQueue) {
        setLoginAttempts(0);
      }
    }, delayTillResetDebounce);
  };

  const handleLogin = (data: Login) => {
    if (loginAttempts > 5) {
      ToastWrapper.warn(
        'Você tentou fazer login muitas vezes! Espere alguns segundos...'
      );
      return;
    }
    console.log(data);
    if (data.email == 'admin@admin.com' && data.password == '12345') {
      ToastWrapper.success('Login realizado com sucesso!');
      return router.push('/dashboard');
    }
    ToastWrapper.error('Senha ou e-mail incorreto!');
  };

  const onSubmit = (data: Login) => {
    setLoginAttempts((state) => state + 1);
    handleLoginAttemptsQueue();
    setTimeout(() => {
      handleLogin(data);
    }, delayTillSubmit);
  };

  const hideShowPassword = () => {
    setPasswordHidden(!passwordHidden);
  };

  return (
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
      <div className="w-full h-fit grid grid-cols-[0.99fr_0.01fr] lg:grid-cols-[0.9fr_0.1fr] md:grid-cols-[0.9fr_0.1fr] gap-1">
        <Input
          autoComplete="current-password"
          htmlFor="password"
          type={passwordHidden ? 'text' : 'password'}
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
        <button
          id="password-eye"
          className="w-full h-full px-2 border border-black/20 rounded flex items-center justify-center shadow"
          type="button"
          onClick={hideShowPassword}
        >
          {(passwordHidden && <FiEye className="w-5 h-5" />) || (
            <FiEyeOff className="w-5 h-5" />
          )}
        </button>
      </div>
      <Form.Error message={errors.password?.message} />
      <div className="flex w-full h-4 mt-3 mb-8">
        <div className="w-1/2 h-full flex justify-start items-center gap-2">
          <Checkbox
            className="border border-black/20 m-0 rounded my-auto shadow"
            {...register("rememberSession")}
          />
          <span className="text-sm my-auto h-full leading-[1.1rem]">
            Lembrar senha
          </span>
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
  );
}
