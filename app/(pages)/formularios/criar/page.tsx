'use client'

import { Card, CardContent, CardFooter } from '@/app/components/Shadcn/card'
import { Input } from '@/app/components/Shadcn/input'
import { Label } from '@/app/components/Shadcn/label'

import { PermittedUsers } from './components/permitted-users'

import ResponseCard from './components/response-card'
import { SyntheticEvent, useEffect, useState } from 'react'
import CreateButton from './components/create-button'
import { useForm } from 'react-hook-form'
import { Form } from '@/app/components/Form'
import { useFetch } from '@/app/hooks/useFetch'
import { useSearchParams } from 'next/navigation'
import { ToastWrapper } from '../../../utils/ToastWrapper';
import { useAuth } from '@/app/hooks/useAuth'

interface FormQuestion {
  descricao: string
  unidade: string
}

export interface FormType {
  nome: string;
  perguntas: FormQuestion[]
}

export const defaultFormData: FormType = {
  nome: 'Pergunta',
  perguntas: [
    {
      descricao: 'Pergunta',
      unidade: 'BOOLEAN'
    }
  ],
}

const defaultQuestions = [
  defaultFormData
]

const defaultData = {
  nome: '',
  idusuariospermitidos: [1],
  campos: [
    {
      nome: 'Não Informado',
      perguntas: [
        {
          descricao: 'Pergunta',
          unidade: 'BOOLEAN'
        }
      ]
    }
  ],
  informacoes: [
    {
      descricao: "Informação"
    }
  ]
}

export type FormCreationData = typeof defaultData;

export default function Criar() {

  const [questions, setQuestions] = useState<any[]>(defaultQuestions)

  const params = useSearchParams()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultData as FormCreationData,
  })

  const { session } = useAuth()

  const { handlePost } = useFetch({
    url: `/equipe/forms?equipeid=${params.get('equipeid')}`,
    isGet: false
  })

  const callback = () => {
      setQuestions((state: FormType[]) => {
          let auxFormData = {
            ...defaultFormData
          }
          const final = [...state, auxFormData]
          setValue('campos', [...getValues('campos'), auxFormData]) //)
          return final
        })
  }

  const onSubmit = async (formData: typeof defaultData) => {
    if (!session) return
    formData.idusuariospermitidos.push(session?.id)
    const res = await handlePost(formData)
    switch((res as any).status) {
      case 200:
        ToastWrapper.success("Formulário criado com sucesso.")
        break
      default:
        ToastWrapper.warn("Algo deu errado na criação do formulário")
        break
    }
  }

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-col flex w-full">
        <CreateButton />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between flex-col md:flex-row bg-titleHeader bg-cover bg-bottom bg-no-repeat px-4 py-3 rounded overflow-hidden">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Informações
            </h2>
          </div>
          <div className="flex items-center space-y-2 flex-col w-full">
            <Card className="w-full h-fit flex items-center justify-center flex-col shadow pb-1 px-1">
              <div className="w-full block h-fit">
                <CardContent className="w-full p-3">
                  <Label>Nome do Formulário</Label>
                  <Input
                    placeholder="Entre com o nome do formulário"
                    className="shadow border-black/20"

                    autoComplete="nome"
                    htmlFor="nome"
                    error={errors.nome}
                    aria-invalid={errors.nome ? 'true' : 'false'}
                    onInvalid={(e: SyntheticEvent) => {
                      e.preventDefault()
                    }}
                    type="text"
                    id="bine"
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
                  ></Input>
                  <Form.Error message={errors.nome?.message} />
                </CardContent>
                <CardContent className="w-full p-3 flex flex-col">
                  <Label>Pessoas Permitidas</Label>
                  <div className='py-1'>
                    <PermittedUsers setValue={setValue} equipeid={params.get('equipeid')}/>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
          <div className="flex items-center justify-between flex-col md:flex-row bg-titleHeader bg-cover bg-bottom bg-no-repeat px-4 py-3 rounded overflow-hidden">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Campos
            </h2>
          </div>
          {
            questions.map((data: FormType, index: number) => <ResponseCard index={index} questions={questions} callback={callback} setValue={setValue} getValues={getValues}/>)
          }
        </div>
      </div>
    </Form.Root>
  )
}
