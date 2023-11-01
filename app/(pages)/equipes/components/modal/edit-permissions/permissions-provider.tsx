import { Form } from "@/app/components/Form";
import { useFetch } from "@/app/hooks/useFetch";
import { usePermission } from "@/app/hooks/usePermission";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { MultiPermissionSelector } from "../add-member/multi-permission-selector";

interface PermissionsProviderProps {
  setValue: UseFormSetValue<any>
  getValues: UseFormGetValues<any>
  equipeid: string
  usuario: string
}

export default function PermissionsProvider({ setValue, getValues, equipeid, usuario }: PermissionsProviderProps) {
  const { permissions } = usePermission(undefined, parseInt(equipeid), usuario)

  return <div className="grid gap-4 py-1 pt-0 mt-2">
    <div className="flex flex-start flex-col flex-row">
      <Form.Label label="Nível" className="mt-0 block" />
      <MultiPermissionSelector defaultValue={permissions} setValue={setValue} getValues={getValues} equipeid={equipeid} presets={[{ id: 1, nome: 'Administrador', value: "ADMINISTRADOR" }]} />
      <hr className="mt-4 mb-2" />
      <Form.Label label="Formulário" className="mt-0" />
      <MultiPermissionSelector defaultValue={permissions} setValue={setValue} getValues={getValues} equipeid={equipeid} presets={[{ id: 1, nome: 'Visualizar', value: "VISUALIZAR_FORMULARIO" }, { id: 2, nome: 'Criar', value: "CRIAR_FORMULARIO" }, { id: 3, nome: 'Excluir', value: "EXCLUIR_FORMULARIO" }, { id: 4, nome: 'Editar', value: "EDITAR_FORMULARIO" }, { id: 5, nome: 'Responder', value: "RESPONDER_FORMULARIO" }]} />
      <hr className="mt-4 mb-2" />
      <Form.Label label="Usuários" className="mt-0" />
      <MultiPermissionSelector defaultValue={permissions} setValue={setValue} getValues={getValues} equipeid={equipeid} presets={[{ id: 1, nome: 'Editar', value: "EDITAR_USUARIOS" }]} />
      <hr className="mt-4 mb-2" />
      <Form.Label label="Equipe" className="mt-0" />
      <MultiPermissionSelector defaultValue={permissions} setValue={setValue} getValues={getValues} equipeid={equipeid} presets={[{ id: 1, nome: 'Visualizar', value: "VISUALIZAR_EQUIPE" }, { id: 2, nome: 'Editar', value: "EDITAR_EQUIPE" }, { id: 3, nome: 'Excluir', value: "EXCLUIR_EQUIPE" }]} />
      <hr />
    </div>
  </div>
}
