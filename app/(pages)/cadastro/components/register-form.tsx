'use client'

import { Form } from '../../../components/Form'

import { useForm } from 'react-hook-form'

import { Input } from '@/app/components/Shadcn/input'
import { Button } from '@/app/components/Shadcn/button'

import { RegisterData } from '@/app/interfaces/RegisterData'

import Link from 'next/link'

import { SyntheticEvent } from 'react'
import { useAuth } from '@/app/hooks/useAuth'

export default function RegisterForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      usuario: '',
      email: '',
      senha: '',
      nome: '',
      confirmarSenha: '',
      permissoes: []
    },
  })

  const { signIn } = useAuth()

  const onSubmit = (data: RegisterData) => {
    signIn(data)
  }

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Form.Label label="Usuário" className="mt-2" />
      <Input
        autoComplete="usuario"
        htmlFor="usuario"
        error={errors.usuario}
        placeholder="Entre com o Usuário"
        aria-invalid={errors.usuario ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: SyntheticEvent) => {
          e.preventDefault()
        }}
        {...register('usuario', {
          required: 'Usuario é obrigatório',
        })}
        type="text"
        id="usuario"
      />
      <Form.Error message={errors.usuario?.message} />

      <Form.Label label="Nome" className="mt-2" />
      <Input
        autoComplete="nome"
        htmlFor="nome"
        error={errors.nome}
        placeholder="Entre com o seu Nome"
        aria-invalid={errors.nome ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: SyntheticEvent) => {
          e.preventDefault()
        }}
        {...register('nome', {
          required: 'Nome é obrigatório',
        })}
        type="text"
        id="nome"
      />
      <Form.Error message={errors.nome?.message} />

      <Form.Label label="E-mail" className="mt-2" />
      <Input
        autoComplete="email"
        htmlFor="email"
        error={errors.email}
        placeholder="Entre com o E-mail"
        aria-invalid={errors.email ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: SyntheticEvent) => {
          e.preventDefault()
        }}
        {...register('email', {
          required: 'E-mail é obrigatório',
          validate: {
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              'O endereço de e-mail deve ser válido',
          },
        })}
        type="text"
        id="email"
      />
      <Form.Error message={errors.email?.message} />

      <Form.Label label="Senha" className="mt-2" />
      <Input
        htmlFor="password"
        error={errors.senha}
        autoComplete="password"
        placeholder="Entre com sua senha"
        aria-invalid={errors.senha ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: SyntheticEvent) => {
          e.preventDefault()
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
        htmlFor="confirmarSenha"
        error={errors.senha}
        autoComplete="confirmarSenha"
        placeholder="Confirme a sua senha"
        aria-invalid={errors.confirmarSenha ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: SyntheticEvent) => {
          e.preventDefault()
        }}
        {...register('confirmarSenha', {
          required: 'Confirmar a senha é obrigatório',
          validate: (val: string) => {
            if (watch('senha') != val) {
              return 'As senhas não são iguais';
            }
          },
        })}
        type="password"
        id="confirmarSenha"
      />
      <Form.Error message={errors.confirmarSenha?.message} />

      <Button
        size="full"
        type="submit"
        className="mt-4 flex items-center justify-center bg-zinc-900 text-white"
      >
        Cadastrar
      </Button>

      <Link
        href="/login"
        className="mt-2 w-full flex items-center justify-center"
      >
        <p className="text-zinc-500 underline underline-offset-2">
          Já possui conta?
        </p>
      </Link>
    </Form.Root>
  )
}
