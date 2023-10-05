import { Metadata } from 'next'

import { TeamForms } from './components/team-forms'
import { Root } from '@/app/components/Root'

export const metadata: Metadata = {
  title: 'Equipes | Daily Manage',
  description: 'Lista de equipes.',
}

export default function Equipes() {
  return (
    <Root.Spacing>
      <Root.Header title="Equipes">
      </Root.Header>
      <Root.Container>
        <TeamForms />
      </Root.Container>
    </Root.Spacing>
  )
}
