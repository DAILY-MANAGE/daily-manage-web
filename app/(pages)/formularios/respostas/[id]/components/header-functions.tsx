'use client'

import { Button } from '@/app/components/Shadcn/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/app/components/Shadcn/card'
import { Label } from '@/app/components/Shadcn/label'
import { useFetch } from '@/app/hooks/useFetch'
import { VER_ESTATISTICA_FORMULARIO } from '@/app/utils/EndpointStorage'
import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useState } from 'react'
import { RxChevronLeft, RxChevronRight, RxReload } from 'react-icons/rx'
import { SiGooglesheets } from 'react-icons/si'
import AmountOfResponses from './amount-of-responses'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PerguntaData {
  id: number
  descricao: string
  tipoResposta: string
  opcional: boolean
}

interface FormStatsData {
  pergunta: PerguntaData
  quantidade: number
  moda: string
  media: number
  ocorrencia: any
}

interface HeaderFunctionsProps {
  formId: number
}

export default function HeaderFunctions({ formId }: HeaderFunctionsProps) {
  const searchParams = useSearchParams()

  const { data } = useFetch({
    url: VER_ESTATISTICA_FORMULARIO.replace(
      '{formularioId}',
      formId.toString(),
    ),
    isGet: true,
    header: {
      Equipe: searchParams.get('equipeId'),
    },
  })

  const dataInner = data && data.data

  const [page, setPage] = useState(0)
  const [generatingSheet, setGeneratingSheet] = useState(false)

  const router = useRouter()

  const generateSheet = () => {
    setGeneratingSheet(true)
    setTimeout(() => {
      setGeneratingSheet(false)
    }, 10000)
  }

  return (
    <div className="w-full flex gap-3 flex-col">
      <Card className="w-full">
        <CardContent className="p-6 py-4 grid grid-cols-[0.5fr_0.5fr]">
          <AmountOfResponses formId={formId} />
          <div className="flex justify-end">
            <Button
              className="bg-emerald-500 border border-black/20 flex items-center justify-center gap-2"
              onClick={generateSheet}
            >
              {!generatingSheet ? (
                <Fragment>
                  <SiGooglesheets className="w-5 h-5" /> GERAR PLANILHA
                </Fragment>
              ) : (
                <Fragment>
                  <RxReload className="w-5 h-5 animate-spin" /> GERANDO...
                </Fragment>
              )}
            </Button>
          </div>
        </CardContent>
        {null === true && (
          <>
            <hr className="w-full" />
            <CardFooter className="p-6 py-3">
              <div className="w-full min-h-10 flex gap-2 items-center">
                <div className="w-1/2 flex justify-start items-center">
                  <p className="font-semibold">
                    Página{' '}
                    {dataInner ? (dataInner.totalPages > 0 ? page + 1 : 0) : 0}{' '}
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
            </CardFooter>
          </>
        )}
      </Card>
      <Card className="w-full h-fit">
        <CardContent className="w-full h-fit p-6 flex flex-col gap-2">
          {dataInner && (
            <Fragment>
              {dataInner.map((formStatsData: FormStatsData, index: number) => {
                const occurencesToKey = Object.keys(formStatsData.ocorrencia)

                return (
                  <>
                    {index > 0 && <hr className="w-full mt-3 mb-1" />}
                    <Label className="text-md font-semibold">
                      {index + 1} - {formStatsData.pergunta.descricao}
                    </Label>
                    <Card className="w-full h-fit bg-black/5">
                      <CardContent className="w-full h-fit px-0 flex gap-2 flex-col py-2">
                        {occurencesToKey.length > 0 ? (
                          <Fragment>
                            {formStatsData.pergunta.tipoResposta ===
                              'BOOLEANO' && (
                              <div className="w-full h-fit max-h-[20rem] flex items-center justify-center">
                                <Pie
                                  data={{
                                    labels: ['Sim', 'Não'],
                                    datasets: [
                                      {
                                        label: 'Ocorrência',
                                        data: [
                                          formStatsData.ocorrencia.sim,
                                          formStatsData.ocorrencia['não'],
                                        ],
                                        backgroundColor: [
                                          'rgba(54, 162, 235, 0.2)',
                                          'rgba(255, 99, 132, 0.2)',
                                          'rgba(255, 206, 86, 0.2)',
                                          'rgba(75, 192, 192, 0.2)',
                                          'rgba(153, 102, 255, 0.2)',
                                          'rgba(255, 159, 64, 0.2)',
                                        ],
                                        borderColor: [
                                          'rgba(54, 162, 235, 1)',
                                          'rgba(255, 99, 132, 1)',
                                          'rgba(255, 206, 86, 1)',
                                          'rgba(75, 192, 192, 1)',
                                          'rgba(153, 102, 255, 1)',
                                          'rgba(255, 159, 64, 1)',
                                        ],
                                        borderWidth: 1,
                                      },
                                    ],
                                  }}
                                />
                              </div>
                            )}
                            {formStatsData.pergunta.tipoResposta !==
                              'BOOLEANO' && (
                              <Fragment>
                                {occurencesToKey.map((key) => {
                                  return (
                                    <div
                                      onClick={() => {
                                        router.push(
                                          `/dashboard/${formStatsData.pergunta.id}`,
                                        )
                                      }}
                                      className="cursor-pointer w-full min-h-5 bg-black/5 p-6 py-2"
                                    >
                                      {key} -{' '}
                                      <span className="font-semibold">
                                        {formStatsData.ocorrencia[key]}{' '}
                                        OCORRÊNCIAS
                                      </span>
                                    </div>
                                  )
                                })}
                              </Fragment>
                            )}
                          </Fragment>
                        ) : (
                          <p className="pl-3">Não há respostas</p>
                        )}
                      </CardContent>
                    </Card>
                  </>
                )
              })}
            </Fragment>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
