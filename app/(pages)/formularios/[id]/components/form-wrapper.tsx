'use client'

import { Form } from '@/app/components/Form';
import { useFetch } from '@/app/hooks/useFetch';
import { RESPONDER_FORMULARIO, VER_FORMULARIO_POR_ID } from '@/app/utils/EndpointStorage';
import { useForm } from 'react-hook-form';
import SendButton from './send-button';
import { FormQuestion } from '../../criar/page';
import { Label } from '@/app/components/Shadcn/label';
import { Card, CardContent, CardHeader } from '@/app/components/Shadcn/card';
import FormResponse from './form-response';
import { ToastWrapper } from '@/app/utils/ToastWrapper';
import { useSearchParams } from 'next/navigation';

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

  const midtermSubmit = async (data: typeof defaultForm) => {
    if (data.respostas.length === 0) {
      ToastWrapper.error("Todas as perguntas (obrigatórias) devem ser respondidas.")
      return
    }
    const submitData = data
    const id = params.id.toString()
    const equipeId = searchParams.get("equipeId")

    const { handlePost } = useFetch({
      url: `${RESPONDER_FORMULARIO.replace("{formularioId}", id)}`,
      isGet: false,
      header: {
        Equipe: equipeId
      }
    })

    const res: any = await handlePost([submitData])
    if (!res) {
      ToastWrapper.error("Não foi possível enviar o formulário.")
      return
    }
    switch ((res as any).status) {
      case 201:
        ToastWrapper.success('Formulário preenchido com sucesso.')
        break
      default:
        ToastWrapper.warn('Algo deu errado no preenchimento do formulário')
        break
    }
  }

  return <>
    <Form.Root className='flex flex-col gap-2 w-full' onSubmit={handleSubmit(midtermSubmit)}>
      <SendButton />
      <div className='flex flex-col gap-4'>
      {
        data && data.data && (
          <>
            {data.data.perguntas.map((formData: FormQuestion, index: number) => {
              return <Card key={index} className={"outline outline-offset-1 outline-2 outline-red-600"}>
                <CardHeader className='pb-2'>
                  <Label>{formData.descricao} {!formData.opcional && (<span className='text-xs text-red-900'>(obrigatório)</span>)}</Label>
                </CardHeader>
                <CardContent>
                  <FormResponse formData={formData} errors={errors} register={register} getValues={getValues} setValue={setValue} />
                </CardContent>
              </Card>
            })}
          </>
        )
      }
      </div>
    </Form.Root>
  </>
}
