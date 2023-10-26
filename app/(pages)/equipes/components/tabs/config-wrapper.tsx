import { usePermission } from "@/app/hooks/usePermission"
import Config from "../config/config"

interface TabContentWrapperProps {
  equipeId: number | undefined
  nomeEquipe: string
}

export default function ConfigWrapper({ equipeId, nomeEquipe }: TabContentWrapperProps) {

  if (!equipeId) {
    return <></>
  }

  const { permissions } = usePermission(undefined, equipeId)

  return <>
    {
      (permissions && (permissions.includes("EDITAR_EQUIPE") || permissions.includes("ADMINISTRADOR"))) && (
        <Config
          nomeEquipe={nomeEquipe}
          idEquipe={equipeId}
        />
      )
    }
  </>
}
