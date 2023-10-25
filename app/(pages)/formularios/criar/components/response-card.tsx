'use client'

import { Button } from "@/app/components/Shadcn/button";
import { Card, CardContent, CardFooter } from "@/app/components/Shadcn/card";
import { Input } from "@/app/components/Shadcn/input";
import { Label } from "@/app/components/Shadcn/label";
import { Switch } from "@/app/components/Shadcn/switch";
import { UseFormSetValue } from "react-hook-form";
import { RxCardStackPlus, RxPlus, RxTrash } from 'react-icons/rx';
import { FormCreationData, FormType } from '../page';
import { ResponseType } from "./response-type";

interface ResponseCardProps {
  questions: FormType[]
  setValue: UseFormSetValue<FormCreationData>
  getValues: any
  index: number
  callback: () => any
}

export default function ReponseCard({ index, questions, callback, setValue, getValues }: ResponseCardProps) {

  const duplicateCard = () => {

  }

  const deleteCard = () => {
    let campos = getValues('campos')
    console.log(campos)
  }

  const changeObligatory = (checked: boolean) => {
    console.log(checked)
  }

  return <>
    <div className="flex items-center space-y-2 flex-col w-full">
      <Card className="animate-fade animate-once animate-duration-500 animate-ease-in-out w-full h-fit flex items-center justify-center flex-col shadow pb-0 px-1">
        <div className="w-full block h-fit">
          <CardContent className="w-full p-3 pb-4">
            <Label className="mb-7">Pergunta</Label>
            <Input
              placeholder="Qual a temperatura do gerador?"
              className="border-black/20"
              onChange={(e: any) => {
                let campos = getValues('campos')
                console.log(campos)
                campos[0].perguntas[index].descricao = e.target.value
                setValue("campos", campos)
              }}
            ></Input>
          </CardContent>
          <hr />
          <CardContent className="w-full gap-6 p-3 pb-4 flex">
            <div className="w-full">
              <Label>Tipo da Resposta</Label>
              <ResponseType getValues={getValues} setValue={setValue}/>
            </div>
          </CardContent>
          <hr />
          <CardFooter className="p-3 flex justify-around gap-2">
            <div className="w-1/2 h-full">
              <div className="flex gap-2 items-center">
                <Label>Obrigatório</Label>
                <Switch onCheckedChange={changeObligatory}/>
              </div>
            </div>
            <div className="w-1/2 h-full flex justify-end gap-2">
              <Button type="button" className="transition-all w-10 h-10 px-2 bg-red-700 outline outline-2 outline-red/50 outline-offset-2 shadow-sm hover:outline-dotted" onClick={deleteCard}>
                <RxTrash className="w-10 h-10" />
              </Button>
              <Button type="button" className="transition-all w-10 h-10 px-2 bg-lime-700 outline outline-2 outline-lime/50 outline-offset-2 shadow-sm hover:outline-dotted" onClick={duplicateCard}>
                <RxCardStackPlus className="w-10 h-10" />
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
      {
        index == questions.length - 1 && (
          <CardFooter>
            <Button type="button" className="transition-all flex items-center justify-center w-12 h-12 px-3 py-3 outline outline-offset-2 outline-black/0 outline-1 hover:outline-black/100 outline-dashed" onClick={callback}>
              <RxPlus className="w-16 h-16" />
            </Button>
          </CardFooter>
        )
      }

    </div>
  </>
}
