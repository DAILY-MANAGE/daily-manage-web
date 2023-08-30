'use client';
import Link from 'next/link';

import { ToastWrapper } from '@/app/utils/ToastWrapper';

import { Checkbox } from '@/app/components/Shadcn/checkbox';
import { Input } from '@/app/components/Shadcn/input';

import { Form } from '@/app/components/Form';
import Button from '@/app/components/Custom/button';

import { FiEyeOff, FiEye } from 'react-icons/fi';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

import useAuthHandler from '@/app/services/auth';

interface Login {
  usuario: string;
  senha: string;
  lembrarSessao: boolean;
}

const loginFormValues: Login = {
  usuario: '',
  senha: '',
  lembrarSessao: false,
};

const delayTillSubmit = 1000;
const delayTillResetDebounce = 5000;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: loginFormValues,
  });

  const [loginAttempts, setLoginAttempts] = useState(0);
  const [submitQueue, setSubmitQueue] = useState(0);
  const [passwordHidden, setPasswordHidden] = useState(false);

  const authHandler = useAuthHandler();

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
    return authHandler.login(data);
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
        error={errors.usuario}
        placeholder="Entre com seu e-mail"
        aria-invalid={errors.usuario ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: any) => {
          e.preventDefault();
        }}
        {...register('usuario', {
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
      <Form.Error message={errors.usuario?.message} />

      <Form.Label label="Senha" className="mt-2" />
      <div className="w-full h-fit grid grid-cols-[0.99fr_0.01fr] lg:grid-cols-[0.9fr_0.1fr] md:grid-cols-[0.95fr_0.05fr] gap-1">
        <Input
          autoComplete="current-password"
          htmlFor="password"
          type={passwordHidden ? 'text' : 'password'}
          id="password"
          error={errors.senha}
          placeholder="Entre com sua senha"
          className="shadow"
          aria-invalid={errors.senha ? 'true' : 'false'}
          onInvalid={(e: any) => {
            e.preventDefault();
          }}
          {...register('senha', {
            required: 'Senha é obrigatória',
          })}
        />
        <button
          id="password-eye"
          className="w-full h-full px-2 border border-black/50 rounded flex items-center justify-center shadow"
          type="button"
          onClick={hideShowPassword}
        >
          {(passwordHidden && <FiEye className="w-5 h-5" />) || (
            <FiEyeOff className="w-5 h-5" />
          )}
        </button>
      </div>
      <Form.Error message={errors.senha?.message} />
      <div className="flex w-full h-4 mt-3 mb-8">
        <div className="w-1/2 h-full flex justify-start items-center gap-2">
          <Checkbox
            className="border border-black/50 m-0 rounded my-auto shadow"
            {...register('lembrarSessao')}
            onCheckedChange={(e: any) => {
              setValue('lembrarSessao', e);
            }}
          />
          <span className="text-sm my-auto h-full leading-[1.1rem]">
            Lembrar sessão
          </span>
        </div>
        {false && (
          <div className="w-1/2 md:flex h-full justify-end items-center gap-2 block">
            {' '}
            <Link
              href="/recuperar-senha"
              className="leading-none text-end w-full h-full block"
            >
              <span className="font-medium text-sm underline underline-offset-2">
                Recuperar Senha
              </span>
            </Link>
          </div>
        )}
      </div>

      <Button
        size="full"
        type="submit"
        className="mt-4 flex items-center justify-center gap-2 data-[loginloadingdelay=true]:opacity-50 bg-zinc-950 text-white"
      >
        <span>Entrar</span>
      </Button>
    </Form.Root>
  );
}
