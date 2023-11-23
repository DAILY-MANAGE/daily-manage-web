'use client'

import { Form } from '@/app/components/Form'
import { useFetch } from '@/app/hooks/useFetch'
import {
  RESPONDER_FORMULARIO,
  VER_FORMULARIO_POR_ID,
} from '@/app/utils/EndpointStorage'
import { useForm } from 'react-hook-form'
import SendButton from './send-button'
import { FormQuestion } from '../../criar/page'
import { Label } from '@/app/components/Shadcn/label'
import { Card, CardContent, CardHeader } from '@/app/components/Shadcn/card'
import FormResponse from './form-response'
import { ToastWrapper } from '@/app/utils/ToastWrapper'
import { useSearchParams } from 'next/navigation'
import FormSubmitter from './form-submitter'

export type Props = {
  params: { id: number }
}

export default function FormWrapper({ params }: Props) {
  const searchParams = useSearchParams()

  const { data } = useFetch({
    url: VER_FORMULARIO_POR_ID.replace('{formularioId}', params.id.toString()),
    isGet: true,
    header: {
      Equipe: searchParams.get('equipeId'),
    },
  })

  return <FormSubmitter data={data} params={params} />
}
