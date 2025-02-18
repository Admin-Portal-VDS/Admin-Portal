import { useToast as vueToast } from 'vue-toastification';

export function useToast() {
  const toast = vueToast();

  const success = (message, options = {}) => {
    toast.success(message, {
      position: 'top-right',
      timeout: 3000,
      ...options,
    });
  };

  const error = (message, options = {}) => {
    toast.error(message, { position: 'top-right', timeout: 3000, ...options });
  };

  return { success, error };
}
