import { Metadata } from 'next'

import { TeamForms } from './components/team-forms'
import { Root } from '@/app/components/Root'
import CreateTeamModalWrapper from './components/modal/create-team-button'
import { CreateTeamModal } from './components/modal/create-team-modal'
import CreateTeamButton from './components/modal/create-team-button'

export const metadata: Metadata = {
  title: 'Equipes | Daily Manage',
  description: 'Lista de equipes.',
}

export default function Equipes() {
  return (
    <Root.Spacing>
      <Root.Header title="Equipes">
        <CreateTeamModal>
          <CreateTeamButton />
        </CreateTeamModal>
      </Root.Header>
      <Root.Container>
        <TeamForms />
      </Root.Container>
    </Root.Spacing>
  )
}
