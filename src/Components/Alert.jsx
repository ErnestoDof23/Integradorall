import Swal from 'sweetalert2';
import { theme } from '../theme';

/**
 * Utilidad para mostrar alertas con Sweet Alert - Material Design
 * Tipos de alertas: 'success', 'error', 'warning', 'info', 'question'
 */
export const showAlert = (
  title = '',
  message = '',
  type = 'info',
  options = {}
) => {
  const getTypeConfig = () => {
    const configs = {
      success: {
        icon: 'success',
        confirmButtonColor: theme.success.main,
        background: theme.success.background,
      },
      error: {
        icon: 'error',
        confirmButtonColor: theme.error.main,
        background: theme.error.background,
      },
      warning: {
        icon: 'warning',
        confirmButtonColor: theme.warning.main,
        background: theme.warning.background,
      },
      info: {
        icon: 'info',
        confirmButtonColor: theme.info.main,
        background: theme.info.background,
      },
      question: {
        icon: 'question',
        confirmButtonColor: theme.primary.main,
        background: theme.neutral[50],
      },
    };
    return configs[type] || configs.info;
  };

  const typeConfig = getTypeConfig();

  return Swal.fire({
    title,
    html: message,
    icon: typeConfig.icon,
    confirmButtonColor: typeConfig.confirmButtonColor,
    confirmButtonText: 'Aceptar',
    background: typeConfig.background,
    didOpen: (modal) => {
      modal.style.borderRadius = theme.borderRadius.lg;
      const title = modal.querySelector('.swal2-title');
      if (title) {
        title.style.fontFamily = theme.typography.fontFamily;
        title.style.fontSize = '1.5rem';
        title.style.fontWeight = '500';
        title.style.color = theme.neutral[900];
      }
      const content = modal.querySelector('.swal2-html-container');
      if (content) {
        content.style.fontFamily = theme.typography.fontFamily;
        content.style.fontSize = '1rem';
        content.style.color = theme.neutral[700];
      }
      const confirmButton = modal.querySelector('.swal2-confirm');
      if (confirmButton) {
        confirmButton.style.borderRadius = theme.borderRadius.lg;
        confirmButton.style.padding = `${theme.spacing[2]} ${theme.spacing[4]}`;
        confirmButton.style.fontWeight = '500';
      }
    },
    ...options,
  });
};

/**
 * Muestra una alerta de confirmación
 */
export const showConfirm = (
  title = '¿Estás seguro?',
  message = '',
  onConfirm = () => {},
  onCancel = () => {}
) => {
  return Swal.fire({
    title,
    html: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: theme.primary.main,
    cancelButtonColor: theme.neutral[400],
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar',
    background: theme.neutral[50],
    didOpen: (modal) => {
      modal.style.borderRadius = theme.borderRadius.lg;
      const title = modal.querySelector('.swal2-title');
      if (title) {
        title.style.fontFamily = theme.typography.fontFamily;
        title.style.fontSize = '1.5rem';
        title.style.fontWeight = '500';
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else {
      onCancel();
    }
  });
};

/**
 * Muestra una alerta de loading
 */
export const showLoading = (message = 'Cargando...') => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: async () => {
      await Swal.showLoading();
    },
  });
};

/**
 * Cierra la alerta actual
 */
export const closeAlert = () => {
  Swal.close();
};

export default {
  showAlert,
  showConfirm,
  showLoading,
  closeAlert,
};
