import { AuthRoot } from '@/app/components/AuthRoot'

import { Metadata } from 'next'
import { RegisterWrapper } from './components/register-wrapper'

export const metadata: Metadata = {
  title: 'Cadastro | Daily Manage',
  description: 'Realize o cadastro para ter acesso ao seus formulários.',
}

export default function Cadastro() {
  return <AuthRoot element={<RegisterWrapper />} background="cadastro" />
}
