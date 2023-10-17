import { Form } from "@/app/components/Form";
import { Button } from "@/app/components/Shadcn/button";
import { Input } from "@/app/components/Shadcn/input";

import { useFetch } from "@/app/hooks/useFetch";
import { ToastWrapper } from "@/app/utils/ToastWrapper";
import { useRouter } from "next/navigation";
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";

import { RxTrash } from "react-icons/rx";

import { ConfigProps } from "./config";

export default function DeleteTeam({ nomeEquipe, idEquipe }: ConfigProps) {

  const { handleDelete } = useFetch({
    url: `equipe/excluir?equipeid=${idEquipe}`,
    isGet: false,
  })

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nome: '',
    },
  })

  const router = useRouter()

  const onSubmit = async () => {
    const response = await handleDelete(idEquipe)
    switch((response as any).status) {
      case 201:
        ToastWrapper.success("Equipe deletada com sucesso!")
      case 403:
        ToastWrapper.warn("Você não tem permissão para excluir essa equipe.")
      default:
        break
    }
    router.push('/equipes')
  }

  return <Form.Root onSubmit={handleSubmit(onSubmit)}>
    <Form.Label label="Nome da Equipe" className="mt-0" />
    <Input
    placeholder="Confirme o nome da Equipe"
    autoComplete="nome"
    htmlFor="nome"
    id="nome"
    error={errors.nome}
    aria-invalid={errors.nome ? 'true' : 'false'}
    className="shadow"
    onInvalid={(e: SyntheticEvent) => {
      e.preventDefault()
    }}
    {...register('nome', {
      required: 'Confirmar o Nome é obrigatório',

      validate: (val: string) => {
        if (nomeEquipe != val) {
          return 'O nome da equipe está incorreto.';
        }
      }
    })}
    type="text"
    />
    <Form.Error message={errors.nome?.message} />
    <Button type="submit" variant={'outline'} className="bg-red-400 flex gap-1 text-red-900 mt-2 w-full"><RxTrash className="w-4 h-4" /> Deletar Equipe</Button>
  </Form.Root>
}
