import { useFetch } from "@/app/hooks/useFetch"
import { RESPONDER_FORMULARIO } from "@/app/utils/EndpointStorage"
import { ToastWrapper } from "@/app/utils/ToastWrapper"

export const submitForm = async (submitData: unknown, id: string, equipeId: string | null) => {

  const { handlePost } = useFetch({
    url: `${RESPONDER_FORMULARIO.replace("{formularioId}", id)}`,
    isGet: false,
    header: {
      Equipe: equipeId
    }
  })

  const res: any = await handlePost([RESPONDER_FORMULARIO.replace("{formularioId}", id), submitData])
  if (!res) {
    ToastWrapper.error("Não foi possível enviar o formulário.")
    return
  }
  switch ((res as any).status) {
    case 201:
      ToastWrapper.success('Formulário preenchido com sucesso.')
      break
    default:
      ToastWrapper.warn('Algo deu errado no preenchimento do formulário')
      break
  }
}
