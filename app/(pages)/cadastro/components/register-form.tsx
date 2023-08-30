'use client';

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
      cnpj: '',
      senha: '',
      nomeEmpresa: '',
    },
  });

  const onSubmit = (data: RegisterData) => {
    console.log(data);
    //useAuthHandler().register(data);
  };

  const ValidateCNPJ = () => {

  };

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Form.Label label="Nome Empresa" />
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

      <Form.Label label="CNPJ" />
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
        Cadastrar Empresa
      </Button>
    </Form.Root>
  );
}
