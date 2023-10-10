import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/Shadcn/avatar"
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/Shadcn/card"
import { User } from "@/app/interfaces/TeamData"
import { capitalizeFirstLetter } from "@/app/utils/CapitalizeFirstLetter"
import { getInitialLetter } from "@/app/utils/GetInitialLetter"
import Link from "next/link"
import { RxChevronRight } from "react-icons/rx"

interface UsersProps {
  data: User[]
}

export default function Users({ data }: UsersProps) {
  return <div className="flex flex-col gap-2">
      {data &&
        data.map((teamData: User) => {
          return (
            <Link
              href={`/usuarios/${teamData.usuario}`}
              key={teamData.usuario}
              className="w-full"
            >
              <Card
                key={teamData.usuario}
                className="shadow w-full h-fit hover:bg-zinc-50 transition-colors cursor-pointer group animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards"
              >
                <CardHeader className="space-y-0 flex flex-row p-6 py-4 gap-3">
                  <div className="aspect-square w-12 h-12">
                    <Avatar className="h-full w-full inline">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback className="border">{ getInitialLetter(teamData.nome) }</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="w-1/2 flex justify-start align-center flex-col gap-1">
                    <CardTitle className="flex gap-2">{`${capitalizeFirstLetter(teamData.usuario)}` || 'Carregando...'}</CardTitle>
                    <CardDescription className="flex gap-2">{`(${capitalizeFirstLetter(teamData.nome)})` || 'Carregando...'}</CardDescription>
                  </div>
                  <div className="w-1/2 flex align-center items-center justify-end m-0 p-0">
                    <RxChevronRight className="w-6 h-full my-auto group-hover:animate-fade-right" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
  </div>
}
