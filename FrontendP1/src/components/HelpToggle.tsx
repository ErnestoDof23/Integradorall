import { HelpCircle } from 'lucide-react';
import { useHelp } from '../hooks/useHelp';

export default function HelpToggle() {
  const { helpEnabled, toggleHelp } = useHelp();

  return (
    <button
      onClick={toggleHelp}
      aria-label={helpEnabled ? 'Desactivar modo ayuda' : 'Activar modo ayuda'}
      title={helpEnabled ? 'Modo ayuda activado' : 'Activar modo ayuda'}
      className={`rounded-lg p-2 transition-colors cursor-pointer ${
        helpEnabled
          ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'
          : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
      }`}
    >
      <HelpCircle className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
