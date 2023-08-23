'use client'

import { Form } from '../../../components/Form';

import { useForm } from 'react-hook-form';

import { Input } from '@/app/components/Shadcn/input';
import Button from '@/app/components/Custom/button';

import useAuthHandler, { RegisterData } from '@/app/services/auth';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      usuario: '',
      senha: '',
      confirmarSenha: '',
    },
  });

  const onSubmit = (data: RegisterData) => {
    if (data.senha != data.confirmarSenha) return;
    console.log(data);
    useAuthHandler().register(data);
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
      <Input
        htmlFor="password"
        error={errors.senha}
        autoComplete="password"
        placeholder="Entre com sua senha"
        aria-invalid={errors.senha ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: any) => {
          e.preventDefault();
        }}
        {...register('senha', {
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
      <Form.Error message={errors.senha?.message} />

      <Form.Label label="Confirmar Senha" className="mt-2" />
      <Input
        htmlFor="confirmpassword"
        error={errors.confirmarSenha}
        autoComplete="confirmpassword"
        placeholder="Confirme a sua senha"
        aria-invalid={errors.confirmarSenha ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: any) => {
          e.preventDefault();
        }}
        {...register('confirmarSenha', {
          required: 'Confirmar Senha é obrigatório',
          validate: (val: string) => {
            if (watch('senha') != val) {
              return 'As senhas não são iguais';
            }
          },
        })}
        type="password"
        id="confirmpassword"
      />
      <Form.Error message={errors.confirmarSenha?.message} />

      <Button
        theme="dark-900"
        size="full"
        type="submit"
        className="mt-4 flex items-center justify-center bg-zinc-900 text-white"
      >
        Cadastrar
      </Button>
    </Form.Root>
  );
}
