'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

import Input from '@/app/components/input';
import Button from '@/app/components/button';
import LoginValidationError from './loginValidationError';

interface Login {
  email: string;
  password: string;
}

export default function LoginValidation() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: unknown) => console.log(data);
  return (
    <>
      <form className="mb-0.5" onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="email"
          className="inline-block font-bold text-medium mt-4 mb-1"
        >
          E-mail
        </label>
        <Input
          autocomplete="email"
          htmlFor="email"
          placeholder="Entre com seu e-mail"
          aria-invalid={errors.email ? 'true' : 'false'}
          onInvalid={(e: any) => {
            e.preventDefault();
          }}
          {...register('email', {
            required: 'E-mail é obrigatório',
            validate: {
                matchPattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'O endereço de e-mail deve ser válido',
            },
        })}
          type="email"
          id="email"
        />
        {errors.email?.message && (
          <small className="block font-medium p-1 px-0 text-danger-700">
            {errors.email.message}
          </small>
        )}
        <label
          htmlFor="password"
          className="inline-block font-bold text-medium mt-2 mb-1"
        >
          Senha
        </label>
        <Input
          autocomplete="current-password"
          htmlFor="password"
          placeholder="Entre com sua senha"
          aria-invalid={errors.password ? 'true' : 'false'}
          onInvalid={(e: any) => {
            e.preventDefault();
          }}
          {...register('password', {
            required: true,
            maxLength: {
              value: 30,
              message: 'Número máximo de caractéres é 30',
            },
            minLength: { value: 5, message: 'Número mínimo de caractéres é 5' },
          })}
          type="password"
          id="password"
        />
         {errors.password?.message && (
          <small className="block font-medium p-1 px-0 text-danger-700">
            {errors.password.message}
          </small>
        )}
        <Button customStyle="mt-4" theme="dark-900" size="full" type="submit">
          Entrar
        </Button>
      </form>
    </>
  );
}
