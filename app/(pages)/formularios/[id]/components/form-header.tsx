'use client'

import BackButton from "@/app/components/BackButton";
import { Root } from "@/app/components/Root";
import { useFetch } from "@/app/hooks/useFetch";
import { VER_FORMULARIO_POR_ID } from "@/app/utils/EndpointStorage";
import { useSearchParams } from "next/navigation";

export default function FormHeader({ formId }: { formId: number}) {

  const searchParams = useSearchParams()

  const equipeId = searchParams.get("equipeId")

  const { data } = useFetch({
    url: VER_FORMULARIO_POR_ID.replace("{formularioId}", formId.toString()),
    isGet: true,
    header: {
      Equipe: equipeId && parseInt(equipeId)
    }
  })

  console.log(data)

  return <>
    <Root.Header title={data && data.data && data.data.nome}>
      <BackButton />
    </Root.Header>
  </>
}
