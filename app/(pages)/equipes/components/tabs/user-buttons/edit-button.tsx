import { Button } from '@/app/components/Shadcn/button'
import { useFetch } from '@/app/hooks/useFetch'
import { EDITAR_PERMISSOES_DE_UM_USUARIO_POR_USUARIO } from '@/app/utils/EndpointStorage'
import { ToastWrapper } from '@/app/utils/ToastWrapper'

import { RxPencil1 } from 'react-icons/rx'
import { EditUserPermissionsModal } from '../../modal/edit-permissions/edit-user-permissions-modal'

interface EditButtonProps {
  usuario: string
  equipeId: number
  refetch: any
}

export default function EditButton({
  usuario,
  equipeId,
  refetch,
}: EditButtonProps) {
  return (
    <EditUserPermissionsModal
      equipeid={equipeId.toString()}
      usuario={usuario}
      refetch={refetch}
    >
      <Button
        type="button"
        variant={'outline'}
        className="w-12 h-12 aspect-square px-2 py-1 bg-orange-600 hover:bg-orange-800"
      >
        <RxPencil1 className="w-6 h-6 my-auto text-white" />
      </Button>
    </EditUserPermissionsModal>
  )
}
