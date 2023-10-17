import { Button } from "@/app/components/Shadcn/button";
import { useFetch } from "@/app/hooks/useFetch";
import { ToastWrapper } from "@/app/utils/ToastWrapper";
import { RxTrash } from "react-icons/rx";

interface DeleteButtonProps {
  usuario: string
}

export default function DeleteButton({ usuario }: DeleteButtonProps) {

  const { handleDelete } = useFetch({
    url: '/usuario/deletar',
    isGet: false
  })

  const removeUser = async (usuario: string) => {
    const res = await handleDelete(usuario)
    switch((res as any).status) {
      case 200:
        ToastWrapper.success("Usuário removido da equipe com sucesso.")
      default:
        break
    }
  }

  return <Button variant={'outline'} className="w-12 h-12 aspect-square px-2 py-1 bg-red-600 hover:bg-red-800" onClick={() => removeUser(usuario)}>
    <RxTrash className="w-6 h-6 my-auto text-white" />
  </Button>
}
