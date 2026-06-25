import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export default function Select({ label, options, error, className = '', required, id: externalId, ...props }: SelectProps) {
  const autoId = useId();
  const selectId = externalId || autoId;
  const errorId = `${selectId}-error`;

  return (
    <div className="space-y-1">
      <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
        {label}
        {required && <span className="text-danger ml-1" aria-hidden="true">*</span>}
      </label>
      <select
        id={selectId}
        aria-required={required || undefined}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white dark:bg-dark-surface dark:text-dark-text dark:border-dark-border ${
          error ? 'border-danger' : 'border-gray-300 dark:border-dark-border'
        } ${className}`}
        required={required}
        {...props}
      >
        <option value="">Selecciona...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
