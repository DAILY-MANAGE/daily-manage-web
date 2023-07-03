'use client';

import Link from 'next/link';

import Button from '@/app/components/Button';
import Logo from '@/app/components/Logo';
import { Form } from '@/app/components/Form';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface Login {
  email: string;
  password: string;
  confirmpassword: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmpassword: ''
    },
  });

  const onSubmit = (data: Login) => {
    // Fazer request para conferir se já existe, se existir, avisar com toast, se não, avisar sucesso e logar.
    console.log(data);
  };

  const router = useRouter();

  return (
    <div className="flex flex-row align-center justify-center w-[100vw] h-[100vh]">
              <div className="w-[60vw] md:hidden sm:hidden bg-dark h-[100vh] bg-login bg-cover bg-no-repeat"></div>
      <div className="w-[40vw] h-[100vh] flex flex-col align-center justify-center sm:px-0 md:w-[100vw] sm:w-[80vw] md:px-16 px-32">
        <div className="w-full flex flex-row align-center justify-start h-[5%]">
          <Logo width={50} height={100} />
        </div>
        <div className="flex flex-col align-center justify-center h-[90%] w-[90%] mx-auto">
          <h1 className="font-bold text-lg mb-1">Crie sua conta</h1>
          <p className="text-sm mb-2 text-gray-200">Tenha acesso a plataforma <b>Daily Manage</b> e torne o gerenciamento de formulários mais ágil e prático.</p>
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
              htmlFor="password"
              error={errors.password}
              placeholder="Entre com sua senha"
              aria-invalid={errors.password ? 'true' : 'false'}
              onInvalid={(e: any) => {
                e.preventDefault();
              }}
              {...register('password', {
                required: 'Senha é obrigatória',
                maxLength: {
                  value: 30,
                  message: 'Número máximo de caractéres é 30',
                },
                minLength: {
                  value: 5,
                  message: 'Número mínimo de caractéres é 5',
                },
              })}
              type="password"
              id="password"
            />
            <Form.Error message={errors.password?.message} />

            <Form.Label label="Confirmar Senha" className="mt-2" />
            <Form.Input
              htmlFor="confirmpassword"
              error={errors.confirmpassword}
              placeholder="Confirme a sua senha"
              aria-invalid={errors.confirmpassword ? 'true' : 'false'}
              onInvalid={(e: any) => {
                e.preventDefault();
              }}
              {...register('confirmpassword', {
                required: 'Confirmar Senha é obrigatório',
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return "As senhas não são iguais";
                  }
                },
              })}
              type="password"
              id="confirmpassword"
            />
            <Form.Error message={errors.confirmpassword?.message} />

            <Button theme="dark-900" size="full" type="submit" className="mt-4">
              Cadastrar
            </Button>
          </Form.Root>
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
    </div>
  );
}
