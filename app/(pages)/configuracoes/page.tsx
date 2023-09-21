import { Button } from '@/app/components/Shadcn/button'
import { Metadata } from 'next'
import Link from 'next/link'

import { RxExit } from 'react-icons/rx'

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

import { signOut } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'Configurações | Daily Manage',
  description: 'Lista de formulários criados.',
}

export default function Configuracoes() {
  return (
    <Root.Spacing>
      <Root.Header title="Configurações">
          <Button
            className="border flex items-center justify-center gap-2 border-black/20 bg-red-400 hover:bg-red-200 hover:animate-pulse mt-2 md:mt-0 font-semibold text-red-900"
            variant={'outline'}
            onClick={() => signOut()}
          >
            Sair da Conta <RxExit className="w-4 h-4" />
          </Button>
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
