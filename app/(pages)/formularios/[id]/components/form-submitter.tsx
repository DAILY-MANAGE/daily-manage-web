import { Form } from '@/app/components/Form';
import { Card, CardContent, CardHeader } from '@/app/components/Shadcn/card';
import { Label } from '@/app/components/Shadcn/label';
import { ToastWrapper } from '@/app/utils/ToastWrapper';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { FormQuestion } from '../../criar/page';

import FormResponse from './form-response';
import SendButton from './send-button';

import { useSearchParams } from 'next/navigation';
import Props from '../components/form-wrapper';
import { useFetch } from '@/app/hooks/useFetch';
import { RESPONDER_FORMULARIO } from '@/app/utils/EndpointStorage';

interface FormSubmitterProps {
  data: any;
  params: any;
}

const defaultForm = {
  respostas: [],
};

interface InnerData {
  idpergunta: number;
  resposta: string;
}

export default function FormSubmitter({ data, params }: FormSubmitterProps) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: data && data.data ? data.data : defaultForm,
  });

  const searchParams = useSearchParams();

  const { handlePost } = useFetch({
    url: RESPONDER_FORMULARIO.replace('{formularioId}', params.id.toString()),
    isGet: false,
    header: {
      Equipe: searchParams.get('equipeId'),
    },
  });

  const midtermSubmit = async (data: typeof defaultForm) => {
    if (data.respostas.length === 0) {
      ToastWrapper.error(
        'Todas as perguntas (obrigatórias) devem ser respondidas.',
      );
      return;
    }
    const submitData = {
      respostas: data.respostas.filter(
        (data: InnerData | undefined) => data?.idpergunta,
      ),
    };
    const res: any = await handlePost(submitData);
    if (!res) {
      ToastWrapper.error('Não foi possível enviar o formulário.');
      return;
    }
    switch ((res as any).status) {
      case 201:
        ToastWrapper.success('Formulário preenchido com sucesso.');
        break;
      default:
        ToastWrapper.warn('Algo deu errado no preenchimento do formulário');
        break;
    }
  };

  return (
    <>
      <Form.Root
        className="flex flex-col gap-2 w-full"
        onSubmit={handleSubmit(midtermSubmit)}
      >
        <SendButton />
        <div className="flex flex-col gap-4">
          {data && data.data && (
            <>
              {data.data.perguntas.map(
                (formData: FormQuestion, index: number) => {
                  let hasError = undefined;
                  return (
                    <Card
                      key={index}
                      className={
                        hasError
                          ? 'outline outline-offset-1 outline-2 outline-red-600'
                          : ''
                      }
                    >
                      <CardHeader className="pb-2">
                        <Label>
                          {formData.descricao}{' '}
                          {!formData.opcional && (
                            <span className="text-xs text-red-900">
                              (obrigatório)
                            </span>
                          )}
                        </Label>
                      </CardHeader>
                      <CardContent>
                        <FormResponse
                          formData={formData}
                          errors={errors}
                          register={register}
                          getValues={getValues}
                          setValue={setValue}
                          hasError={hasError}
                        />
                      </CardContent>
                    </Card>
                  );
                },
              )}
            </>
          )}
        </div>
      </Form.Root>
    </>
  );
}
