import { Button } from "@/app/components/Shadcn/button";
import { useFetch } from "@/app/hooks/useFetch";
import { ToastWrapper } from "@/app/utils/ToastWrapper";
import { RxTrash } from "react-icons/rx";
import { REMOVER_USUARIO_DA_EQUIPE_POR_USUARIO } from '@/app/utils/EndpointStorage';

interface DeleteButtonProps {
  usuario: string,
  equipeId: number
}

export default function DeleteButton({ usuario, equipeId }: DeleteButtonProps) {

  const { handleDelete } = useFetch({
    url: REMOVER_USUARIO_DA_EQUIPE_POR_USUARIO,
    isGet: false,
    header: {
      Equipe: equipeId,
      Usuario: usuario
    }
  })

  const removeUser = async (usuario: string) => {
    const res = await handleDelete(usuario)
    console.log(res)
    switch((res as any).status) {
      case 200:
        ToastWrapper.success("Usuário removido da equipe com sucesso.")
        break
      case 404:
        ToastWrapper.error("O usuário insirido não existe.")
        break
      default:
        ToastWrapper.error("Não foi possível deletar esse usuário.")
        break
    }
  }

  return <Button variant={'outline'} className="w-12 h-12 aspect-square px-2 py-1 bg-red-600 hover:bg-red-800" onClick={() => removeUser(usuario)}>
    <RxTrash className="w-6 h-6 my-auto text-white" />
  </Button>
}
