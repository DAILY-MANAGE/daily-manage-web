'use client';

import { useFetch } from '@/app/hooks/useFetch';
import { VER_RESPOSTAS_DE_UM_FORMULARIO } from '@/app/utils/EndpointStorage';
import { useSearchParams } from 'next/navigation';

interface AmountOfResponsesProps {
  formId: number;
}

export default function AmountOfResponses({ formId }: AmountOfResponsesProps) {
  const searchParams = useSearchParams();

  const { data } = useFetch({
    url: VER_RESPOSTAS_DE_UM_FORMULARIO.replace(
      '{formularioId}',
      formId.toString(),
    ),
    isGet: true,
    header: {
      Equipe: searchParams.get('equipeId'),
    },
  });

  const dataInner = data && data.data;

  return (
    <div className="flex flex-start items-center">
      <p className="text-xl font-bold">
        {dataInner ? (
          <>({dataInner.totalElements} respostas)</>
        ) : (
          <>(0 respostas)</>
        )}
      </p>
    </div>
  );
}
