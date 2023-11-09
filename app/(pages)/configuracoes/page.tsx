import { Metadata } from 'next'

import { Root } from '../../components/Root'
import ConfigWrapper from './components/config-wrapper'

export const metadata: Metadata = {
  title: 'Configurações | Daily Manage',
  description: 'Configurações do usuário.',
}

export default function Configuracoes() {
  return (
    <Root.Spacing>
      <ConfigWrapper />
    </Root.Spacing>
  )
}
