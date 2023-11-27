import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/Shadcn/avatar'
import { Button } from '@/app/components/Shadcn/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card'
import { useAuth } from '@/app/hooks/useAuth'
import { User } from '@/app/interfaces/TeamData'
import { capitalizeFirstLetter } from '@/app/utils/CapitalizeFirstLetter'
import { getInitialLetter } from '@/app/utils/GetInitialLetter'
import {
  RxCrossCircled,
  RxAvatar,
  RxTrash,
  RxPencil1,
  RxRocket,
  RxChevronLeft,
  RxChevronRight,
  RxReload,
} from 'react-icons/rx'
import { Subtitle } from '../subtitle'
import DeleteButton from './user-buttons/delete-button'
import EditButton from './user-buttons/edit-button'
import { Fragment, useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/Shadcn/tooltip'
import LogsButton from './user-buttons/logs-button'
import { Input } from '@/app/components/Shadcn/input'
import { useFetch } from '@/app/hooks/useFetch'
import { FILTRAR_USUARIOS_DA_EQUIPE } from '@/app/utils/EndpointStorage'

interface UsersProps {
  userData: User[]
  equipeId: number
  userPermissions: string[] | undefined
  refetchTeamData: any
  teamCreator: string
}

export default function Users({
  equipeId,
  userPermissions,
  refetchTeamData,
  teamCreator,
}: UsersProps) {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const { session } = useAuth()

  const { data, loading, error, refetch } = useFetch({
    url: `${FILTRAR_USUARIOS_DA_EQUIPE}?page=${page}&size=5&nome=${search}`,
    isGet: true,
    header: {
      Equipe: equipeId,
    },
  })

  const dataInner = data && data.data
  const content = dataInner && dataInner.content

  return (
    <>
      <Input
        placeholder="Filtrar usuários..."
        onChange={(event: any) => setSearch(event.target.value)}
        className="h-8 w-[23rem] border border-black/20 shadow focus:outline focus:outline-1 outline-offset-2"
      />
      <div className="flex flex-col gap-2">
        {(!content || content.length === 0) && (
          <Subtitle>
            <RxCrossCircled className="w-4 h-4 my-auto leading-none" /> Nenhum
            usuário foi encontrado.
          </Subtitle>
        )}
        {loading && (
          <Subtitle>
            <RxReload className="w-4 h-4 my-auto leading-none animate-spin" />
            Carregando usuários...
          </Subtitle>
        )}
        {content && content.length > 0 && (
          <Subtitle>
            <RxAvatar className="w-4 h-4 my-auto leading-none" />{' '}
            {content.length} usuário{content.length > 1 && 's'} encontrado
            {content.length > 1 && 's'}.
          </Subtitle>
        )}

        {content &&
          content.map((teamData: User) => {
            return (
              <Card
                key={teamData.usuario}
                className="shadow w-full h-fit hover:bg-zinc-50 transition-colors cursor-pointer group animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards"
              >
                <CardHeader className="space-y-0 flex flex-row p-6 py-4 gap-3">
                  <div className="aspect-square w-12 h-12">
                    <Avatar className="h-full w-full inline">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback className="border">
                        {getInitialLetter(teamData.nome)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="w-1/2 flex justify-start align-center flex-col gap-1">
                    <CardTitle className="flex gap-2">
                      {teamData.permissoes.includes('ADMINISTRADOR') ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="flex gap-2">
                                {`${capitalizeFirstLetter(teamData.nome)}` ||
                                  'Carregando...'}{' '}
                                <RxRocket className="w-4 h-4 my-auto" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Este usuário é um administrador.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <>
                          {`${capitalizeFirstLetter(teamData.nome)}` ||
                            'Carregando...'}
                        </>
                      )}
                    </CardTitle>
                    <CardDescription className="flex gap-2">
                      {`(${capitalizeFirstLetter(teamData.usuario)})` ||
                        'Carregando...'}
                    </CardDescription>
                  </div>
                  <div className="w-1/2 flex align-center items-center justify-end m-0 p-0 gap-2">
                    {teamData.usuario !== session?.usuario &&
                      teamData.usuario !== teamCreator && (
                        <>
                          {teamData.permissoes &&
                            typeof teamData.permissoes === 'object' && (
                              <Fragment>
                                {(teamData.permissoes.includes(
                                  'EDITAR_USUARIOS',
                                ) ||
                                  teamData.permissoes.includes(
                                    'ADMINISTRADOR',
                                  )) && (
                                  <>
                                    <DeleteButton
                                      equipeId={equipeId}
                                      usuario={teamData.usuario}
                                      refetch={refetch}
                                    />
                                    <EditButton
                                      refetch={refetchTeamData}
                                      equipeId={equipeId}
                                      usuario={teamData.usuario}
                                    />
                                    <LogsButton
                                      equipeId={equipeId}
                                      usuario={teamData.usuario}
                                    />
                                  </>
                                )}
                              </Fragment>
                            )}
                        </>
                      )}
                  </div>
                </CardHeader>
              </Card>
            )
          })}
      </div>
      <div className="w-full min-h-10 flex gap-2 items-center">
        <div className="w-1/2 flex justify-start items-center">
          <p className="font-semibold">
            Página {dataInner ? (dataInner.totalPages > 0 ? page + 1 : 0) : 0}{' '}
            de {dataInner ? dataInner.totalPages : '0'}
          </p>
        </div>
        <div className="w-1/2 flex justify-end items-center gap-2">
          <Button
            variant={'outline'}
            className="border border-black/20 shadow"
            disabled={dataInner && dataInner.first}
            onClick={() => {
              if (dataInner.first) {
                return
              }
              if (page - 1 < 0) {
                return
              }
              setPage((state) => state - 1)
            }}
          >
            <RxChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant={'outline'}
            className="border border-black/20 shadow"
            disabled={dataInner && dataInner.last}
            onClick={() => {
              if (dataInner.last) {
                return
              }
              if (page + 1 > dataInner.totalPages) {
                return
              }
              setPage((state) => state + 1)
            }}
          >
            <RxChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  )
}
