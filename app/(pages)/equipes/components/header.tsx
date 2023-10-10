'use client'

import { useEffect, useState } from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/Shadcn/tabs'
import { Root } from '@/app/components/Root'

import { useParams  } from 'next/navigation'
import { useFetch } from '@/app/hooks/useFetch'

import { capitalizeFirstLetter } from '@/app/utils/CapitalizeFirstLetter'
import Forms from './tabs/forms'
import Users from './tabs/users'

export default function Empresa() {

  const params = useParams()
  const { data } = useFetch({ url: `equipe?equipeid=${params.id}`, isGet: true, errorList: []})

  return (
    <>
      <Root.Spacing>
        <Root.Header title={((data && data.data) && capitalizeFirstLetter(data.data.nome)) || 'Carregando...'}></Root.Header>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="gap-2 h-fit grid grid-cols-1 md:flex md:justify-start">
            <TabsTrigger value="forms">Formulários</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="setor">Setores</TabsTrigger>
            <TabsTrigger value="config">Configurações</TabsTrigger>
          </TabsList>
          <TabsContent value="forms" className="space-y-4">
            <Forms />
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <Users data={(data && data.data) && data.data.usuarios}/>
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
