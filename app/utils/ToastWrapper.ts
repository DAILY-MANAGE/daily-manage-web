import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let isCurrentlyDarkMode = false;

const runColorMode = (fn: (isDarkMode: boolean) => void) => {
  if (!window.matchMedia) {
    return;
  }

  const query = window.matchMedia('(prefers-color-scheme: dark)');

  fn(query.matches);

  query.addEventListener('change', (event) => fn(event.matches));
};

runColorMode((isDarkMode: boolean) => {
  isCurrentlyDarkMode = isDarkMode;
});

const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

const createToast = (type: keyof typeof toast) => (message: string, options: ToastOptions = defaultToastOptions) => {
  options.theme = isCurrentlyDarkMode ? 'dark' : 'light';
  (toast as any)[type](message, options);
};

export const ToastWrapper = {
  info: createToast('info'),
  success: createToast('success'),
  warn: createToast('warn'),
  error: createToast('error'),
};
