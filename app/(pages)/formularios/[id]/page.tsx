import BackButton from '@/app/components/BackButton'
import { Root } from '@/app/components/Root'
import { useFetch } from '@/app/hooks/useFetch';
import type { Metadata } from 'next'
import { useSearchParams } from 'next/navigation';
import FormContext from './components/FormContext';
import FormProvider from './components/FormProvider';

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
  return <FormProvider params={params}/>
}
