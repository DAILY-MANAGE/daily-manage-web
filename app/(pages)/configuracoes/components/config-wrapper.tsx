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
import { SyntheticEvent } from 'react'
import { useFetch } from '@/app/hooks/useFetch'
import { ToastWrapper } from '@/app/utils/ToastWrapper'
import { EDITAR_NOME_USUARIO } from '@/app/utils/EndpointStorage'

const defaultValue = {
  nome: ''
}

export default function ConfigWrapper() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultValue,
  })

  const { handlePost } = useFetch({
    url: EDITAR_NOME_USUARIO,
    isGet: false,
  })

  const onSubmit = async (data: typeof defaultValue) => {
    const res = await handlePost({})
    console.log(res)
    switch ((res as any).status) {
      case 200:
        ToastWrapper.success("Nome alterado com sucesso!")
        break
      default:
        ToastWrapper.error("Não foi possível alterar o nome do usuário!")
        break
    }
  }

  return <>
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <SaveButton />
      <Root.Header title="Configurações">
        <Exit />
      </Root.Header>
      <div className="w-full h-fit flex flex-col space-y-4 mt-4">
        <Card className='shadow-sm'>
          <CardHeader className='pb-2'>
            <CardTitle>Usuário</CardTitle>
            <CardDescription>Altere informações básicas do usuário</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Card className='shadow-sm'>
              <CardContent className='p-4'>
                <div className="grid gap-2">
                  <Form.Label label="Nome" className="mt-2" />
                  <Input
                    autoComplete="nome"
                    htmlFor="nome"
                    error={errors.nome}
                    placeholder="Entre com o seu Novo Nome"
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
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </Form.Root>
  </>
}
