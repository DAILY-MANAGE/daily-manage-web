'use client'

import { Root } from "@/app/components/Root"

import { useFetch } from "@/app/hooks/useFetch"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

import FormContext from "./FormContext"
import FormInterferer from "./FormInterferer"

interface FormProviderProps {
  params: any
}

const defaultData = {
  descricao: 'Não informado',
  unidade: 'STRING'
}

export type FormResponseType = typeof defaultData

export default function FormProvider({ params }: FormProviderProps) {
  const searchParams = useSearchParams()

  const { data, error, loading } = useFetch({
    url: `/equipe/forms/${params.id}?equipeid=${searchParams.get('equipeid')}`,
    isGet: true
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultData,
  })

  const onSubmit = async (formData: typeof defaultData) => {

  }

  return (
    <Root.Spacing>
      <Root.Header title={(data && data.data && data.data.nome) ? data.data.nome : 'Carregando...'}>
        <FormContext />
      </Root.Header>
      <Root.Container>
        <FormInterferer data={data} errors={errors} register={register}/>
      </Root.Container>
    </Root.Spacing>
  )
}
