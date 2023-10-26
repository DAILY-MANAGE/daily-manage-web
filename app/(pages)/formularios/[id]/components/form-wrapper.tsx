'use client'

import { Form } from '@/app/components/Form';
import { useFetch } from '@/app/hooks/useFetch';
import { RESPONDER_FORMULARIO, VER_FORMULARIO_POR_ID } from '@/app/utils/EndpointStorage';
import { useForm } from 'react-hook-form';
import SendButton from './send-button';
import { FormQuestion } from '../../criar/page';
import { Input } from '@/app/components/Shadcn/input';
import { Label } from '@/app/components/Shadcn/label';
import { Card, CardContent, CardHeader } from '@/app/components/Shadcn/card';
import FormResponse from './form-response';
import { ToastWrapper } from '@/app/utils/ToastWrapper';
import { useSearchParams } from 'next/navigation';
import { submitForm } from '../utils/submit-form';

type Props = {
  params: { id: number }
}

const defaultForm = {
  respostas: [

  ]
}

export default function FormWrapper({ params }: Props) {
  const searchParams = useSearchParams()

  const { data } = useFetch({
    url: VER_FORMULARIO_POR_ID.replace("{formularioId}", params.id.toString()),
    isGet: true,
    header: {
      Equipe: searchParams.get("equipeId")
    }
  })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: (data && data.data) ? data.data : defaultForm,
  })

  const midtermSubmit = (data: typeof defaultForm) => {
    submitForm(data, params.id.toString(), searchParams.get("equipeId"))
  }

  return <>
    <Form.Root className='flex flex-col gap-2 w-full' onSubmit={handleSubmit(midtermSubmit)}>
      <SendButton />
      {data && data.data && JSON.stringify(data.data.perguntas)}
      {
        data && data.data && (
          <>
            {data.data.perguntas.map((formData: FormQuestion) => {
              return <Card>
                <CardHeader>
                  <Label>{formData.descricao}</Label>
                </CardHeader>
                <CardContent>
                  <FormResponse formData={formData} errors={errors} register={register} getValues={getValues} setValue={setValue}/>
                </CardContent>
              </Card>
            })}
          </>
        )
      }
    </Form.Root>
  </>
}
