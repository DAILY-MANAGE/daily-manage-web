import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const defaultToastOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
}

const createToast =
  (type: keyof typeof toast) =>
  (message: string, options: ToastOptions = defaultToastOptions) => {
    ;(toast as any)[type](message, options)
  }

export const ToastWrapper = {
  info: createToast('info'),
  success: createToast('success'),
  warn: createToast('warn'),
  error: createToast('error'),
}
