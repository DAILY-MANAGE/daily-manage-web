'use client'

import { useEffect, useState } from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/Shadcn/tabs'
import { Root } from '@/app/components/Root'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Empresa() {
  const router = useRouter()

  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      console.log('non auth')
      router.push('/login')
    }
  })

  const [teamName, setTeamName] = useState<string | undefined>()

  useEffect(() => {
    const getTeamName = () => {
      // Logica de request para pegar nome da empresa
      return 'Bracell Lençóis-Paulista'
    }
    const loadedTeamName = getTeamName()
    setTeamName(loadedTeamName)
  }, [])

  return (
    <>
      <Root.Spacing>
        <Root.Header title={teamName || 'Carregando...'}></Root.Header>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="gap-2 h-fit grid grid-cols-1 md:flex md:justify-start">
            <TabsTrigger value="forms">Formulários</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="setor">Setores</TabsTrigger>
            <TabsTrigger value="config">Configurações</TabsTrigger>
          </TabsList>
          <TabsContent value="forms" className="space-y-4">
            <p>Formulários aparecem aqui</p>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <p>Usuários aparecem aqui</p>
          </TabsContent>
          <TabsContent value="setor" className="space-y-4">
            <p>Setores aparecem aqui</p>
          </TabsContent>
          <TabsContent value="config" className="space-y-4">
            <p>Configurações aparecem aqui</p>
          </TabsContent>
        </Tabs>
      </Root.Spacing>
    </>
  )
}
