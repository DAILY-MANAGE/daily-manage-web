import { Button } from '@/app/components/Shadcn/button';
import { useFetch } from '@/app/hooks/useFetch';
import { EDITAR_PERMISSOES_DE_UM_USUARIO_POR_USUARIO } from '@/app/utils/EndpointStorage';
import { ToastWrapper } from '@/app/utils/ToastWrapper';
import { useRouter } from 'next/navigation';

import { RxPencil1, RxReader } from 'react-icons/rx';
import { EditUserPermissionsModal } from '../../modal/edit-permissions/edit-user-permissions-modal';

interface LogsButtonProps {
  usuario: string;
  equipeId: number;
}

export default function LogsButton({ usuario, equipeId }: LogsButtonProps) {
  const router = useRouter();

  const { handlePatch } = useFetch({
    url: EDITAR_PERMISSOES_DE_UM_USUARIO_POR_USUARIO,
    isGet: false,
    header: {
      Equipe: equipeId,
      Usuario: usuario,
    },
  });

  const editUser = async (usuario: string) => {
    const res = await handlePatch({
      id: 1,
      patchData: {
        usuario: usuario,
      },
    });
    switch ((res as any).status) {
      case 200:
        ToastWrapper.success('Usuário editado com sucesso.');
      default:
        break;
    }
  };

  return (
    <Button
      onClick={() => router.push(`/registros/${equipeId}/${usuario}`)}
      variant={'outline'}
      type="button"
      className="w-12 h-12 aspect-square px-2 py-1 bg-gray-600 hover:bg-gray-800"
    >
      <RxReader className="w-6 h-6 my-auto text-white" />
    </Button>
  );
}
