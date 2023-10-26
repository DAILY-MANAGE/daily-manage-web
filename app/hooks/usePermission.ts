import { useEffect, useState } from "react"
import { VER_TODAS_PERMISSOES_DO_USUARIO_LOGADO_NA_EQUIPE } from "../utils/EndpointStorage"
import { useFetch } from "./useFetch"

export const usePermission = (permission: string | undefined = undefined, equipeId: number) => {
  const [contains, setContains] = useState(false)

  const { data, refetch } = useFetch({
    url: VER_TODAS_PERMISSOES_DO_USUARIO_LOGADO_NA_EQUIPE,
    isGet: true,
    header: {
      Equipe: equipeId,
    }
  })

  useEffect(() => {
    if (data && data.data && data.data.includes(permission)) {
      setContains(true)
    }
    // isso pode dar merda
    refetch()
    return () => {
      setContains(false)
      refetch()
    }
  }, [])

  console.log(data && data.data)

  return {
    contains,
    permissions: data && data.data
  }
}
