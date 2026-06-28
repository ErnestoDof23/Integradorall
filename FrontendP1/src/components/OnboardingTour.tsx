import { useState, useCallback } from 'react';
import { Joyride, ACTIONS, EVENTS } from 'react-joyride';
import { Accessibility } from 'lucide-react';

const TOUR_STORAGE_KEY = 'onboarding_tour_active';

interface TourStep {
  target: string;
  content: string;
  placement?: string;
}

const LANDING_STEPS: TourStep[] = [
  { target: '[data-tour="landing-hero"]', content: 'Bienvenido a TodoAccesible. Herramienta para diagnosticar accesibilidad de inmuebles.', placement: 'bottom' },
  { target: '[data-tour="landing-start"]', content: 'Haz clic aqui para comenzar tu primer diagnostico.', placement: 'top' },
  { target: '[data-tour="landing-features"]', content: 'Estas son las funcionalidades principales de la herramienta.', placement: 'top' },
  { target: '[data-tour="landing-steps"]', content: 'Son 3 simples pasos para completar un diagnostico.', placement: 'top' },
  { target: '[data-tour="theme-toggle"]', content: 'Cambia entre modo claro y oscuro aqui.', placement: 'bottom' },
  { target: '[data-tour="help-toggle"]', content: 'Activa esta guia de ayuda en cualquier momento.', placement: 'top' },
];

const DASHBOARD_STEPS: TourStep[] = [
  { target: '[data-tour="dashboard-hello"]', content: 'Bienvenido a tu dashboard. Aqui ves tus proyectos.', placement: 'bottom' },
  { target: '[data-tour="nuevo-proyecto"]', content: 'Crea un nuevo proyecto para comenzar un diagnostico.', placement: 'bottom' },
  { target: '[data-tour="proyecto-card"]', content: 'Tus proyectos aparecen aqui. Diagnosticar para evaluar.', placement: 'top' },
  { target: '[data-tour="historial-link"]', content: 'Accede a todos tus diagnosticos anteriores.', placement: 'bottom' },
  { target: '[data-tour="theme-toggle"]', content: 'Cambia el tema visual de la aplicacion.', placement: 'bottom' },
];

const ADMIN_STEPS: TourStep[] = [
  { target: '[data-tour="admin-diagnosticos"]', content: 'Ve todos los diagnosticos de todos los usuarios.', placement: 'bottom' },
  { target: '[data-tour="admin-preguntas"]', content: 'Gestiona las preguntas del cuestionario. Agrega, edita o elimina.', placement: 'bottom' },
  { target: '[data-tour="admin-usuarios"]', content: 'Administra usuarios. Puedes bloquearlos o cambiar su rol.', placement: 'bottom' },
];

interface OnboardingTourProps {
  page: 'landing' | 'dashboard' | 'admin';
}

export default function OnboardingTour({ page }: OnboardingTourProps) {
  const [run, setRun] = useState(() => {
    return localStorage.getItem(TOUR_STORAGE_KEY) === page;
  });

  const steps = page === 'landing' ? LANDING_STEPS : page === 'dashboard' ? DASHBOARD_STEPS : ADMIN_STEPS;

  const handleCallback = useCallback((data: Record<string, string>) => {
    const { action, type } = data;
    if (action === ACTIONS.SKIP || type === EVENTS.TOUR_END || action === ACTIONS.CLOSE) {
      setRun(false);
      localStorage.removeItem(TOUR_STORAGE_KEY);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const JoyrideAny = Joyride as any;

  return (
    <JoyrideAny
      run={run}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      steps={steps as any}
      callback={handleCallback}
      continuous
      showProgress
      showSkipButton
      locale={{
        back: 'Atras',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Saltar guia',
      }}
      styles={{
        options: {
          primaryColor: '#E91E8C',
          textColor: '#1f2937',
          backgroundColor: '#ffffff',
          overlayColor: 'rgba(0,0,0,0.5)',
          spotlightPadding: 8,
          zIndex: 1000,
        },
        tooltip: { borderRadius: 12, padding: 16 },
        buttonNext: { backgroundColor: '#E91E8C', borderRadius: 8, padding: '8px 16px', fontSize: 14, fontWeight: 600 },
        buttonBack: { color: '#6b7280', fontSize: 14 },
        buttonSkip: { color: '#9ca3af', fontSize: 13 },
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } as any}
    />
  );
}

export function TourButton({ page }: { page: 'landing' | 'dashboard' | 'admin' }) {
  const startTour = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, page);
    window.location.reload();
  };

  return (
    <button
      onClick={startTour}
      data-tour="help-toggle"
      aria-label="Iniciar guia de ayuda"
      title="Guia de ayuda"
      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"
    >
      <Accessibility className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
