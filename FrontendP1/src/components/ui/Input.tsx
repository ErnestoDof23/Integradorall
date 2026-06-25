import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, className = '', required, id: externalId, ...props }: InputProps) {
  const autoId = useId();
  const inputId = externalId || autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
        {label}
        {required && <span className="text-danger ml-1" aria-hidden="true">*</span>}
      </label>
      <input
        id={inputId}
        aria-required={required || undefined}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white dark:bg-dark-surface dark:text-dark-text dark:border-dark-border ${
          error ? 'border-danger' : 'border-gray-300 dark:border-dark-border'
        } ${className}`}
        required={required}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
