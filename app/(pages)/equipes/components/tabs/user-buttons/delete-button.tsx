import { Button } from "@/app/components/Shadcn/button";
import { useFetch } from "@/app/hooks/useFetch";
import { ToastWrapper } from "@/app/utils/ToastWrapper";
import { RxTrash } from "react-icons/rx";
import { REMOVER_USUARIO_DA_EQUIPE_POR_USUARIO } from '@/app/utils/EndpointStorage';
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  usuario: string
  equipeId: number
  refetch: any
}

export default function DeleteButton({ usuario, equipeId, refetch }: DeleteButtonProps) {

  const router = useRouter()

  const { handleDelete } = useFetch({
    url: REMOVER_USUARIO_DA_EQUIPE_POR_USUARIO,
    isGet: false,
    header: {
      Equipe: equipeId,
      Usuario: usuario
    }
  })

  const removeUser = async () => {
    const res: any = await handleDelete(usuario)
    if (!res) {
      return
    }
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
    refetch()
  }

  return <Button variant={'outline'} className="w-12 h-12 aspect-square px-2 py-1 bg-red-600 hover:bg-red-800" onClick={removeUser}>
    <RxTrash className="w-6 h-6 my-auto text-white" />
  </Button>
}
