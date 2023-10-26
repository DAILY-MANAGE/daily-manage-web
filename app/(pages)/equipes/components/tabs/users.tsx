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
import { RxCrossCircled, RxAvatar, RxTrash, RxPencil1, RxRocket } from 'react-icons/rx'
import { Subtitle } from '../subtitle'
import DeleteButton from './user-buttons/delete-button'
import EditButton from './user-buttons/edit-button'
import { Fragment } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/Shadcn/tooltip'

interface UsersProps {
  userData: User[]
  equipeId: number,
  userPermissions: string[] | undefined
}

export default function Users({ equipeId, userData, userPermissions }: UsersProps) {
  const { session } = useAuth()

  return (
    <div className="flex flex-col gap-2">
      {(!userData || userData.length === 0) && (
        <Subtitle>
          <RxCrossCircled className="w-4 h-4 my-auto leading-none" /> Nenhum
          usuário foi encontrado.
        </Subtitle>
      )}
      {userData && (
        <Subtitle>
          <RxAvatar className="w-4 h-4 my-auto leading-none" /> {userData.length}{' '}
          usuário{userData.length > 1 && 's'} encontrado{userData.length > 1 && 's'}.
        </Subtitle>
      )}
      {userData &&
        userData.map((teamData: User) => {
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
                    {
                      teamData.permissoes.includes("ADMINISTRADOR") ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className='flex gap-2'>{`${capitalizeFirstLetter(teamData.usuario)}` ||
                      'Carregando...'} <RxRocket className='w-4 h-4 my-auto'/></button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Este usuário é um administrador.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <>
                        {`${capitalizeFirstLetter(teamData.usuario)}` ||
                    'Carregando...'}
                      </>
                      )
                    }
                  </CardTitle>
                  <CardDescription className="flex gap-2">
                    {`(${capitalizeFirstLetter(teamData.nome)})` ||
                      'Carregando...'}
                  </CardDescription>
                </div>
                <div className="w-1/2 flex align-center items-center justify-end m-0 p-0 gap-2">
                  {teamData.usuario !== session?.usuario && (
                    <>
                      {
                        userPermissions && typeof userPermissions === 'object' && (
                          <Fragment>
                              {
                                (userPermissions.includes("EDITAR_USUARIOS") && !teamData.permissoes.includes("ADMINISTRADOR")) && (
                                  <>
                                    <DeleteButton equipeId={equipeId} usuario={teamData.usuario} />
                                    <EditButton equipeId={equipeId} usuario={teamData.usuario} />
                                  </>
                                )
                              }
                          </Fragment>
                        )
                      }
                    </>
                  )}
                </div>
              </CardHeader>
            </Card>
          )
        })}
    </div>
  )
}
