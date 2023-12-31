'use client'

import { ToastWrapper } from '@/app/utils/ToastWrapper'

import { Checkbox } from '@/app/components/Shadcn/checkbox'
import { Input } from '@/app/components/Shadcn/input'
import { Form } from '@/app/components/Form'

import { FiEyeOff, FiEye } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { SyntheticEvent, useState } from 'react'

import { CheckedState } from '@radix-ui/react-checkbox'
import { Button } from '@/app/components/Shadcn/button'
import { SigninData, useAuth } from '@/app/hooks/useAuth'

const loginFormValues: SigninData = {
  usuario: '',
  senha: '',
  lembrarSessao: true,
}

const delayTillSubmit = 1000
const delayTillResetDebounce = 5000

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: loginFormValues,
  })

  const [loginAttempts, setLoginAttempts] = useState(0)
  const [submitQueue, setSubmitQueue] = useState(0)
  const [passwordHidden, setPasswordHidden] = useState(false)

  const { login } = useAuth()

  const handleLoginAttemptsQueue = () => {
    setSubmitQueue((state) => state + 1)
    const savedQueue = submitQueue
    setTimeout(() => {
      if (submitQueue === savedQueue) {
        setLoginAttempts(0)
      }
    }, delayTillResetDebounce)
  }

  const handleLogin = (data: SigninData) => {
    if (loginAttempts > 5) {
      ToastWrapper.warn(
        'Você tentou fazer login muitas vezes! Espere alguns segundos...',
      )
      return
    }
    login(data)
  }

  const onSubmit = (data: SigninData) => {
    setLoginAttempts((state) => state + 1)
    handleLoginAttemptsQueue()
    setTimeout(() => {
      handleLogin(data)
    }, delayTillSubmit)
  }

  const hideShowPassword = () => {
    setPasswordHidden(!passwordHidden)
  }

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Form.Label label="Usuário" className="mt-4" />
      <Input
        autoComplete="usuario"
        htmlFor="usuario"
        error={errors.usuario}
        placeholder="Entre com seu usuário"
        aria-invalid={errors.usuario ? 'true' : 'false'}
        data-invalid={errors.usuario}
        onInvalid={(e: SyntheticEvent) => {
          e.preventDefault()
        }}
        {...register('usuario', {
          required: 'Usuário é obrigatório',
        })}
        type="text"
        id="usuario"
      />
      <Form.Error message={errors.usuario?.message} />

      <Form.Label label="Senha" className="mt-2" />
      <div className="w-full h-fit gap-1 grid grid-cols-[1fr,2.5rem]">
        <Input
          autoComplete="current-password"
          htmlFor="password"
          type={passwordHidden ? 'text' : 'password'}
          id="password"
          error={errors.senha}
          placeholder="Entre com sua senha"
          aria-invalid={errors.senha ? 'true' : 'false'}
          data-invalid={errors.senha}
          className="w-full"
          onInvalid={(e: SyntheticEvent) => {
            e.preventDefault()
          }}
          {...register('senha', {
            required: 'Senha é obrigatória',
          })}
        />
        <button
          id="password-eye"
          className="h-full w-10 aspect-square px-2 border border-black/50 rounded-md flex items-center justify-center shadow"
          type="button"
          onClick={hideShowPassword}
        >
          {(passwordHidden && <FiEye className="w-5 h-5" />) || (
            <FiEyeOff className="w-5 h-5" />
          )}
        </button>
      </div>
      <Form.Error message={errors.senha?.message} />

      <Button
        size="full"
        type="submit"
        className="flex items-center justify-center gap-2 data-[loginloadingdelay=true]:opacity-50 bg-zinc-950 text-white mt-3"
      >
        <span>Entrar</span>
      </Button>
    </Form.Root>
  )
}
