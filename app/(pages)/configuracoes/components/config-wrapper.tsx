'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card'
import { Label } from '@/app/components/Shadcn/label'
import { Input } from '@/app/components/Shadcn/input'
import { Root } from '@/app/components/Root'

import Exit from '../components/exit'
import SaveButton from '../components/save-button'
import { Form } from '@/app/components/Form'
import { useForm } from 'react-hook-form'
import { SyntheticEvent, useState } from 'react'
import { useFetch } from '@/app/hooks/useFetch'
import { ToastWrapper } from '@/app/utils/ToastWrapper'
import { EDITAR_NOME_USUARIO } from '@/app/utils/EndpointStorage'
import { RxAvatar, RxPencil1 } from 'react-icons/rx'
import { VscSave } from 'react-icons/vsc'
import { Button } from '@/app/components/Shadcn/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/hooks/useAuth'

export default function ConfigWrapper() {
  const { session, signOut } = useAuth()

  const defaultValue = {
    usuario: session?.usuario,
    nome: session?.nome,
    email: session?.email,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultValue,
  })

  const { handlePatch } = useFetch({
    url: EDITAR_NOME_USUARIO,
    isGet: false,
  })

  const onSubmit = async (data: typeof defaultValue) => {
    if (data.usuario === session?.usuario) {
      delete data.usuario
    }
    if (data.nome === session?.nome) {
      delete data.nome
    }
    if (data.email === session?.email) {
      delete data.email
    }
    if (!session) {
      ToastWrapper.error(
        'Não foi possível autenticar o usuário, tente logar novamente.',
      )
    }
    const res = await handlePatch({
      id: session?.id || 1,
      patchData: data,
    })
    switch ((res as any).status) {
      case 200:
        ToastWrapper.success('Dados alterados com sucesso!')
        ToastWrapper.info(
          'Por questões de segurança, realize o login novamente.',
        )
        setTimeout(() => {
          signOut()
        }, 3000)
        break
      default:
        ToastWrapper.error('Não foi possível alterar os dados do usuário!')
        break
    }
    handleRefresh()
  }

  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [isEditing2, setIsEditing2] = useState(false)
  const [isEditing3, setIsEditing3] = useState(false)

  const handleRefresh = () => {
    router.push('/equipes')
  }

  const handleEditName = () => {
    if (errors.nome?.message) return
    setIsEditing((state) => !state)
  }

  const handleEditUser = () => {
    if (errors.usuario?.message) return
    setIsEditing2((state) => !state)
  }

  const handleEditEmail = () => {
    if (errors.email?.message) return
    setIsEditing3((state) => !state)
  }

  return (
    <>
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Root.Header title="Configurações">
          <Exit />
        </Root.Header>
        <div className="w-full h-fit flex flex-col space-y-4 mt-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Configurações</CardTitle>
              <CardDescription>Altere informações da conta</CardDescription>
            </CardHeader>
            <CardContent className="grid">
              <hr />
              <Form.Label label="Nome" className="mt-2" />
              <div className="grid grid-cols-[1fr_6rem] gap-2">
                <Input
                  autoComplete="nome"
                  htmlFor="nome"
                  type="text"
                  id="nome"
                  error={errors.nome}
                  placeholder="Entre com o novo nome"
                  aria-invalid={errors.nome ? 'true' : 'false'}
                  data-invalid={errors.nome}
                  onInvalid={(e: SyntheticEvent) => {
                    e.preventDefault()
                  }}
                  {...register('nome', {
                    required: 'Nome é obrigatório',
                    maxLength: {
                      value: 30,
                      message: 'Número máximo de caractéres é 30',
                    },
                    minLength: {
                      value: 5,
                      message: 'Número mínimo de caractéres é 5',
                    },
                  })}
                  disabled={!isEditing}
                />
                <Button
                  className="flex gap-2"
                  type={isEditing ? 'button' : 'submit'}
                  onClick={handleEditName}
                >
                  {isEditing ? (
                    <>
                      Salvar
                      <VscSave className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Editar
                      <RxPencil1 className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <Form.Error message={errors.nome?.message} />
              <Form.Label label="Usuário" className="mt-2" />
              <div className="grid grid-cols-[1fr_6rem] gap-2">
                <Input
                  autoComplete="usuario"
                  htmlFor="usuario"
                  type="text"
                  id="usuario"
                  error={errors.usuario}
                  placeholder="Entre com o novo usuário"
                  aria-invalid={errors.usuario ? 'true' : 'false'}
                  data-invalid={errors.usuario}
                  onInvalid={(e: SyntheticEvent) => {
                    e.preventDefault()
                  }}
                  {...register('usuario', {
                    required: 'Usuário é obrigatório',
                    maxLength: {
                      value: 30,
                      message: 'Número máximo de caractéres é 30',
                    },
                    minLength: {
                      value: 5,
                      message: 'Número mínimo de caractéres é 5',
                    },
                  })}
                  disabled={!isEditing2}
                />
                <Button
                  className="flex gap-2"
                  type={isEditing2 ? 'button' : 'submit'}
                  onClick={handleEditUser}
                >
                  {isEditing2 ? (
                    <>
                      Salvar
                      <VscSave className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Editar
                      <RxPencil1 className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <Form.Error message={errors.usuario?.message} />
              <Form.Label label="E-mail" className="mt-2" />
              <div className="grid grid-cols-[1fr_6rem] gap-2">
                <Input
                  autoComplete="email"
                  htmlFor="email"
                  type="text"
                  id="email"
                  error={errors.email}
                  placeholder="Entre com o novo usuário"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  data-invalid={errors.email}
                  onInvalid={(e: SyntheticEvent) => {
                    e.preventDefault()
                  }}
                  {...register('email', {
                    required: 'Usuário é obrigatório',
                    maxLength: {
                      value: 30,
                      message: 'Número máximo de caractéres é 30',
                    },
                    minLength: {
                      value: 5,
                      message: 'Número mínimo de caractéres é 5',
                    },
                  })}
                  disabled={!isEditing3}
                />
                <Button
                  className="flex gap-2"
                  type={isEditing3 ? 'button' : 'submit'}
                  onClick={handleEditEmail}
                >
                  {isEditing3 ? (
                    <>
                      Salvar
                      <VscSave className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Editar
                      <RxPencil1 className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <Form.Error message={errors.email?.message} />
            </CardContent>
          </Card>
        </div>
      </Form.Root>
    </>
  )
}
