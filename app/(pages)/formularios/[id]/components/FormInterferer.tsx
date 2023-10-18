'use client'

import FormCard from "./FormCard"
import { FormResponseType } from "./FormProvider"
import { UseFormRegister } from 'react-hook-form';
import { Fragment } from "react";
import { Button } from "@/app/components/Shadcn/button";

interface FormInterefererProps {
  data: any,
  errors: any,
  register: UseFormRegister<FormResponseType>
}

export default function FormInterferer({data, errors, register}: FormInterefererProps) {
 return <>
  {
          (data && data.data && data.data.campos) && (
            data.data.campos.map((fieldData: any, index: number) => {
              return <FormCard key={index} data={fieldData.perguntas[0]} errors={errors} register={register} />
            })
          )
        }
      <div className="w-full flex flex-start">
        <Button type="submit">Enviar Formulário</Button>
      </div>
 </>
}
