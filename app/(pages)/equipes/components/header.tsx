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

import { useParams, useRouter } from 'next/navigation'
import { useFetch } from '@/app/hooks/useFetch'

import Forms from './tabs/forms'
import Users from './tabs/users'

import { RxAvatar, RxClipboard, RxPerson, RxReader } from 'react-icons/rx'

import Config from './config/config'
import Link from 'next/link'
import { VER_EQUIPE_POR_ID } from '@/app/utils/EndpointStorage'
import { useState } from 'react'
import { AddMemberModal } from './modal/add-member/add-member-modal'
import TabContentWrapper from './tabs/tab-content-wrapper'
import ConfigWrapper from './tabs/config-wrapper'
import { usePermission } from '@/app/hooks/usePermission'

export default function Equipes() {
  const params = useParams()
  const { data, refetch, error } = useFetch({
    url: VER_EQUIPE_POR_ID.replace('{equipeId}', params.id as string),
    isGet: true,
    header: {
      Equipe: params.id,
    },
  })

  const [tab, setTab] = useState('forms')

  const tabsChanged = (newTab: string) => {
    setTab(newTab)
  }

  const { permissions } = usePermission(undefined, params.id as any)

  const router = useRouter()

  if (error && error.length > 0) {
    router.push('/equipes')
  }

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
          <ConfigWrapper
            equipeId={(params.id && parseInt(params.id as string)) || undefined}
            nomeEquipe={data && data.data && data.data.nome}
          />
        </Root.Header>
        <Tabs
          defaultValue={tab}
          className="space-y-4"
          onValueChange={tabsChanged}
        >
          <TabsList className="flex gap-2 h-fit flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-fit gap-2 h-fit grid grid-cols-1 md:flex md:justify-start">
              {permissions &&
                (permissions.includes('VISUALIZAR_FORMULARIO') ||
                  permissions.includes('ADMINISTRADOR')) && (
                  <TabsTrigger value="forms" className="flex gap-2 flex-row">
                    <RxClipboard className="w-4 h-4" /> Formulários
                  </TabsTrigger>
                )}
              {permissions &&
                (permissions.includes('VISUALIZAR_EQUIPE') ||
                  permissions.includes('ADMINISTRADOR')) && (
                  <TabsTrigger value="users" className="flex gap-2 flex-row">
                    <RxAvatar className="w-4 h-4" />
                    Usuários
                  </TabsTrigger>
                )}
              {permissions &&
                (permissions.includes('VER_REGISTROS_DE_USUARIO') ||
                  permissions.includes('ADMINISTRADOR')) && (
                  <TabsTrigger value="logs" className="flex gap-2 flex-row">
                    <RxReader className="w-4 h-4" />
                    Registros
                  </TabsTrigger>
                )}
            </div>
            <div className="w-full h-px mt-2 bg-black/20 md:hidden" />
            <div className="w-full md:w-1/2 h-full gap-2 h-fit grid grid-cols-1 md:flex md:justify-end">
              {tab != '' && (
                <>
                  {permissions &&
                    (permissions.includes('CRIAR_FORMULARIO') ||
                      permissions.includes('ADMINISTRADOR')) && (
                      <Link href={`/formularios/criar?equipeid=${params.id}`}>
                        <Button
                          className="flex gap-2 bg-white text-black border flex items-center justify-center gap-2 border-black/20 mt-2 md:mt-0 font-semibold w-full md:w-fit"
                          variant={'outline'}
                        >
                          Criar Formulário <RxClipboard className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                </>
              )}
              {tab != '' && (
                <>
                  {permissions &&
                    (permissions.includes('EDITAR_USUARIOS') ||
                      permissions.includes('ADMINISTRADOR')) && (
                      <AddMemberModal equipeid={params.id.toString()}>
                        <Button
                          className="flex gap-2 bg-white text-black border flex items-center justify-center gap-2 border-black/20 mt-2 md:mt-0 font-semibold"
                          variant={'outline'}
                        >
                          Adicionar Usuário <RxPerson className="w-4 h-4" />
                        </Button>
                      </AddMemberModal>
                    )}
                </>
              )}
            </div>
          </TabsList>
          <TabContentWrapper
            refetchTeamData={refetch}
            usuarios={data && data.data && data.data.usuarios}
            equipeId={data && data.data && data.data.id}
            teamCreator={data && data.data && data.data.criador.usuario}
          />
        </Tabs>
      </Root.Spacing>
    </>
  )
}
