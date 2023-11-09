import { useFetch } from "@/app/hooks/useFetch"
import { VISUALIZAR_NOTIFICACAO } from "@/app/utils/EndpointStorage"
import { ReactNode } from "react"

interface NotificationViewProps {
  children: ReactNode
  refetch: any
  notificationId: number
  notificationType: string
}

export default function NotificationView({ children, refetch, notificationId, notificationType }: NotificationViewProps) {
  const { handlePost } = useFetch({
    url: VISUALIZAR_NOTIFICACAO.replace("{notificacaoId}", notificationId.toString()),
    isGet: false
  })
  return <button className="w-fit h-max" onClick={async () => {
    if (notificationType === "CONVITE") {
      return
    }
    const res = await handlePost([])
    switch ((res as any).status) {
      case 200:
        refetch()
        break
      default:
        break
    }
  }}>
    {children}
  </button>
}
