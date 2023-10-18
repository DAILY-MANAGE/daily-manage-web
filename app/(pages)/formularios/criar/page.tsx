'use client'

import { Card, CardContent, CardFooter } from '@/app/components/Shadcn/card'
import { Input } from '@/app/components/Shadcn/input'
import { Label } from '@/app/components/Shadcn/label'

import { PermittedUsers } from './components/permitted-users'

import ResponseCard from './components/response-card'
import { useEffect, useState } from 'react'
import CreateButton from './components/create-button'

export interface FormType {
  idPergunta: number
  pergunta: string
  tipoResposta: string
}

export const defaultFormData: FormType = {
  idPergunta: 1,
  pergunta: "",
  tipoResposta: "string"
}

const defaultQuestions = [
  defaultFormData
]

export default function Criar() {

  const [questions, setQuestions] = useState<any[]>(defaultQuestions)

  useEffect(() => {

  })

  const callback = () => {
      setQuestions((state: FormType[]) => {
          let id = questions.length > 0 ? questions[questions.length - 1].idPergunta + 1 : 1
          let auxFormData = {
            ...defaultFormData
          }
          auxFormData.idPergunta = id
          console.log(auxFormData)
          return [...state, auxFormData]
        })
  }

  return (
    <div className="flex-col flex w-full">
      <CreateButton />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between flex-col md:flex-row bg-titleHeader bg-cover bg-bottom bg-no-repeat px-4 py-3 rounded overflow-hidden">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Informações
          </h2>
        </div>
        <div className="flex items-center space-y-2 flex-col w-full">
          <Card className="w-full h-fit flex items-center justify-center flex-col shadow pb-1 px-1">
            <div className="w-full block h-fit">
              <CardContent className="w-full p-3">
                <Label>Nome do Formulário</Label>
                <Input
                  placeholder="Entre com o nome do formulário"
                  className="border-black/20"
                ></Input>
              </CardContent>
              <CardContent className="w-full p-3 flex flex-col">
                <Label>Pessoas Permitidas</Label>
                <div className='py-1'>
                  <PermittedUsers />
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row bg-titleHeader bg-cover bg-bottom bg-no-repeat px-4 py-3 rounded overflow-hidden">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Campos
          </h2>
        </div>
        {
          questions.map((data: FormType, index: number) => <ResponseCard index={index} questions={questions} callback={callback}/>)
        }
      </div>
    </div>
  )
}
