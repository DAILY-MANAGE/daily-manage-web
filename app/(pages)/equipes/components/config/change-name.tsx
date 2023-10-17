import { Form } from "@/app/components/Form"
import { Button } from "@/app/components/Shadcn/button"
import { Input } from "@/app/components/Shadcn/input"
import { useFetch } from "@/app/hooks/useFetch"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { RxPencil1 } from "react-icons/rx"
import { VscSave } from "react-icons/vsc"
import { ConfigProps } from "./config"

export default function ChangeName({ nomeEquipe, idEquipe }: ConfigProps) {

  const { handlePatch } = useFetch({
    url: `equipe/editar?equipeid=${idEquipe}`,
    isGet: false
  })

  const nameValues = {
    nome: nomeEquipe
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: nameValues,
  })

  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)

  const handleRefresh = () => {
    router.refresh()
  }

  const handleEdit = () => {
    if (errors.nome?.message) return
    setIsEditing((state) => !state)
  }

  const onSubmit = async (nameData: typeof nameValues) => {
    console.log('submit')
    const res = await handlePatch({
      id: idEquipe,
      patchData: nameData
    })
    console.log(res)
    switch((res as any).status) {
      case 200:
        handleRefresh()
      default:
        break
    }
  }

  return <Form.Root onSubmit={handleSubmit(onSubmit)}>
    <Form.Label label="Nome Equipe" className="mt-0"/>
    <div className="grid grid-cols-[1fr_6rem] gap-2">
      <Input
        autoComplete="nomeEquipe"
        htmlFor="nomeEquipe"
        type="text"
        id="nomeEquipe"
        error={errors.nome}
        placeholder="Entre com o novo nome"
        aria-invalid={errors.nome ? 'true' : 'false'}
        data-invalid={errors.nome}
        onInvalid={(e: SyntheticEvent) => {
          e.preventDefault()
        }}
        {...register('nome', {
          required: 'Nome da Equipe é obrigatório',
          maxLength: {
            value: 30,
            message: 'Número máximo de caractéres é 30',
          },
          minLength: {
            value: 5,
            message: 'Número mínimo de caractéres é 5',
          },
        })}
        disabled={!isEditing}
      />
      <Button className="flex gap-2" type={isEditing ? 'button' : 'submit'} onClick={handleEdit}>
        {isEditing ? <>
          Salvar
          <VscSave className="h-4 w-4"/>
        </> : <>
          Editar
          <RxPencil1 className="h-4 w-4"/>
        </>}
      </Button>
    </div>
    <Form.Error message={errors.nome?.message} />
  </Form.Root>

}
