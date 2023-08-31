'use client';

import { Form } from '../../../components/Form';

import { useForm } from 'react-hook-form';

import { Input } from '@/app/components/Shadcn/input';
import Button from '@/app/components/Custom/button';

import useAuthHandler, { RegisterData } from '@/app/services/auth';
import Link from 'next/link';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      cnpj: '',
      senha: '',
      nomeEmpresa: '',
    },
  });

  const onSubmit = (data: RegisterData) => {
    console.log(data);
    //useAuthHandler().register(data);
  };

  const ValidateCNPJ = () => {};

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Form.Label label="Nome Empresa" className="mt-2" />
      <Input
        autoComplete="nomeEmpresa"
        htmlFor="nomeEmpresa"
        error={errors.nomeEmpresa}
        placeholder="Entre com o Nome da Empresa"
        aria-invalid={errors.nomeEmpresa ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: any) => {
          e.preventDefault();
        }}
        {...register('nomeEmpresa', {
          required: 'Nome da Empresa é obrigatório',
        })}
        type="text"
        id="nomeEmpresa"
      />
      <Form.Error message={errors.nomeEmpresa?.message} />

      <Form.Label label="CNPJ" className="mt-2" />
      <Input
        autoComplete="cnpj"
        htmlFor="cnpj"
        error={errors.cnpj}
        placeholder="Entre com o CNPJ"
        aria-invalid={errors.cnpj ? 'true' : 'false'}
        className="shadow"
        pattern="/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/"
        onInvalid={(e: any) => {
          e.preventDefault();
        }}
        {...register('cnpj', {
          required: 'CNPJ é obrigatório',
          validate: {
            matchPattern: (v) =>
              /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(v) ||
              'O CPNJ deve ser válido',
          },
        })}
        type="text"
        id="cnpj"
      />
      <Form.Error message={errors.cnpj?.message} />

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
        type="text"
        id="password"
      />
      <Form.Error message={errors.senha?.message} />

      <Button
        theme="dark-900"
        size="full"
        type="submit"
        className="mt-4 flex items-center justify-center bg-zinc-900 text-white"
      >
        Cadastrar Empresa
      </Button>

      <Link
        href="/login"
        className="mt-2 w-full flex items-center justify-center"
      >
        <p className="text-zinc-500 underline underline-offset-2">
          Não é empresa?
        </p>
      </Link>
    </Form.Root>
  );
}
