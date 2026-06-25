import { Loader2, Check } from 'lucide-react';

interface AutoSaveIndicatorProps {
  saving: boolean;
  lastSaved: Date | null;
}

export default function AutoSaveIndicator({ saving, lastSaved }: AutoSaveIndicatorProps) {
  if (saving) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-dark-text-secondary" role="status" aria-live="polite">
        <Loader2 className="h-3 w-3 animate-spin" />
        Guardando...
      </div>
    );
  }

  if (lastSaved) {
    const time = lastSaved.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    return (
      <div className="flex items-center gap-1.5 text-xs text-success" role="status">
        <Check className="h-3 w-3" />
        Guardado {time}
      </div>
    );
  }

  return null;
}
