import { toast } from 'react-toastify';

export const showToast = (message, type = 'default', options = {}) => {
  toast(message, {
    ...options,
    type,
  });
};

export const showSuccessNotification = (message, options = {}) => {
  showToast(message, 'success', options);
};

export const showErrorNotification = (message, options = {}) => {
  showToast(message, 'error', options);
};

export const showWarningNotification = (message, options = {}) => {
  showToast(message, 'warning', options);
};

export const showInfoNotification = (message, options = {}) => {
  showToast(message, 'info', options);
};

export const showLoadingNotification = (message, options = {}) => {
  const toastId = toast.loading(message, {
    ...options,
  });

  return {
    update: newOptions => {
      toast.update(toastId, newOptions);
    },
    success: (message, newOptions = {}) => {
      toast.update(toastId, {
        render: message,
        autoClose: 5000,
        type: 'success',
        isLoading: false,
        closeOnClick: true,
        ...newOptions,
      });
    },
    error: (message, newOptions = {}) => {
      toast.update(toastId, {
        render: message,
        autoClose: 5000,
        type: 'error',
        isLoading: false,
        closeOnClick: true,
        ...newOptions,
      });
    },
    close: () => {
      toast.dismiss(toastId);
    },
  };
};
