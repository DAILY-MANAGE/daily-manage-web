import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

let isCurrentlyDarkMode = false
let globalWindow: Window | null = null

const runColorMode = (fn: (isDarkMode: boolean) => void) => {
  if (!globalWindow) {
    return
  }
  if (!globalWindow.matchMedia) {
    return
  }
  const query = globalWindow.matchMedia('(prefers-color-scheme: dark)')
  fn(query.matches)
  query.addEventListener('change', (event) => fn(event.matches))
}

const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}

const createToast =
  (type: keyof typeof toast) =>
  (message: string, options: ToastOptions = defaultToastOptions) => {
    options.theme = isCurrentlyDarkMode ? 'dark' : 'light'
    ;(toast as any)[type](message, options)
  }

const setupWindow = () => (window: Window) => {
  if (globalWindow) return
  globalWindow = window
  runColorMode((isDarkMode: boolean) => {
    isCurrentlyDarkMode = isDarkMode
  })
}

export const ToastWrapper = {
  info: createToast('info'),
  success: createToast('success'),
  warn: createToast('warn'),
  error: createToast('error'),
  setupWindow: setupWindow(),
}
