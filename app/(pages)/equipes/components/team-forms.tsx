'use client'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card'

import { useFetch } from '@/app/hooks/useFetch'
import { TeamData } from '@/app/interfaces/TeamData'

import { useState } from 'react'
import { RxChevronRight, RxCrossCircled, RxReload } from 'react-icons/rx'
import { Subtitle } from './subtitle'

import Link from 'next/link'
import { useAuth } from '@/app/hooks/useAuth'

export function TeamForms() {
  const { session } = useAuth();

  const [teams, setTeams] = useState<TeamData[]>([
    {
      idEquipe: 1,
      nome: 'Equipe 1',
      usuarios: [
        {
          usuario: "usuario",
          nome: "Bingus",
          permissoes: [
            "VIEW_FORMULARY"
          ]
        }
      ],

    },
  ])

  const { data, error, loading } = useFetch({ url: 'equipe', isGet: true, defaultData: teams })

  return (
    <>
      {Array.isArray(data) &&
        !loading &&
        data.map((teamData: TeamData) => {
          return (
            <Link
              href={`/equipes/${teamData.idEquipe}`}
              key={teamData.idEquipe}
              className="w-full"
            >
              <Card
                key={teamData.idEquipe}
                className="shadow w-full h-fit hover:bg-zinc-50 transition-colors cursor-pointer group animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards"
              >
                <CardHeader className="space-y-0 flex flex-row p-6 py-4">
                  <div className="w-1/2 flex justify-start align-center flex-col gap-1">
                    <CardTitle>{teamData.nome || 'Carregando...'}</CardTitle>
                    <CardDescription className='leading-none'>
                      {`Identificação: ${teamData.idEquipe}` || 'Carregando...'}
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
