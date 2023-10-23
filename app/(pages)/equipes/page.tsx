import { Metadata } from 'next'

import { TeamForms } from './components/team-forms'
import { Root } from '@/app/components/Root'
import { CreateTeamModal } from './components/modal/create-team-modal'
import CreateTeamButton from './components/modal/create-team-button'
import { VER_EQUIPES_CRIADAS, VER_EQUIPES_MEMBRO } from '@/app/utils/EndpointStorage'

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
        <h1 className="w-full text-left font-bold text-xl">Suas Equipes</h1>
        <TeamForms endpoint={VER_EQUIPES_CRIADAS} />
        <h1 className="w-full text-left font-bold text-xl">Membro</h1>
        <TeamForms endpoint={VER_EQUIPES_MEMBRO} />
      </Root.Container>
    </Root.Spacing>
  )
}
