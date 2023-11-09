import { useEffect, useState } from "react"
import { VER_TODAS_PERMISSOES_DO_USUARIO_LOGADO_NA_EQUIPE, VER_TODAS_PERMISSOES_POR_EQUIPE } from "../utils/EndpointStorage"
import { useAuth } from "./useAuth"
import { useFetch } from "./useFetch"

export const usePermission = (permission: string | undefined = undefined, equipeId: number, usuario?: string) => {
  const [contains, setContains] = useState(false)

  const {session} = useAuth()

  if (!usuario) {
    if (session) {
      usuario = session.usuario
    }
  }

  const { data, refetch } = useFetch({
    url: VER_TODAS_PERMISSOES_POR_EQUIPE,
    isGet: true,
    header: {
      Equipe: equipeId,
      Usuario: usuario
    }
  })

  useEffect(() => {
    if (data && data.data && data.data.includes(permission)) {
      setContains(true)
    }
    return () => {
      setContains(false)
      refetch()
    }
  }, [])

  return {
    contains,
    permissions: data && data.data,
    refetch
  }
}
