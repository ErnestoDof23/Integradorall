import type { ReactNode } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import ThemeToggle from '../ThemeToggle';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showProgress?: boolean;
  progressValue?: number;
  onBack?: () => void;
  children?: ReactNode;
}

export default function Header({
  title,
  showBack = false,
  showProgress = false,
  progressValue = 0,
  onBack,
  children,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-dark-border bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        {showBack && (
          <button
            onClick={onBack || (() => navigate(-1))}
            aria-label="Volver a la pagina anterior"
            className="rounded-lg p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        {!showBack && (
          <button
            onClick={() => navigate('/dashboard')}
            aria-label="Ir al dashboard"
            className="rounded-lg p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <Home className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        <h1 className="flex-1 text-lg font-semibold text-gray-900 dark:text-dark-text">{title}</h1>
        {children}
        <ThemeToggle />
      </div>
      {showProgress && (
        <div className="px-4 pb-3">
          <ProgressBar value={progressValue} size="sm" />
        </div>
      )}
    </header>
  );
}
