import { AxiosError } from 'axios'

import { handleResponseErrors } from '../hooks/useFetch';
import { CustomResponse } from '../interfaces/CustomResponse';

let debounce = false;

const codes = new Map<string, string>([
  ['ERR_NETWORK', 'Ocorreu um erro de rede ao tentar se conectar ao servidor.'],
])

export const getErrorMessage = (axiosError: AxiosError) => {
  if (debounce) return
  debounce = true
  setTimeout(() => {
    debounce = false
  }, 1000)
  // edge case onde o request retorna um array de erros para as notificações.
  if (axiosError.response && axiosError.response.data && (axiosError.response.data as CustomResponse).errors) {
    handleResponseErrors(axiosError.response)
    return
  }
  if (!axiosError) return
  if (axiosError.code === undefined) return
  return codes.get(axiosError.code)
}
