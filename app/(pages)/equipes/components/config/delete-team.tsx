import { Form } from "@/app/components/Form";
import { Button } from "@/app/components/Shadcn/button";
import { useFetch } from "@/app/hooks/useFetch";
import { RxTrash } from "react-icons/rx";

import { ConfigProps } from "./config";

export default function DeleteTeam({ nomeEquipe, idEquipe }: ConfigProps) {

  const { handleDelete } = useFetch({
    url: `equipe/exluir?equipeid=${idEquipe}`,
  })

  const onSubmit = () => {
    handleDelete(idEquipe)
  }

  return <Form.Root>
    <Button type="submit" variant={'outline'} className="bg-red-400 flex gap-1 text-red-900"><RxTrash className="w-4 h-4" /> Deletar Equipe</Button>
  </Form.Root>
}
