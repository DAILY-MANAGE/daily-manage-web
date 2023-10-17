import { Button } from "@/app/components/Shadcn/button";
import { useFetch } from "@/app/hooks/useFetch";
import { ToastWrapper } from "@/app/utils/ToastWrapper";
import { RxPencil1 } from 'react-icons/rx';

interface EditButtonProps {
  usuario: string
}

export default function EditButton({ usuario }: EditButtonProps) {

  const { handlePatch } = useFetch({
    url: '/usuario/deletar',
    isGet: false
  })

  const editUser = async (usuario: string) => {
    const res = await handlePatch({
      id: 1,
      patchData: {
        usuario: usuario
      }
    })
    switch((res as any).status) {
      case 200:
        ToastWrapper.success("Usuário editado com sucesso.")
      default:
        break
    }
  }

  return <Button variant={'outline'} className="w-12 h-12 aspect-square px-2 py-1 bg-orange-600 hover:bg-orange-800" onClick={() => editUser(usuario)}>
    <RxPencil1 className="w-6 h-6 my-auto text-white" />
  </Button>
}
