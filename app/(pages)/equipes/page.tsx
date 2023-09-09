import { Root } from '@/app/components/Root'
import { Metadata } from 'next'
import { TeamPicker } from './components/team-picker'

export const metadata: Metadata = {
  title: 'Equipes | Daily Manage',
  description: 'Lista de equipes.',
}

export default function Equipes() {
  return (
    <Root.Spacing>
      <Root.Header title="Equipes"></Root.Header>
      <Root.Container>
        <TeamPicker />
      </Root.Container>
    </Root.Spacing>
  )
}
