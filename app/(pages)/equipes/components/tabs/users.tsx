import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/Shadcn/avatar"
import { Button } from "@/app/components/Shadcn/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/Shadcn/card"
import { useAuth } from "@/app/hooks/useAuth"
import { useFetch } from "@/app/hooks/useFetch"
import { User } from "@/app/interfaces/TeamData"
import { capitalizeFirstLetter } from "@/app/utils/CapitalizeFirstLetter"
import { getInitialLetter } from "@/app/utils/GetInitialLetter"
import { ToastWrapper } from "@/app/utils/ToastWrapper"
import { RxCrossCircled, RxAvatar, RxTrash } from 'react-icons/rx';
import { Subtitle } from "../subtitle"

interface UsersProps {
  data: User[]
}

export default function Users({ data }: UsersProps) {

  const { handleDelete } = useFetch({
    url: '/usuario/deletar',
    isGet: false
  })

  const { session } = useAuth()

  const removeUser = async (usuario: string) => {
    const res = await handleDelete(usuario)
    switch((res as any).status) {
      case 200:
        ToastWrapper.success("Usuário removido da equipe com sucesso.")
      default:
        break
    }
  }

  return <div className="flex flex-col gap-2">
    {(!data || data.length === 0) && (
      <Subtitle>
        <RxCrossCircled className="w-4 h-4 my-auto leading-none" /> Nenhum
        usuário foi encontrado.
      </Subtitle>
    )}
    {data && (
      <Subtitle>
        <RxAvatar className="w-4 h-4 my-auto leading-none" /> {data.length} usuário{data.length > 1 && 's'} encontrado{data.length > 1 && 's'}.
      </Subtitle>
    )}
    {data &&
      data.map((teamData: User) => {
        return (
          <Card
            key={teamData.usuario}
            className="shadow w-full h-fit hover:bg-zinc-50 transition-colors cursor-pointer group animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards"
          >
            <CardHeader className="space-y-0 flex flex-row p-6 py-4 gap-3">
              <div className="aspect-square w-12 h-12">
                <Avatar className="h-full w-full inline">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback className="border">{getInitialLetter(teamData.nome)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="w-1/2 flex justify-start align-center flex-col gap-1">
                <CardTitle className="flex gap-2">{`${capitalizeFirstLetter(teamData.usuario)}` || 'Carregando...'}</CardTitle>
                <CardDescription className="flex gap-2">{`(${capitalizeFirstLetter(teamData.nome)})` || 'Carregando...'}</CardDescription>
              </div>
              <div className="w-1/2 flex align-center items-center justify-end m-0 p-0">
                {
                  teamData.usuario != session?.usuario && (
                    <Button variant={'outline'} className="w-12 h-12 aspect-square px-2 py-1 bg-red-600 hover:bg-red-800" onClick={() => removeUser(teamData.usuario)}>
                    <RxTrash className="w-6 h-6 my-auto text-white" />
                  </Button>
                  )
                }
              </div>
            </CardHeader>
          </Card>
        )
      })}
  </div>
}
