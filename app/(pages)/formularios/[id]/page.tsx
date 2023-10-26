import BackButton from '@/app/components/BackButton'
import { Root } from '@/app/components/Root'
import { capitalizeFirstLetter } from '@/app/utils/CapitalizeFirstLetter';
import { ENDPOINT, VER_FORMULARIO_POR_ID } from '@/app/utils/EndpointStorage';
import axios from 'axios';
import type { Metadata } from 'next'
import FormContext from './components/form-context';
import FormHeader from './components/form-header';
import FormWrapper from './components/form-wrapper';
import SendButton from './components/send-button';

type Props = {
  params: { id: number }
}

export async function generateMetadata({
  params,
  searchParams,
}: any): Promise<Metadata> {
  const id = params.id
  const defaultMetadata = {
    title: `Formulário ${id} | Daily Manage`,
  }

  const token = searchParams.t
  const equipeId = searchParams.equipeId

  if (!ENDPOINT || !token || !equipeId) {
    return defaultMetadata
  }

  const product = await axios.get(`${ENDPOINT}${VER_FORMULARIO_POR_ID.replace("{formularioId}", id)}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Equipe: parseInt(equipeId)
    },
    data: {},
  })


  if (!product) {
    return defaultMetadata
  }

  return {
    title: `${capitalizeFirstLetter(product.data.nome)} | Daily Manage`,
  }
}


export default function IdFuncionario({ params }: Props) {

  return (
    <div className="md:px-64 min-h-screen bg-gradient-to-b from-blue-100 via-white to-slate-700">
      <Root.Spacing>
        <FormHeader formId={params.id}/>
        <Root.Container>
          <FormWrapper params={params}/>
        </Root.Container>
      </Root.Spacing>
    </div>

  )
}
