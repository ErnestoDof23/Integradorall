import type { ReactNode } from 'react';

interface StatusBadgeProps {
  status: 'pendiente' | 'en_proceso' | 'completado';
  children: ReactNode;
}

const styles = {
  pendiente: 'bg-gray-100 text-gray-600',
  en_proceso: 'bg-blue-100 text-blue-700',
  completado: 'bg-green-100 text-green-700',
};

const dots = {
  pendiente: 'bg-gray-400',
  en_proceso: 'bg-blue-500',
  completado: 'bg-green-500',
};

export default function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {children}
    </span>
  );
}
