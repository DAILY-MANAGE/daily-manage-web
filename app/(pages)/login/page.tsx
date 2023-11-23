import { Metadata } from 'next'
import { AuthRoot } from '@/app/components/AuthRoot'

import { LoginWrapper } from './components/login-wrapper'

export const metadata: Metadata = {
  title: 'Login | Daily Manage',
  description: 'Faça login para ter acesso ao seus formulários.',
}

export default function Login() {
  return <AuthRoot element={<LoginWrapper />} />
}
