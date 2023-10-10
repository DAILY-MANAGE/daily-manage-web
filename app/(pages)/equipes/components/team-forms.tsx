'use client'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card'
import { useFetch } from '@/app/hooks/useFetch'
import { TeamData } from '@/app/interfaces/TeamData'
import { capitalizeFirstLetter } from '@/app/utils/CapitalizeFirstLetter'
import { Subtitle } from './subtitle'

import { RxChevronRight, RxCrossCircled, RxReload } from 'react-icons/rx'
import Link from 'next/link'
import { cookieKeyOriginal } from '@/app/hooks/useAuth'
import Cookies from 'js-cookie'

export function TeamForms() {

  const { data, error, loading } = useFetch({ url: 'equipe', isGet: true })

  return (
    <>
      {data && (data as any).data &&
        !loading &&
        (data as any).data.map((teamData: TeamData) => {
          return (
            <Link
              href={`/equipes/${teamData.id}?t=${Cookies.get(cookieKeyOriginal)}`}
              key={teamData.id}
              className="w-full"
            >
              <Card
                key={teamData.id}
                className="shadow w-full h-fit hover:bg-zinc-50 transition-colors cursor-pointer group animate-fade animate-once duration-300 animate-ease-out animate-normal animate-fill-forwards"
              >
                <CardHeader className="space-y-0 flex flex-row p-6 py-4">
                  <div className="w-1/2 flex justify-start align-center flex-col gap-1">
                    <CardTitle>{capitalizeFirstLetter(teamData.nome) || 'Carregando...'}</CardTitle>
                    <CardDescription className='leading-none'>
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
        <Subtitle>{`${data.length} Equipe${data.length > 1 ? 's' : ''
          } encontrada${data.length > 1 ? 's' : ''}`}</Subtitle>
      )}
      {loading && (
        <Subtitle>
          <RxReload className="w-4 h-4 my-auto leading-none animate-spin" />
          Carregando equipes...
        </Subtitle>
      )}
      {!loading && ((Array.isArray(data) && data.length === 0) || !data) && (
        <Subtitle>
          <RxCrossCircled className="w-4 h-4 my-auto leading-none" /> Nenhuma
          equipe foi encontrada.
        </Subtitle>
      )}
      {error && error.length > 0 && (
        <Subtitle>
          <RxCrossCircled className="w-4 h-4 my-auto leading-none" /> Houve um
          erro durante o carregamento das equipes.
        </Subtitle>
      )}
    </>
  )
}
