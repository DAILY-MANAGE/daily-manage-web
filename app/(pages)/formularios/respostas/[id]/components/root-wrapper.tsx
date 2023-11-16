'use client'

import BackButton from "@/app/components/BackButton";
import { Root } from "@/app/components/Root";
import { useFetch } from "@/app/hooks/useFetch";
import { VER_FORMULARIO_POR_ID } from "@/app/utils/EndpointStorage";
import { useSearchParams } from "next/navigation";

interface RootWrapperProps {
  formId: number
}

export default function RootWrapper({ formId }: RootWrapperProps) {
  const searchParams = useSearchParams()

  const { data } = useFetch({
    url: VER_FORMULARIO_POR_ID.replace("{formularioId}", formId.toString()),
    isGet: true,
    header: {
      Equipe: searchParams.get('equipeId')
    }
  })

  return <Root.Header title={(data && data.data) ? `Respostas - ${data.data.nome}` : 'Carregando...'}>
    <BackButton />
  </Root.Header>
}
