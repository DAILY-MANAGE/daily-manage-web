'use client';

import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FaCheck } from 'react-icons/fa';

import Button from '@/app/components/Button';
import Logo from '@/app/components/Logo';
import { Form } from '@/app/components/Form';
import ReactCodeInput from 'react-code-input';

interface Login {
  email: string;
  password: string;
}

interface NewPass {
  password: string,
  confirmpassword: string
}

type Stage = {
  [key: number]: () => JSX.Element;
};

export default function RecuperarSenha() {
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
      confirmpassword: '',
    },
  });

  const [stage, setStage] = useState<number>(1);
  const [email, setEmail] = useState<string | null>();

  const onSubmit = (data: Login | NewPass | any) => {
    console.log(data);
    try {
      if (stage == 1) {
        // Fazer request para enviar código pro e-mail
        if (data.email) {
          setEmail(data.email);
          setStage(stage + 1);
        }
      } else if (stage == 2) {
        // Validar código com request
        setStage(stage + 1);
      } else if (stage == 3) {
        // Validar senha e enviar request de mudança
        setStage(stage + 1);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDigitsChange = (digits: string) => {
    console.log(digits);
  };

  const router = useRouter();

  const Stages: Stage = {
    1: () => (
      <>
        <h1 className="font-bold text-lg mb-1">Esqueceu sua senha?</h1>
        <p className="text-sm mb-2 text-gray-200">
          Sem problemas, iremos te enviar instruções.
        </p>
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <Form.Label label="E-mail" />
          <Form.Input
            autoComplete="email"
            htmlFor="email"
            placeholder="Entre com seu e-mail"
            aria-invalid={errors.email ? 'true' : 'false'}
            error={errors.email}
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

          <Button theme="dark-900" size="full" type="submit" className="mt-4">
            Redefinir senha
          </Button>
        </Form.Root>
      </>
    ),
    2: () => (
      <>
        <h1 className="font-bold text-lg mb-1">Redefinir senha</h1>
        <p className="text-sm mb-2 text-gray-200">
          Enviamos um e-mail para <b>{email}</b>, preencha os campos abaixo com
          o código:
        </p>
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex justify-center h-fit my-2">
            <ReactCodeInput
              type="number"
              fields={4}
              name={'Código'}
              inputStyle={{
                fontFamily: 'Inter',
                borderRadius: '6px',
                border: '1px solid lightgrey',
                boxShadow: 'gba(0, 0, 0, 0.1) 0px 0px 10px 0px',
                padding: '2px',
                width: '20%',
                height: '42px',
                fontSize: '32px',
                boxSizing: 'border-box',
                color: 'black',
                backgroundColor: 'white',
                textAlign: 'center',
              }}
              inputMode={'email'}
              onChange={handleDigitsChange}
            />
          </div>

          <Button theme="dark-900" size="full" type="submit" className="mt-4">
            Continuar
          </Button>
        </Form.Root>
      </>
    ),
    3: () => (
      <>
        <h1 className="font-bold text-lg mb-1">Criar nova senha</h1>
        <p className="text-sm mb-2 text-gray-200">
          A senha deve ter no mínimo 5 caracteres.
        </p>
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <Form.Label label="Senha" className="mt-2" />
          <Form.Input
            autoComplete="current-password"
            htmlFor="password"
            error={errors.password}
            placeholder="Entre com a nova senha"
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
              autoComplete="false"
              htmlFor="confirmpassword"
              error={errors.confirmpassword}
              placeholder="Confirme a sua senha"
              aria-invalid={errors.confirmpassword ? 'true' : 'false'}
              onInvalid={(e: any) => {
                e.preventDefault();
              }}
              {...register('confirmpassword', {
                required: true,
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
            Continuar
          </Button>
        </Form.Root>
      </>
    ),
    4: () => (
      <>
        <h1 className="font-bold text-lg mb-1 w-full text-center">Sua senha foi redefinida com successo!</h1>
        <div className="h-fit flex justify-center align-center text-center w-full text-primary-300 mt-2 font-large">
        <FaCheck />
        </div>
      </>
    ),
  };

  return (
    <div className="flex flex-row align-center justify-center w-[100vw] h-[100vh]">
      <div className="w-[40vw] h-[100vh] flex flex-col align-center justify-center sm:px-0 md:w-[100vw] sm:w-[80vw] md:px-16 px-32">
        <div className="w-full flex flex-row align-center justify-start h-[5%]">
          <Logo width={50} height={100} />
        </div>
        <div className="flex flex-col align-center justify-center h-[85%] w-[90%] mx-auto">
          {Stages[stage] && Stages[stage]()}
          <div className="font-normal w-full text-center mt-6 flex justify-center">
            <Link href="/login">
              <span className="font-medium">
                <b>&larr;</b> Voltar para Login
              </span>
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-row h-[5%] justify-center mt-6">
          <div
            className={`rounded-lg ${
              stage >= 1 ? 'bg-secondary-300' : 'bg-dark-300'
            } w-[25%] transition-colors h-full pr-2 mr-2 max-h-2`}
          ></div>
          <div
            className={`rounded-lg ${
              stage >= 2 ? 'bg-secondary-300' : 'bg-dark-300'
            } w-[25%] transition-colors h-full pr-2 mr-2 max-h-2`}
          ></div>
          <div
            className={`rounded-lg ${
              stage >= 3 ? 'bg-secondary-300' : 'bg-dark-300'
            } w-[25%] transition-colors h-full pr-2 mr-2 max-h-2`}
          ></div>
          <div
            className={`rounded-lg ${
              stage >= 4 ? 'bg-secondary-300' : 'bg-dark-300'
            } w-[25%] transition-colors h-full pr-2 mr-2 max-h-2`}
          ></div>
        </div>
      </div>
      <div className="w-[60vw] md:hidden sm:hidden bg-dark h-[100vh] bg-login bg-cover bg-no-repeat"></div>
    </div>
  );
}
