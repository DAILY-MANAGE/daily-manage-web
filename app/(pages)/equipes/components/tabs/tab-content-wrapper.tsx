import { TabsContent } from "@/app/components/Shadcn/tabs"
import { usePermission } from "@/app/hooks/usePermission"
import { useEffect } from "react"

import Forms from "./forms"
import Logs from "./logs"
import Users from "./users"

interface TabContentWrapperProps {
  equipeId: number
  usuarios: any
  teamCreator: string
  refetchTeamData: any
}

export default function TabContentWrapper({ equipeId, usuarios, teamCreator, refetchTeamData }: TabContentWrapperProps) {
  const { permissions, refetch } = usePermission(undefined, equipeId)

  useEffect(() => {
    refetch()
  }, [])

  return <>
    <TabsContent value="forms" className="space-y-4">
      {
        (permissions && (permissions.includes("VISUALIZAR_FORMULARIO") || permissions.includes("ADMINISTRADOR"))) ? (
          <Forms />
        ) : <p>Você não possui permissão para ver os formulários dessa equipe.</p>
      }
    </TabsContent>
    <TabsContent value="users" className="space-y-4">
      {
        (permissions && (permissions.includes("EDITAR_USUARIOS") || permissions.includes("ADMINISTRADOR"))) ? (
          <Users refetch={refetchTeamData} equipeId={equipeId} userPermissions={permissions} userData={usuarios} teamCreator={teamCreator}/>
        ) : <p>Você não possui permissão para ver os formulários dessa equipe.</p>
      }
    </TabsContent>
    <TabsContent value="logs" className="space-y-4">
    {
        (permissions && (permissions.includes("VER_REGISTROS_DE_USUARIO") || permissions.includes("ADMINISTRADOR"))) ? (
          <Logs equipeId={equipeId}/>
        ) : <p>Você não possui permissão para ver os formulários dessa equipe.</p>
      }

    </TabsContent>
  </>

}
