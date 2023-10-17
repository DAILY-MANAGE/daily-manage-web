'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/Shadcn/tabs'
import { Root } from '@/app/components/Root'
import BackButton from '@/app/components/BackButton'

import { capitalizeFirstLetter } from '@/app/utils/CapitalizeFirstLetter'

import { useParams } from 'next/navigation'
import { useFetch } from '@/app/hooks/useFetch'

import Forms from './tabs/forms'
import Users from './tabs/users'

import { RxAvatar, RxClipboard, RxGear } from 'react-icons/rx'
import Config from './config/config'

export default function Empresa() {

  const params = useParams()
  const { data } = useFetch({ url: `equipe?equipeid=${params.id}`, isGet: true})

  return (
    <>
      <Root.Spacing>
        <Root.Header title={((data && data.data) && capitalizeFirstLetter(data.data.nome)) || 'Carregando...'}>
          <BackButton />
          <Config nomeEquipe={data && data.data && data.data.nome} idEquipe={data && data.data && data.data.id}/>
        </Root.Header>
        <Tabs defaultValue="forms" className="space-y-4">
          <TabsList className="gap-2 h-fit grid grid-cols-1 md:flex md:justify-start">
            <TabsTrigger value="forms" className='flex gap-2 flex-row'><RxClipboard className='w-4 h-4'/> Formulários</TabsTrigger>
            <TabsTrigger value="users" className='flex gap-2 flex-row'><RxAvatar className='w-4 h-4'/>Usuários</TabsTrigger>
          </TabsList>
          <TabsContent value="forms" className="space-y-4">
            <Forms />
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <Users data={(data && data.data) && data.data.usuarios}/>
          </TabsContent>

        </Tabs>
      </Root.Spacing>
    </>
  )
}
