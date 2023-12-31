import { Form } from '@/app/components/Form';
import { Button } from '@/app/components/Shadcn/button';
import { Checkbox } from '@/app/components/Shadcn/checkbox';
import { Input } from '@/app/components/Shadcn/input';
import { Label } from '@/app/components/Shadcn/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/Shadcn/tooltip';
import { Fragment, SyntheticEvent, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormQuestion } from '../../criar/page';
import { FaPercentage } from 'react-icons/fa';

interface FormQuestionProps {
  formData: FormQuestion;
  errors: any;
  register: UseFormRegister<any>;
  getValues: any;
  setValue: any;
  hasError: string | undefined;
}

//          {...register(`respostas.${formData.id.toString()}.resposta`, registerData)}
export default function FormResponse({
  formData,
  errors,
  register,
  getValues,
  setValue,
  hasError,
}: FormQuestionProps) {
  const registerData = {
    required: !formData.opcional ? 'O campo é obrigatório' : false,
  };

  const [boolean, setBoolean] = useState<boolean | undefined>();

  return (
    <>
      {
        <Fragment>
          {formData.tipoResposta == 'TEXTO' && (
            <Input
              className="shadow"
              type="text"
              placeholder="Entre com a resposta..."
              aria-invalid={errors[formData.id.toString()] ? 'true' : 'false'}
              error={errors[formData.id.toString()]}
              required={!formData.opcional}
              onChange={(e: any) => {
                console.log(e.target.value.length);
                if (e.target.value.length < 5) {
                  hasError = 'O tamanho mínimo é 5.';
                }
                if (e.target.value.length > 255) {
                  hasError = 'O tamanho máximo é 255.';
                }
                setValue(`respostas.${formData.id}.idpergunta`, formData.id);
                setValue(`respostas.${formData.id}.resposta`, e.target.value);
                if (
                  (e.target.value === '' || e.target.value === null) &&
                  !formData.opcional
                ) {
                  if (!errors.includes('O campo é obrigatório')) {
                    errors.push('O campo é obrigatório');
                  }
                }
              }}
            />
          )}
          {formData.tipoResposta == 'INTEIRO' && (
            <Input
              className="shadow"
              type="number"
              placeholder="Entre com a resposta..."
              aria-invalid={errors[formData.id.toString()] ? 'true' : 'false'}
              error={errors[formData.id.toString()]}
              required={!formData.opcional}
              onChange={(e: any) => {
                console.log(e.target.value.length);
                if (e.target.value.length < 5) {
                  hasError = 'O tamanho mínimo é 5.';
                }
                if (e.target.value.length > 255) {
                  hasError = 'O tamanho máximo é 255.';
                }
                setValue(`respostas.${formData.id}.idpergunta`, formData.id);
                setValue(`respostas.${formData.id}.resposta`, e.target.value);
                if (
                  (e.target.value === '' || e.target.value === null) &&
                  !formData.opcional
                ) {
                  if (!errors.includes('O campo é obrigatório')) {
                    errors.push('O campo é obrigatório');
                  }
                }
              }}
            />
          )}
          {formData.tipoResposta == 'DECIMAL' && (
            <Input
              className="shadow"
              type="number"
              placeholder="Entre com a resposta..."
              aria-invalid={errors[formData.id.toString()] ? 'true' : 'false'}
              error={errors[formData.id.toString()]}
              required={!formData.opcional}
              step=".01"
              onChange={(e: any) => {
                console.log(e.target.value.length);
                if (e.target.value.length < 5) {
                  hasError = 'O tamanho mínimo é 5.';
                }
                if (e.target.value.length > 255) {
                  hasError = 'O tamanho máximo é 255.';
                }
                setValue(`respostas.${formData.id}.idpergunta`, formData.id);
                setValue(`respostas.${formData.id}.resposta`, e.target.value);
                if (
                  (e.target.value === '' || e.target.value === null) &&
                  !formData.opcional
                ) {
                  if (!errors.includes('O campo é obrigatório')) {
                    errors.push('O campo é obrigatório');
                  }
                }
              }}
            />
          )}
          {formData.tipoResposta == 'BOOLEANO' && (
            <>
              <div className="flex gap-2 flex-col gap-2">
                <hr />
                <Label className="flex justify-start items-center gap-2">
                  <Checkbox
                    className="shadow-sm"
                    checked={boolean === true}
                    onCheckedChange={(checked: boolean) => {
                      setBoolean(true);
                      setValue(
                        `respostas.${formData.id}.idpergunta`,
                        formData.id,
                      );
                      setValue(`respostas.${formData.id}.resposta`, 'Sim');
                    }}
                  />
                  <p>Sim</p>
                </Label>
                <Label className="flex justify-start items-center gap-2">
                  <Checkbox
                    className="shadow-sm"
                    checked={boolean === false}
                    onCheckedChange={(checked: boolean) => {
                      setBoolean(false);
                      setValue(
                        `respostas.${formData.id}.idpergunta`,
                        formData.id,
                      );
                      setValue(`respostas.${formData.id}.resposta`, 'Não');
                    }}
                  />
                  <p>Não</p>
                </Label>
              </div>
            </>
          )}
          {formData.tipoResposta == 'PORCENTAGEM' && (
            <div className="w-full h-fit gap-1 grid grid-cols-[2.5rem,1fr]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger type="button">
                    {' '}
                    <Button
                      type="button"
                      variant={'outline'}
                      className="h-full w-10 aspect-square px-2 border border-black/50 rounded-md flex items-center justify-center shadow font-bold"
                    >
                      <FaPercentage className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>A resposta deve ser em Porcentagem</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                className="shadow"
                type="number"
                placeholder="Porcentagem"
                aria-invalid={errors[formData.id.toString()] ? 'true' : 'false'}
                error={errors[formData.id.toString()]}
                required={!formData.opcional}
                onChange={(e: any) => {
                  console.log(e.target.value.length);
                  if (e.target.value.length < 5) {
                    hasError = 'O tamanho mínimo é 5.';
                  }
                  if (e.target.value.length > 255) {
                    hasError = 'O tamanho máximo é 255.';
                  }
                  setValue(`respostas.${formData.id}.idpergunta`, formData.id);
                  setValue(`respostas.${formData.id}.resposta`, e.target.value);
                  if (
                    (e.target.value === '' || e.target.value === null) &&
                    !formData.opcional
                  ) {
                    if (!errors.includes('O campo é obrigatório')) {
                      errors.push('O campo é obrigatório');
                    }
                  }
                }}
              />
            </div>
          )}
          {formData.tipoResposta == 'LITRO' && (
            <div className="w-full h-fit gap-1 grid grid-cols-[2.5rem,1fr]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger type="button">
                    {' '}
                    <Button
                      type="button"
                      variant={'outline'}
                      className="h-full w-10 aspect-square px-2 border border-black/50 rounded-md flex items-center justify-center shadow font-bold"
                    >
                      L
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>A resposta deve ser em Litro</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                className="shadow"
                type="number"
                placeholder="Litro"
                aria-invalid={errors[formData.id.toString()] ? 'true' : 'false'}
                error={errors[formData.id.toString()]}
                required={!formData.opcional}
                onChange={(e: any) => {
                  console.log(e.target.value.length);
                  if (e.target.value.length < 5) {
                    hasError = 'O tamanho mínimo é 5.';
                  }
                  if (e.target.value.length > 255) {
                    hasError = 'O tamanho máximo é 255.';
                  }
                  setValue(`respostas.${formData.id}.idpergunta`, formData.id);
                  setValue(`respostas.${formData.id}.resposta`, e.target.value);
                  if (
                    (e.target.value === '' || e.target.value === null) &&
                    !formData.opcional
                  ) {
                    if (!errors.includes('O campo é obrigatório')) {
                      errors.push('O campo é obrigatório');
                    }
                  }
                }}
              />
            </div>
          )}
          {formData.tipoResposta == 'QUILOGRAMA' && (
            <div className="w-full h-fit gap-1 grid grid-cols-[2.5rem,1fr]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger type="button">
                    {' '}
                    <Button
                      type="button"
                      variant={'outline'}
                      className="h-full w-10 aspect-square px-2 border border-black/50 rounded-md flex items-center justify-center shadow font-bold"
                    >
                      KG
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>A resposta deve ser em Quilograma</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                className="shadow"
                type="number"
                placeholder="Massa em Quilograma"
                aria-invalid={errors[formData.id.toString()] ? 'true' : 'false'}
                error={errors[formData.id.toString()]}
                required={!formData.opcional}
                onChange={(e: any) => {
                  console.log(e.target.value.length);
                  if (e.target.value.length < 5) {
                    hasError = 'O tamanho mínimo é 5.';
                  }
                  if (e.target.value.length > 255) {
                    hasError = 'O tamanho máximo é 255.';
                  }
                  setValue(`respostas.${formData.id}.idpergunta`, formData.id);
                  setValue(`respostas.${formData.id}.resposta`, e.target.value);
                  if (
                    (e.target.value === '' || e.target.value === null) &&
                    !formData.opcional
                  ) {
                    if (!errors.includes('O campo é obrigatório')) {
                      errors.push('O campo é obrigatório');
                    }
                  }
                }}
              />
            </div>
          )}
          {formData.tipoResposta == 'CELSIUS' && (
            <div className="w-full h-fit gap-1 grid grid-cols-[2.5rem,1fr]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger type="button">
                    {' '}
                    <Button
                      type="button"
                      variant={'outline'}
                      className="h-full w-10 aspect-square px-2 border border-black/50 rounded-md flex items-center justify-center shadow font-bold"
                    >
                      °C
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>A resposta deve ser em graus Celsius</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                className="shadow"
                type="number"
                placeholder="Temperatura em Graus Celsius"
                aria-invalid={errors[formData.id.toString()] ? 'true' : 'false'}
                error={errors[formData.id.toString()]}
                required={!formData.opcional}
                onChange={(e: any) => {
                  console.log(e.target.value.length);
                  if (e.target.value.length < 5) {
                    hasError = 'O tamanho mínimo é 5.';
                  }
                  if (e.target.value.length > 255) {
                    hasError = 'O tamanho máximo é 255.';
                  }
                  setValue(`respostas.${formData.id}.idpergunta`, formData.id);
                  setValue(`respostas.${formData.id}.resposta`, e.target.value);
                  if (
                    (e.target.value === '' || e.target.value === null) &&
                    !formData.opcional
                  ) {
                    if (!errors.includes('O campo é obrigatório')) {
                      errors.push('O campo é obrigatório');
                    }
                  }
                }}
              />
            </div>
          )}
          {hasError}
          <Form.Error message={hasError} />
        </Fragment>
      }
    </>
  );
}
