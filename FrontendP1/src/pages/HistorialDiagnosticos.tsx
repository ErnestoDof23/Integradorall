import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Loader2,
  History,
  Eye,
  Download,
  Calendar,
  Building2,
  TrendingUp,
  ArrowLeft,
  Plus,
} from 'lucide-react';
import { Button, Card, Header } from '../components/ui';
import FavoriteButton from '../components/FavoriteButton';
import { useToast } from '../components/ui/Toast';
import { useDiagnosis } from '../hooks/useDiagnosis';
import { listarDiagnosticos, downloadReport, type DiagnosticoListItem } from '../services/api';

type EstadoBadge = 'completado' | 'en_progreso' | 'borrador' | 'en_revision';

const estadoStyles: Record<EstadoBadge, string> = {
  completado: 'bg-success/10 text-success border-success/30',
  en_progreso: 'bg-warning/10 text-warning border-warning/30',
  borrador: 'bg-gray-100 text-gray-600 border-gray-300',
  en_revision: 'bg-info/10 text-info border-info/30',
};

const estadoLabels: Record<EstadoBadge, string> = {
  completado: 'Completado',
  en_progreso: 'En Progreso',
  borrador: 'Borrador',
  en_revision: 'En Revision',
};

function normEstado(estado: string): EstadoBadge {
  const e = estado.toLowerCase();
  if (e.includes('complet') || e.includes('finaliz')) return 'completado';
  if (e.includes('progreso') || e.includes('progress')) return 'en_progreso';
  if (e.includes('revision') || e.includes('review')) return 'en_revision';
  return 'borrador';
}

function formatFecha(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

function HistorialCardSkeleton() {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
      </div>
      <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
    </Card>
  );
}

export default function HistorialDiagnosticos() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setDiagnosticoId, reset } = useDiagnosis();
  const [items, setItems] = useState<DiagnosticoListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('diagnostico_favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    listarDiagnosticos()
      .then((res) => {
        setItems(res);
        setLoading(false);
      })
      .catch(() => {
        showToast('Error al cargar el historial', 'error');
        setLoading(false);
      });
  }, [showToast]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('diagnostico_favorites', JSON.stringify([...next]));
      return next;
    });
  };

  const filteredItems = showFavoritesOnly
    ? items.filter((i) => favorites.has(i.id))
    : items;

  const handleVer = (item: DiagnosticoListItem) => {
    setDiagnosticoId(item.id);
    navigate('/resultado');
  };

  const handleDescargar = async (item: DiagnosticoListItem) => {
    setDownloadingId(item.id);
    try {
      const blob = await downloadReport(item.id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diagnostico-${item.proyecto_nombre || item.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Reporte descargado', 'success');
    } catch {
      showToast('Error al descargar el PDF', 'error');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleNuevo = () => {
    reset();
    navigate('/datos-inmueble');
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet>
        <title>Historial de Diagnosticos</title>
        <meta name="description" content="Consulta el historial de diagnosticos realizados" />
      </Helmet>
      <Header title="Historial de Diagnosticos" showBack onBack={handleBack} />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
            {loading ? 'Cargando...' : `${filteredItems.length} diagnostico${filteredItems.length === 1 ? '' : 's'}`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              aria-pressed={showFavoritesOnly}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                showFavoritesOnly
                  ? 'bg-warning/10 text-warning border border-warning/30'
                  : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              Favoritos
            </button>
            <Button variant="primary" onClick={handleNuevo}>
              <Plus className="h-4 w-4" />
              Nuevo
            </Button>
          </div>
        </div>

        {loading ? (
          <>
            <HistorialCardSkeleton />
            <HistorialCardSkeleton />
            <HistorialCardSkeleton />
          </>
        ) : filteredItems.length === 0 ? (
          <Card className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
            <History className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-dark-text">No hay diagnosticos aun</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">Comienza tu primer diagnostico para verlo aqui.</p>
            </div>
            <Button variant="primary" onClick={handleNuevo}>
              <Plus className="h-4 w-4" />
              Crear Diagnostico
            </Button>
          </Card>
        ) : (
          filteredItems.map((item) => {
            const estado = normEstado(item.estado);
            const isDownloading = downloadingId === item.id;
            return (
              <Card key={item.id} className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-1">
                    <FavoriteButton
                      isFavorite={favorites.has(item.id)}
                      onToggle={() => toggleFavorite(item.id)}
                    />
                    <h3 className="truncate text-base font-semibold text-gray-900 dark:text-dark-text">
                      {item.proyecto_nombre || 'Diagnostico sin nombre'}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-dark-text-secondary">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatFecha(item.fecha || item.created_at || '')}
                      </span>
                      {item.direccion && (
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {item.direccion}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${estadoStyles[estado]}`}
                  >
                    {estadoLabels[estado]}
                  </span>
                </div>

                {item.porcentaje !== undefined && item.porcentaje !== null && (
                  <div className="flex items-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800/50 px-3 py-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-gray-700 dark:text-dark-text">Puntaje:</span>
                    <span className="text-sm font-bold text-primary">{item.porcentaje}%</span>
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="primary" onClick={() => handleVer(item)} className="flex-1">
                    <Eye className="h-4 w-4" />
                    Ver Resultado
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDescargar(item)}
                    disabled={isDownloading}
                    className="flex-1"
                  >
                    {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                    {isDownloading ? 'Descargando...' : 'Descargar PDF'}
                  </Button>
                </div>
              </Card>
            );
          })
        )}

        <Button variant="outline" onClick={handleBack} className="w-full">
          <ArrowLeft className="h-4 w-4" />
          Volver al Dashboard
        </Button>
      </main>
    </div>
  );
}
