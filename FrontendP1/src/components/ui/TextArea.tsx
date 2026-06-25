import { useId } from 'react';
import type { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function TextArea({ label, className = '', id: externalId, ...props }: TextAreaProps) {
  const autoId = useId();
  const textareaId = externalId || autoId;

  return (
    <div className="space-y-1">
      <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`w-full rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface dark:text-dark-text px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none ${className}`}
        rows={3}
        {...props}
      />
    </div>
  );
}
