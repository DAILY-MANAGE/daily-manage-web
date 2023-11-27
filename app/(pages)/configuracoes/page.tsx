import { Metadata } from 'next'

import { Root } from '../../components/Root'
import ConfigWrapper from './components/config-wrapper'
import RequiresAuth from '@/app/providers/requires-auth'

export const metadata: Metadata = {
  title: 'Configurações | Daily Manage',
  description: 'Configurações do usuário.',
}

export default function Configuracoes() {
  return (
    <RequiresAuth>
      <Root.Spacing>
        <ConfigWrapper />
      </Root.Spacing>
    </RequiresAuth>
  )
}
