'use client'

import { useEffect, useState } from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/Shadcn/tabs'
import { Root } from '@/app/components/Root'

import { useParams, useRouter  } from 'next/navigation'
import { useFetch } from '@/app/hooks/useFetch'

import { capitalizeFirstLetter } from '@/app/utils/CapitalizeFirstLetter'
import Forms from './tabs/forms'
import Users from './tabs/users'

import { RxArrowLeft, RxAvatar, RxClipboard, RxGear } from 'react-icons/rx'
import { Button } from '@/app/components/Shadcn/button'
import BackButton from '@/app/components/BackButton'

export default function Empresa() {

  const router = useRouter()
  const params = useParams()
  const { data } = useFetch({ url: `equipe?equipeid=${params.id}`, isGet: true, errorList: []})

  return (
    <>
      <Root.Spacing>
        <Root.Header title={((data && data.data) && capitalizeFirstLetter(data.data.nome)) || 'Carregando...'}>
            <BackButton />
        </Root.Header>
        <Tabs defaultValue="forms" className="space-y-4">
          <TabsList className="gap-2 h-fit grid grid-cols-1 md:flex md:justify-start">
            <TabsTrigger value="forms" className='flex gap-2 flex-row'><RxClipboard className='w-4 h-4'/> Formulários</TabsTrigger>
            <TabsTrigger value="users" className='flex gap-2 flex-row'><RxAvatar className='w-4 h-4'/>Usuários</TabsTrigger>
            <TabsTrigger value="config" className='flex gap-2 flex-row'><RxGear className='w-4 h-4'/>Configurações</TabsTrigger>
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
