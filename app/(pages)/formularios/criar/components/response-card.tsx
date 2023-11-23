'use client'

import { Button } from '@/app/components/Shadcn/button'
import { Card, CardContent, CardFooter } from '@/app/components/Shadcn/card'
import { Input } from '@/app/components/Shadcn/input'
import { Label } from '@/app/components/Shadcn/label'
import { Switch } from '@/app/components/Shadcn/switch'
import { Dispatch, SetStateAction } from 'react'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { RxCardStackPlus, RxPlus, RxTrash } from 'react-icons/rx'
import { FormCreationData, FormQuestion } from '../page'
import { ResponseType } from './response-type'

interface ResponseCardProps {
  questions: FormQuestion[]
  setValue: UseFormSetValue<FormCreationData>
  getValues: any
  setQuestions: Dispatch<SetStateAction<FormQuestion[]>>
  index: number
  callback: () => any
}

export default function ReponseCard({
  index,
  questions,
  callback,
  setValue,
  setQuestions,
  getValues,
}: ResponseCardProps) {
  const duplicateCard = () => {
    setQuestions((state: FormQuestion[]) => {
      const clone = {
        ...state[index],
        id: state[state.length - 1].id + 1 || 1,
      }
      const aux = [...state, clone]
      setValue('perguntas', aux as any)
      return aux
    })
  }

  const deleteCard = () => {
    setQuestions((state: FormQuestion[]) => {
      const aux = state.filter(
        (formQuestion: FormQuestion) => formQuestion.id !== state[index].id,
      )
      setValue('perguntas', aux as any)
      return aux
    })
  }

  const changeObligatory = (checked: boolean) => {
    setQuestions((state: FormQuestion[]) => {
      state[index].opcional = !checked
      setValue('perguntas', state as any)
      return state
    })
  }

  return (
    <>
      <div className="flex items-center space-y-2 flex-col w-full">
        <Card className="animate-fade animate-once animate-duration-500 animate-ease-in-out w-full h-fit flex items-center justify-center flex-col shadow pb-0 px-1">
          <div className="w-full block h-fit">
            <CardContent className="w-full p-3 pb-4">
              <Label className="mb-7">Pergunta</Label>
              <Input
                placeholder="Qual a temperatura do gerador?"
                className="border-black/20"
                value={
                  questions[index] &&
                  questions[index].descricao !== 'NÃO PREENCHIDO'
                    ? questions[index].descricao
                    : ''
                }
                onChange={(e: any) => {
                  const perguntas = getValues('perguntas') as FormQuestion[]
                  perguntas[index].descricao = e.target.value
                  setValue('perguntas', perguntas as any)
                  setQuestions(perguntas)
                }}
              ></Input>
            </CardContent>
            <hr />
            <CardContent className="w-full gap-6 p-3 pb-4 flex">
              <div className="w-full">
                <Label>Tipo da Resposta</Label>
                <ResponseType
                  defaultPreset={
                    questions[index] && questions[index].tiporesposta
                  }
                  index={index}
                  getValues={getValues}
                  setValue={setValue}
                  setQuestions={setQuestions}
                />
              </div>
            </CardContent>
            <hr />
            <CardFooter className="p-3 flex justify-around gap-2">
              <div className="w-1/2 h-full">
                <div className="flex gap-2 items-center">
                  <Label>Obrigatório</Label>
                  <Switch
                    defaultChecked={
                      questions[index] && questions[index].opcional
                    }
                    onCheckedChange={changeObligatory}
                  />
                </div>
              </div>
              <div className="w-1/2 h-full flex justify-end gap-2">
                {index !== 0 && (
                  <Button
                    type="button"
                    className="transition-all w-10 h-10 px-2 bg-red-700 outline outline-2 outline-red/50 outline-offset-2 shadow-sm hover:outline-dotted"
                    onClick={deleteCard}
                  >
                    <RxTrash className="w-10 h-10" />
                  </Button>
                )}
                <Button
                  type="button"
                  className="transition-all w-10 h-10 px-2 bg-lime-700 outline outline-2 outline-lime/50 outline-offset-2 shadow-sm hover:outline-dotted"
                  onClick={duplicateCard}
                >
                  <RxCardStackPlus className="w-10 h-10" />
                </Button>
              </div>
            </CardFooter>
          </div>
        </Card>
        {index == questions.length - 1 && (
          <CardFooter>
            <Button
              type="button"
              className="transition-all flex items-center justify-center w-12 h-12 px-3 py-3 outline outline-offset-2 outline-black/0 outline-1 hover:outline-black/100 outline-dashed"
              onClick={callback}
            >
              <RxPlus className="w-16 h-16" />
            </Button>
          </CardFooter>
        )}
      </div>
    </>
  )
}
