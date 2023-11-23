import { AxiosError } from 'axios'

import { getErrorMessage } from './ErrorHandler'
import { ToastWrapper } from './ToastWrapper'

export const handleAxiosError = (error: unknown) => {
  const errorMessage = getErrorMessage(error as AxiosError)
  if (!errorMessage) return
  ToastWrapper.error(errorMessage)
}
