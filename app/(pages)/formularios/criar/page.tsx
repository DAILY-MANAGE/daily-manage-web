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
import { useRouter, useSearchParams } from 'next/navigation'
import { ToastWrapper } from '../../../utils/ToastWrapper'
import { useAuth } from '@/app/hooks/useAuth'
import { CRIAR_FORMULARIO } from '@/app/utils/EndpointStorage'
import { Root } from '@/app/components/Root'
import BackButton from '@/app/components/BackButton'

export interface FormQuestion {
  id: number
  descricao: string
  tiporesposta: string
  tipoResposta?: string
  opcional: boolean
}

export const defaultFormData: FormQuestion = {
  id: 0,
  descricao: 'NÃO PREENCHIDO',
  tiporesposta: 'TEXTO',
  opcional: true,
}

const defaultQuestions = [defaultFormData]

const defaultData = {
  nome: "Formulário",
  idusuariospermitidos: [],
  descricao: "",
  perguntas: []
}

export type FormCreationData = typeof defaultData

export default function Criar() {
  const [questions, setQuestions] = useState<FormQuestion[]>(defaultQuestions)

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
    url: CRIAR_FORMULARIO,
    isGet: false,
    header: {
      Equipe: params.get('equipeid')
    }
  })

  const router = useRouter()

  useEffect(() => {
    setValue('perguntas', questions as any)
  }, [])

  const callback = () => {
    setQuestions((state: FormQuestion[]) => {
      const aux = {
        ...defaultFormData,
        id: state[state.length - 1].id + 1 || 1
      }
      const final = [...state, aux]
      setValue('perguntas', final as any)
      return final
    })
  }

  const onSubmit = async (formData: typeof defaultData) => {
    if (!session) return
    // criador ganha acesso ao form
    //formData.idusuariospermitidos.push(session?.id as never)
    const filter = formData.perguntas.filter((formQuestion: FormQuestion) => formQuestion.descricao !== 'NÃO PREENCHIDO')
    formData.perguntas = filter
    console.log(formData)
    const res = await handlePost(formData)
    switch ((res as any).status) {
      case 201:
        ToastWrapper.success('Formulário criado com sucesso.')
        break
      default:
        ToastWrapper.warn('Algo deu errado na criação do formulário')
        break
    }
    router.back()
  }

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)} className="md:px-64 bg-gradient-to-tr from-stone-800/60 via-sky-900/60 to-green-500/60 min-h-screen">
      <CreateButton />

      <Root.Spacing>
        <Root.Header title="Informações">
          <BackButton />
        </Root.Header>
        <Root.Container>
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
              <CardContent className="w-full p-3">
                <Label>Descrição</Label>
                <Input
                  placeholder="Entre com a descrição do formulário"
                  className="shadow border-black/20"
                  autoComplete="descricao"
                  htmlFor="descricao"
                  error={errors.descricao}
                  aria-invalid={errors.descricao ? 'true' : 'false'}
                  onInvalid={(e: SyntheticEvent) => {
                    e.preventDefault()
                  }}
                  type="text"
                  id="bine"
                  {...register('descricao', {
                    required: 'Descrição do Formulário é obrigatório',
                    maxLength: {
                      value: 200,
                      message: 'Número máximo de caractéres é 200',
                    },
                    minLength: {
                      value: 5,
                      message: 'Descrição mínima de caractéres é 5',
                    },
                  })}
                ></Input>
                <Form.Error message={errors.descricao?.message} />
              </CardContent>
              <CardContent className="w-full p-3 flex flex-col">
                <Label>Pessoas Permitidas</Label>
                <div className="py-1">
                  <PermittedUsers
                    setValue={setValue}
                    equipeid={params.get('equipeid')}
                  />
                </div>
              </CardContent>
            </div>
          </Card>
        </Root.Container>

        <Root.Header title="Perguntas" />
        <Root.Container>
          {questions.map((_, index: number) => (
            <ResponseCard
              key={index}
              index={index}
              questions={questions}
              callback={callback}
              setValue={setValue}
              getValues={getValues}
              setQuestions={setQuestions}
            />
          ))}
        </Root.Container>
      </Root.Spacing>
    </Form.Root>
  )
}
