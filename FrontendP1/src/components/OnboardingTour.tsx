import { useState, useEffect, useCallback } from 'react';
import { Joyride, ACTIONS, EVENTS } from 'react-joyride';
import { useAuth } from '../hooks/useAuth';

const TOUR_KEY = 'onboarding_tour_completed';

interface TourStep {
  target: string;
  content: string;
  placement?: string;
}

const tourSteps: TourStep[] = [
  {
    target: 'body',
    content: 'Bienvenido a Diagnostico Inmobiliario! Te guiaremos por las funcionalidades principales.',
    placement: 'center',
  },
  {
    target: '[data-tour="nuevo-proyecto"]',
    content: 'Comienza creando un nuevo proyecto de diagnostico.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="proyecto-card"]',
    content: 'Tus proyectos aparecen aqui. Puedes diagnosticar, editar o eliminar.',
    placement: 'top',
  },
  {
    target: '[data-tour="historial-link"]',
    content: 'Accede a todos tus diagnosticos anteriores desde aqui.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="header-user"]',
    content: 'Tu perfil y boton de cerrar sesion.',
    placement: 'bottom',
  },
];

const DASHBOARD_STEPS: TourStep[] = [
  {
    target: '[data-tour="feedback-btn"]',
    content: 'Tienes sugerencias? Haz clic aqui para enviarnos tu opinion.',
    placement: 'top',
  },
];

interface OnboardingTourProps {
  forceRun?: boolean;
}

export default function OnboardingTour({ forceRun = false }: OnboardingTourProps) {
  const { user } = useAuth();
  const [run, setRun] = useState(false);
  const allSteps = [...tourSteps, ...DASHBOARD_STEPS];

  useEffect(() => {
    if (forceRun) {
      const timer = setTimeout(() => setRun(true), 0);
      return () => clearTimeout(timer);
    }
    const completed = localStorage.getItem(TOUR_KEY);
    const isFirstVisit = !completed && user;
    if (isFirstVisit) {
      const timer = setTimeout(() => setRun(true), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [user, forceRun]);

  const handleCallback = useCallback((data: Record<string, string>) => {
    const { action, type } = data;
    if (action === ACTIONS.SKIP || type === EVENTS.TOUR_END) {
      setRun(false);
      localStorage.setItem(TOUR_KEY, 'true');
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const JoyrideAny = Joyride as any;

  return (
    <JoyrideAny
      run={run}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      steps={allSteps as any}
      callback={handleCallback}
      continuous
      showProgress
      showSkipButton
      locale={{
        back: 'Atras',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Saltar tour',
      }}
      styles={{
        options: {
          primaryColor: '#2563eb',
          textColor: '#1f2937',
          backgroundColor: '#ffffff',
          overlayColor: 'rgba(0,0,0,0.5)',
          spotlightPadding: 8,
          zIndex: 1000,
        },
        tooltip: {
          borderRadius: 12,
          padding: 16,
        },
        buttonNext: {
          backgroundColor: '#2563eb',
          borderRadius: 8,
          padding: '8px 16px',
          fontSize: 14,
          fontWeight: 600,
        },
        buttonBack: {
          color: '#6b7280',
          fontSize: 14,
        },
        buttonSkip: {
          color: '#9ca3af',
          fontSize: 13,
        },
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } as any}
    />
  );
}

export function TourTriggerButton() {
  const handleRestart = () => {
    localStorage.removeItem(TOUR_KEY);
    window.location.reload();
  };

  return (
    <button
      onClick={handleRestart}
      className="text-sm text-primary underline hover:text-primary/80"
      aria-label="Reiniciar tour guiado"
    >
      Ver tour guiado
    </button>
  );
}
