import { Metadata } from 'next'

import { Root } from '../../components/Root'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card'
import { Label } from '@/app/components/Shadcn/label'
import { Input } from '@/app/components/Shadcn/input'

import Exit from './components/exit'

export const metadata: Metadata = {
  title: 'Configurações | Daily Manage',
  description: 'Configurações do usuário.',
}

export default function Configuracoes() {
  return (
    <Root.Spacing>
      <Root.Header title="Configurações">
          <Exit />
      </Root.Header>
      <div className="w-full h-fit flex flex-col space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Usuário</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nome{' '}
                <small className="text-red-800">(nome não pode alterado)</small>
              </Label>
              <Input id="name" value="Lorem Ipsum" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Empresa</CardTitle>
            <CardDescription>Informações sobre a Empresa</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value="Lorem Ipsum" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Root.Spacing>
  )
}
