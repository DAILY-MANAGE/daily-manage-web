import { Form } from '@/app/components/Form'
import { Button } from '@/app/components/Shadcn/button'
import { Input } from '@/app/components/Shadcn/input'
import { useFetch } from '@/app/hooks/useFetch'
import { EDITAR_EQUIPE } from '@/app/utils/EndpointStorage'

import { ConfigProps } from './create-form'

import { useRouter } from 'next/navigation'
import { SyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'

export default function FormName({ nomeEquipe, idEquipe }: ConfigProps) {
  const { handlePost } = useFetch({
    url: EDITAR_EQUIPE,
    isGet: false,
    header: {
      Equipe: idEquipe
    }
  })

  const nameValues = {
    nome: nomeEquipe,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: nameValues,
  })

  const router = useRouter()

  const handleRefresh = () => {
    router.refresh()
  }

  const onSubmit = async (nameData: typeof nameValues) => {
    const res = await handlePost({
      id: idEquipe,
      patchData: nameData,
    })
    console.log(res)
    switch ((res as any).status) {
      case 200:
        handleRefresh()
        break
      default:
        break
    }
  }

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Form.Label label="Nome do Formulário" className="mt-0" />
      <div className="grid grid-cols-[1fr_6rem] gap-2">
        <Input
          autoComplete="nomeFormulario"
          htmlFor="nomeFormulario"
          type="text"
          id="nomeFormulario"
          error={errors.nome}
          placeholder="Entre com o nome do formulário"
          aria-invalid={errors.nome ? 'true' : 'false'}
          data-invalid={errors.nome}
          onInvalid={(e: SyntheticEvent) => {
            e.preventDefault()
          }}
          {...register('nome', {
            required: 'Nome do Formulário é obrigatório',
            maxLength: {
              value: 30,
              message: 'Número máximo de caractéres é 30',
            },
            minLength: {
              value: 5,
              message: 'Número mínimo de caractéres é 5',
            },
          })}
        />
      </div>
      <Form.Error message={errors.nome?.message} />
      <Button type="submit" className="mt-4">
        Criar Formulários
      </Button>
    </Form.Root>
  )
}
