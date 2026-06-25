import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card p-6 shadow-sm transition-all ${
        hoverable
          ? 'cursor-pointer hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
