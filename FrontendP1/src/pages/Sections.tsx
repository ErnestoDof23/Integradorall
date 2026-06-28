import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DoorOpen,
  ArrowRightLeft,
  Droplets,
  AlertTriangle,
  ParkingCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button, Card, Header, StatusBadge } from '../components/ui';
import { useToast } from '../components/ui/Toast';
import { useDiagnosis } from '../hooks/useDiagnosis';
import { getCategorias, finalizarDiagnostico } from '../services/api';
import { trackEvent } from '../services/analytics';
import type { Categoria, SectionStatus } from '../types';

const ICONS: Record<string, typeof DoorOpen> = {
  accesos: DoorOpen,
  circulaciones: ArrowRightLeft,
  sanitarios: Droplets,
  senializacion: AlertTriangle,
  estacionamiento: ParkingCircle,
};

function getSectionStatus(cat: Categoria): SectionStatus {
  if (cat.respondidas === 0) return 'pendiente';
  if (cat.respondidas < cat.total_preguntas) return 'en_proceso';
  return 'completado';
}

const statusLabels: Record<SectionStatus, string> = {
  pendiente: 'Pendiente',
  en_proceso: 'En proceso',
  completado: 'Completado',
};

export default function Sections() {
  const navigate = useNavigate();
  const { state, setCategorias, setCurrentCategoria } = useDiagnosis();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [finalizing, setFinalizing] = useState(false);

  useEffect(() => {
    if (!state.diagnostico_id) {
      navigate('/datos-inmueble');
      return;
    }

    getCategorias(state.diagnostico_id)
      .then((cats) => {
        setCategorias(cats);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar categorías. Verifica el backend.');
        setLoading(false);
      });
  }, [state.diagnostico_id, navigate, setCategorias]);

  const categorias = state.categorias;
  const completedCount = categorias.filter(
    (c) => getSectionStatus(c) === 'completado'
  ).length;
  const allCompleted = completedCount === categorias.length && categorias.length > 0;

  const handleCategoriaClick = (categoriaId: string) => {
    setCurrentCategoria(categoriaId);
    navigate(`/diagnostico/${categoriaId}`);
  };

  const handleFinish = () => {
    setShowConfirm(true);
  };

  const handleConfirmFinish = async () => {
    if (!state.diagnostico_id) return;
    setFinalizing(true);
    try {
      await finalizarDiagnostico(state.diagnostico_id);
      trackEvent('diagnostico_complete', { diagnostico_id: state.diagnostico_id });
      showToast('Diagnostico completado exitosamente', 'success');
      setShowConfirm(false);
      navigate('/resultado');
    } catch {
      showToast('Error al finalizar el diagnostico', 'error');
    } finally {
      setFinalizing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Header title="Secciones del Diagnóstico" showBack />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
          Selecciona una sección para comenzar el diagnóstico. Completa todas las
          secciones para obtener el resultado final.
        </p>

        <div className="space-y-3">
          {categorias.map((cat) => {
            const status = getSectionStatus(cat);
            const Icon = ICONS[cat.nombre.toLowerCase().replace(/\s/g, '')] || DoorOpen;
            return (
              <Card
                key={cat.id}
                hoverable
                onClick={() => handleCategoriaClick(cat.id)}
                className="flex items-center gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-dark-text">{cat.nombre}</h3>
                  <p className="text-xs text-gray-500 dark:text-dark-text-secondary">
                    {cat.total_preguntas > 0
                      ? `${cat.respondidas}/${cat.total_preguntas} preguntas`
                      : 'Cargando preguntas...'}
                  </p>
                </div>
                <StatusBadge status={status}>
                  {statusLabels[status]}
                </StatusBadge>
              </Card>
            );
          })}
        </div>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-dark-text">
              Progreso: {completedCount}/{categorias.length} secciones
            </p>
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary">
              {allCompleted
                ? 'Todas las secciones completadas'
                : 'Completa todas las secciones para ver el resultado'}
            </p>
          </div>
          <Button onClick={handleFinish} disabled={!allCompleted}>
            Ver Resultado
          </Button>
        </Card>
      </main>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-dark-card p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Finalizar diagnostico</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
              Estas seguro que deseas finalizar el diagnostico? Se generara el resultado con las respuestas actuales.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowConfirm(false)} disabled={finalizing}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmFinish} disabled={finalizing}>
                {finalizing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Finalizando...
                  </>
                ) : (
                  'Si, finalizar'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
