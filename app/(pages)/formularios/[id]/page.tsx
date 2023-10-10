import BackButton from '@/app/components/BackButton'
import { Root } from '@/app/components/Root'
import type { Metadata } from 'next'
import FormContext from './components/FormContext';

type Props = {
  params: { id: number }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id

  return {
    title: `Formulário ${id} | Daily Manage`,
  }
}

export default function IdFuncionario({ params }: Props) {
  return (
    <Root.Spacing>
      <Root.Header title={`Formulário ${params.id}`}>
        <FormContext />
      </Root.Header>
      <Root.Container>
      </Root.Container>
    </Root.Spacing>
  )
}
