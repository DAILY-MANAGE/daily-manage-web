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
import { Button } from '@/app/components/Shadcn/button'

import { useParams } from 'next/navigation'
import { useFetch } from '@/app/hooks/useFetch'

import Forms from './tabs/forms'
import Users from './tabs/users'

import { RxAvatar, RxClipboard } from 'react-icons/rx'

import Config from './config/config'
import Link from 'next/link'
import { VER_EQUIPE_POR_ID } from '@/app/utils/EndpointStorage'

export default function Equipes() {
  const params = useParams()
  const { data } = useFetch({
    url: VER_EQUIPE_POR_ID.replace("{equipeId}", params.id as string),
    isGet: true,
    header: {
      Equipe: params.id
    }
  })

  return (
    <>
      <Root.Spacing>
        <Root.Header
          title={
            (data && data.data && capitalizeFirstLetter(data.data.nome)) ||
            'Carregando...'
          }
        >
          <BackButton />
          <Link href={`/formularios/criar?equipeid=${params.id}`}>
            <Button
              className="flex gap-2 bg-white text-black border flex items-center justify-center gap-2 border-black/20 mt-2 md:mt-0 font-semibold"
              variant={'outline'}
            >
              Criar Formulário <RxClipboard className="w-4 h-4" />
            </Button>
          </Link>
          <Config
            nomeEquipe={data && data.data && data.data.nome}
            idEquipe={data && data.data && data.data.id}
          />
        </Root.Header>
        <Tabs defaultValue="forms" className="space-y-4">
          <TabsList className="gap-2 h-fit grid grid-cols-1 md:flex md:justify-start">
            <TabsTrigger value="forms" className="flex gap-2 flex-row">
              <RxClipboard className="w-4 h-4" /> Formulários
            </TabsTrigger>
            <TabsTrigger value="users" className="flex gap-2 flex-row">
              <RxAvatar className="w-4 h-4" />
              Usuários
            </TabsTrigger>
          </TabsList>
          <TabsContent value="forms" className="space-y-4">
            <Forms />
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <Users equipeId={data && data.data && data.data.id} data={data && data.data && data.data.usuarios} />
          </TabsContent>
        </Tabs>
      </Root.Spacing>
    </>
  )
}
