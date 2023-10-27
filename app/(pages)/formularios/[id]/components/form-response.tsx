import { Form } from "@/app/components/Form";
import { Input } from "@/app/components/Shadcn/input";
import { Fragment, SyntheticEvent } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormQuestion } from "../../criar/page";

interface FormQuestionProps {
  formData: FormQuestion
  errors: any
  register: UseFormRegister<any>
  getValues: any
  setValue: any
}

//          {...register(`respostas.${formData.id.toString()}.resposta`, registerData)}
export default function FormResponse({ formData, errors, register, getValues, setValue }: FormQuestionProps) {

  const registerData = {
    required: !formData.opcional ? 'O campo é obrigatório' : false,
  }

  return <>
    {
      <Fragment>
        <Input
          className="shadow"

          type="text"
          placeholder="Entre com a resposta..."

          aria-invalid={errors[formData.id.toString()] ? 'true' : 'false'}
          error={errors[formData.id.toString()]}

          required

          onChange={(e: any) => {
            setValue(`respostas.${formData.id}.resposta`, e.target.value)
            if ((e.target.value === '' || e.target.value === null) && !formData.opcional) {
              if (!errors.includes('O campo é obrigatório')) {
                errors.push('O campo é obrigatório')
              }
            }
          }}

        />
        <Form.Error message={errors[formData.id.toString()]?.message} />
      </Fragment>
    }
  </>
}
