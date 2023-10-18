import { useFetch } from '@/app/hooks/useFetch'
import { useParams } from 'next/navigation'
import { FormData } from '@/app/interfaces/FormData'
import Link from 'next/link'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card'
import { capitalizeFirstLetter } from '@/app/utils/CapitalizeFirstLetter'
import { RxChevronRight, RxCrossCircled, RxReload } from 'react-icons/rx'
import { Subtitle } from '../subtitle'

export default function Forms() {
  const params = useParams()

  const { data, loading } = useFetch({
    url: `/equipe/forms/todos?equipeid=${params.id}`,
    isGet: true
  })

  return (
    <div className="flex flex-col gap-2">
      {data &&
        (data as any).data &&
        !loading &&
        (data as any).data.content &&
        (data as any).data.content.map((teamData: FormData) => {
          return (
            <Link
              href={`/formularios/${teamData.id}?equipeid=${params.id}`}
              key={teamData.id}
              className="w-full"
            >
              <Card
                key={teamData.id}
                className="shadow w-full h-fit hover:bg-zinc-50 transition-colors cursor-pointer group animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards"
              >
                <CardHeader className="space-y-0 flex flex-row p-6 py-4">
                  <div className="w-1/2 flex justify-start align-center flex-col gap-1">
                    <CardTitle>
                      {`Formulário ${capitalizeFirstLetter(teamData.nome)}` ||
                        'Carregando...'}
                    </CardTitle>
                    <CardDescription className="leading-none">
                      {`Identificação: ${teamData.id}` || 'Carregando...'}
                    </CardDescription>
                  </div>
                  <div className="w-1/2 flex align-center items-center justify-end m-0 p-0">
                    <RxChevronRight className="w-6 h-full my-auto group-hover:animate-fade-right" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      {!loading && Array.isArray(data) && data.length > 0 && (
        <Subtitle>{`${data.length} Formulário${
          data.length > 1 ? 's' : ''
        } encontrado${data.length > 1 ? 's' : ''}`}</Subtitle>
      )}
      {loading && (
        <Subtitle>
          <RxReload className="w-4 h-4 my-auto leading-none animate-spin" />
          Carregando formulários...
        </Subtitle>
      )}
      {!loading &&
        (!data ||
          !data.data ||
          !data.data.content ||
          data.data.content.length === 0) && (
          <Subtitle>
            <RxCrossCircled className="w-4 h-4 my-auto leading-none" /> Nenhum
            formulário foi encontrada.
          </Subtitle>
        )}
    </div>
  )
}
