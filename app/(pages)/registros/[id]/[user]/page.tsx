import BackButton from '@/app/components/BackButton'
import { Root } from '@/app/components/Root'
import RequiresAuth from '@/app/providers/requires-auth'
import { Metadata } from 'next'
import UserLogsProvider from './components/user-logs-provider'

export const metadata: Metadata = {
  title: 'Registros | Daily Manage',
  description: 'Lista de registros de um usuário.',
}

export default function UserLogs() {
  return (
    <RequiresAuth>
      <Root.Spacing>
        <Root.Header title={`Registros`}>
          <BackButton />
        </Root.Header>
        <Root.Container>
          <UserLogsProvider />
        </Root.Container>
      </Root.Spacing>
    </RequiresAuth>
  )
}
