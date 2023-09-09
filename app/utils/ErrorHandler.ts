import { AxiosError } from 'axios'

const codes = new Map<string, string>([
  ['ERR_NETWORK', 'Ocorreu um erro de rede ao tentar se conectar ao servidor.'],
])

const unknownErrorMessage = 'Ocorreu um erro desconhecido.'

export const getErrorMessage = (axiosError: AxiosError) => {
  if (!axiosError) return unknownErrorMessage
  if (axiosError.code === undefined) return unknownErrorMessage
  return codes.get(axiosError.code) || unknownErrorMessage
}
