'use client';

import { Form } from '@/app/components/Form';
import { Button } from '@/app/components/Shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/Shadcn/dialog';
import { getClientCookie, useFetch } from '@/app/hooks/useFetch';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastWrapper } from '@/app/utils/ToastWrapper';
import { cookieKeyOriginal } from '@/app/hooks/useAuth';
import {
  ADICONAR_USUARIO_A_EQUIPE,
  CRIAR_EQUIPE,
} from '@/app/utils/EndpointStorage';
import { AddUsers } from '../add-users';
import { Card, CardContent } from '@/app/components/Shadcn/card';
import { MultiPermissionSelector } from './multi-permission-selector';

interface CreateTeamModalProps {
  equipeid: string;
  children: ReactNode;
}

interface TeamProps {
  permissoes: string[];
}

const teamValues: TeamProps = {
  permissoes: [],
};

export function AddMemberModal({ equipeid, children }: CreateTeamModalProps) {
  const { handleSubmit, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues: teamValues,
  });

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<number | undefined>();

  const router = useRouter();

  const { handlePost } = useFetch({
    url: ADICONAR_USUARIO_A_EQUIPE.replace('{usuarioId}', userId as any),
    isGet: false,
    header: {
      Equipe: equipeid,
    },
  });

  const onSubmit = async (teamData: TeamProps) => {
    router.refresh();
    setOpen(false);
    const response = await handlePost(teamData);
    console.log(response);
    switch ((response as any).status) {
      case 200:
        ToastWrapper.success('O membro foi convidado com sucesso!');
        console.log(response);
        router.push(
          `/equipes/${equipeid}?t=${getClientCookie(cookieKeyOriginal)}`,
        );
      default:
        //ToastWrapper.error("Não foi possível convidar o membro.")
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Adicionar Membro</DialogTitle>
            <DialogDescription>
              Adicione membros a equipe para editar formulários em conjunto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-1 pt-0">
            <div className="flex flex-start flex-col flex-row mb-1">
              <Form.Label label="Usuário" />
              <AddUsers
                userId={userId}
                setUserId={setUserId}
                equipeid={equipeid}
              />
            </div>
            <hr />
            <div className="flex flex-start flex-col flex-row">
              <Form.Label label="Permissões" className="mt-0" />
              <Card>
                <CardContent className="pt-4 pb-5">
                  <Form.Label label="Nível" className="mt-0 block" />
                  <MultiPermissionSelector
                    setValue={setValue}
                    getValues={getValues}
                    equipeid={equipeid}
                    presets={[
                      { id: 1, nome: 'Administrador', value: 'ADMINISTRADOR' },
                    ]}
                  />
                  <hr className="mt-4 mb-2" />
                  <Form.Label label="Formulário" className="mt-0" />
                  <MultiPermissionSelector
                    setValue={setValue}
                    getValues={getValues}
                    equipeid={equipeid}
                    presets={[
                      {
                        id: 1,
                        nome: 'Visualizar',
                        value: 'VISUALIZAR_FORMULARIO',
                      },
                      { id: 2, nome: 'Criar', value: 'CRIAR_FORMULARIO' },
                      { id: 3, nome: 'Excluir', value: 'EXCLUIR_FORMULARIO' },
                      { id: 4, nome: 'Editar', value: 'EDITAR_FORMULARIO' },
                      {
                        id: 5,
                        nome: 'Responder',
                        value: 'RESPONDER_FORMULARIO',
                      },
                    ]}
                  />
                  <hr className="mt-4 mb-2" />
                  <Form.Label label="Usuários" className="mt-0" />
                  <MultiPermissionSelector
                    setValue={setValue}
                    getValues={getValues}
                    equipeid={equipeid}
                    presets={[
                      { id: 1, nome: 'Editar', value: 'EDITAR_USUARIOS' },
                    ]}
                  />
                  <hr className="mt-4 mb-2" />
                  <Form.Label label="Equipe" className="mt-0" />
                  <MultiPermissionSelector
                    setValue={setValue}
                    getValues={getValues}
                    equipeid={equipeid}
                    presets={[
                      { id: 2, nome: 'Editar', value: 'EDITAR_EQUIPE' },
                      { id: 3, nome: 'Excluir', value: 'EXCLUIR_EQUIPE' },
                    ]}
                  />
                  <hr />
                </CardContent>
              </Card>
            </div>
          </div>
          <DialogFooter className="mt-4 mb-0">
            <Button type="submit">Adicionar Membro</Button>
          </DialogFooter>
        </Form.Root>
      </DialogContent>
    </Dialog>
  );
}
