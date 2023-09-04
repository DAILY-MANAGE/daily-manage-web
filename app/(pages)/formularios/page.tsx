import { Button } from '@/app/components/Shadcn/button'

import { Metadata } from 'next'
import Link from 'next/link'

import { RxClipboard } from 'react-icons/rx'

import { Root } from '../../components/Root'
import FormTable from './components/form-table'

export const metadata: Metadata = {
  title: 'Formulários | Daily Manage',
  description: 'Lista de formulários criados.',
}

export default function Formularios() {
  return (
    <Root.Spacing>
      <Root.Header title="Formulários">
        <Link href="/formularios/criar">
          <Button
            className="border flex items-center justify-center gap-2 border-black/20"
            variant={'outline'}
          >
            Criar Formulário <RxClipboard className="w-4 h-4" />
          </Button>
        </Link>
      </Root.Header>
      <FormTable />
    </Root.Spacing>
  )
}
