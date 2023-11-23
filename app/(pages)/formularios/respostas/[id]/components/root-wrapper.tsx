'use client'

import BackButton from '@/app/components/BackButton'
import { Root } from '@/app/components/Root'
import { useFetch } from '@/app/hooks/useFetch'
import {
  VER_FORMULARIO_POR_ID,
  VER_RESPOSTAS_DE_UM_FORMULARIO,
} from '@/app/utils/EndpointStorage'
import { useSearchParams } from 'next/navigation'
import HeaderFunctions from './header-functions'

interface RootWrapperProps {
  formId: number
}

export default function RootWrapper({ formId }: RootWrapperProps) {
  const searchParams = useSearchParams()

  const { data } = useFetch({
    url: VER_FORMULARIO_POR_ID.replace('{formularioId}', formId.toString()),
    isGet: true,
    header: {
      Equipe: searchParams.get('equipeId'),
    },
  })

  const dataInner = data && data.data

  return (
    <>
      <Root.Header
        title={dataInner ? `Respostas - ${dataInner.nome}` : 'Carregando...'}
      >
        <BackButton />
      </Root.Header>
      <Root.Container>
        <HeaderFunctions formId={formId} />
      </Root.Container>
    </>
  )
}
