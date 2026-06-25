/* eslint-disable react-refresh/only-export-components */
import { useState, useCallback, createContext, useContext, type ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />,
    error: <AlertCircle className="h-5 w-5 text-danger" aria-hidden="true" />,
    info: <Info className="h-5 w-5 text-primary" aria-hidden="true" />,
  };

  const bg = {
    success: 'border-success/30 bg-green-50 dark:bg-green-900/30 dark:border-green-700/50',
    error: 'border-danger/30 bg-red-50 dark:bg-red-900/30 dark:border-red-700/50',
    info: 'border-primary/30 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-700/50',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-label="Notificaciones"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg animate-slide-in ${bg[t.type]}`}
          >
            {icons[t.type]}
            <span className="text-sm text-gray-800 dark:text-dark-text">{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              aria-label="Cerrar notificacion"
              className="ml-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
