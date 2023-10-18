'use client'

import { Button } from "@/app/components/Shadcn/button";
import { Card, CardContent, CardFooter } from "@/app/components/Shadcn/card";
import { Input } from "@/app/components/Shadcn/input";
import { Label } from "@/app/components/Shadcn/label";
import { UseFormSetValue } from "react-hook-form";
import { RxPlus } from "react-icons/rx";
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

  return <>
    <div className="flex items-center space-y-2 flex-col w-full">
      <Card className="w-full h-fit flex items-center justify-center flex-col shadow pb-1 px-1">
        <div className="w-full block h-fit">
          <CardContent className="w-full p-3">
            <Label>Pergunta</Label>
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
          <CardContent className="w-full p-3">
            <Label>Tipo da Resposta</Label>
            <ResponseType index={index} index2={0} getValues={getValues} setValue={setValue}/>
          </CardContent>
        </div>
      </Card>
      {
        index == questions.length - 1 && (
          <CardFooter>
            <Button className="flex items-center justify-center" onClick={callback}>
              <RxPlus className="w-4 h-4" />
            </Button>
          </CardFooter>
        )
      }

    </div>
  </>
}
