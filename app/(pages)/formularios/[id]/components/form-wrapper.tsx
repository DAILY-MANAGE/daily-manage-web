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

type Props = {
  params: { id: number }
}

const defaultForm = [
  {}
]

export default function FormWrapper({ params }: Props) {

  const { data, handlePost } = useFetch({
    url: VER_FORMULARIO_POR_ID.replace("{formularioId}", params.id.toString()),
    isGet: true
  })

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultForm,
  })


  const onSubmit = (data: typeof defaultForm) => {
    const submitData = {
      respostas: data
    }
    handlePost([RESPONDER_FORMULARIO.replace("{formularioId}", params.id.toString()), submitData])
  }

  return <>
    <Form.Root className='flex flex-col gap-2 w-full'>
      <SendButton />
      {
        data && data.data && (
          <>
            {data.data.perguntas.map((formData: FormQuestion) => {
              return <Card>
                <CardHeader>
                  <Label>{formData.descricao}</Label>
                </CardHeader>
                <CardContent>
                  <Input placeholder="Sua resposta..."/>
                </CardContent>
              </Card>
            })}
          </>
        )
      }
    </Form.Root>
  </>
}
