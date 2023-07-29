import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isDarkMode = (window: Window): boolean => {
  if (!window.matchMedia) {
    return false;
  }

  const query = window.matchMedia('(prefers-color-scheme: dark)');
  return query.matches;
};

const createToast =
  (type: keyof typeof toast) =>
  (message: string, options: ToastOptions, window: Window) => {
    options.theme = isDarkMode(window) ? 'dark' : 'light';
    (toast as any)[type](message, options);
  };

export const ToastWrapper = {
  info: createToast('info'),
  success: createToast('success'),
  warn: createToast('warn'),
  error: createToast('error'),
};
