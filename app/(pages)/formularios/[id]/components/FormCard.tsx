import { Form } from "@/app/components/Form"
import { Card, CardContent } from "@/app/components/Shadcn/card"
import { Checkbox } from "@/app/components/Shadcn/checkbox"
import { Input } from "@/app/components/Shadcn/input"
import { Label } from "@/app/components/Shadcn/label"
import { SyntheticEvent } from "react"
import { UseFormRegister } from "react-hook-form"
import { FormResponseType } from "./FormProvider"

interface FormCardProps {
  data: FormResponseType
  errors: any,
  register: UseFormRegister<FormResponseType>
}

export default function FormCard({ data, errors, register }: FormCardProps) {
  return <Card
    className="shadow w-full h-fit hover:bg-zinc-50 transition-colors cursor-pointer group animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards"
  >
    <CardContent className="mt-3">
      <Label>{data.descricao}</Label>
      {
        data.unidade === 'BOOLEAN' && (
          <>
            <div className="flex flex-row w-full h-4 mt-3">
              <div className="w-1/2 h-full flex justify-start items-center gap-2">
                <Checkbox
                  className="border border-black/50 m-0 rounded my-auto shadow"
                />
                <span className="text-sm my-auto h-full leading-[1.1rem]">
                  NÃO
                </span>
                <Checkbox
                  className="border border-black/50 m-0 rounded my-auto shadow"
                />
                <span className="text-sm my-auto h-full leading-[1.1rem]">
                  SIM
                </span>
              </div>
            </div>
          </>
        )
      }
      {
        data.unidade === 'STRING' && (
          <Input
            placeholder="Entre com a resposta..."
            className="shadow border-black/20"

            autoComplete="nome"
            htmlFor="nome"
            error={errors[data.descricao]}
            aria-invalid={errors[data.descricao] ? 'true' : 'false'}
            onInvalid={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            type="text"
            id="bine"
          ></Input>
        )
      }
      <Form.Error message={errors[data.descricao]?.message} />
    </CardContent>
  </Card>
}
