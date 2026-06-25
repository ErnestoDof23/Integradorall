import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, Calendar, ArrowLeft, BarChart3 } from 'lucide-react';
import { Card, Header } from '../components/ui';
import { useToast } from '../components/ui/Toast';
import { listarDiagnosticos, type DiagnosticoListItem } from '../services/api';

interface DataPoint {
  id: string;
  label: string;
  date: string;
  porcentaje: number;
  fullDate: string;
}

function formatFecha(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

function formatFechaFull(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
}

export default function EvolutionChart() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [items, setItems] = useState<DiagnosticoListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  useEffect(() => {
    listarDiagnosticos()
      .then((res) => {
        const completed = res
          .filter((d) => d.estado === 'completado' && d.porcentaje != null && d.created_at)
          .sort((a, b) => new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime());
        setItems(completed);
        setLoading(false);
      })
      .catch(() => {
        showToast('Error al cargar el historial', 'error');
        setLoading(false);
      });
  }, [showToast]);

  const dataPoints: DataPoint[] = items.map((item, idx) => ({
    id: item.id,
    label: item.proyecto_nombre || `Dx ${idx + 1}`,
    date: formatFecha(item.created_at || item.fecha),
    porcentaje: item.porcentaje || 0,
    fullDate: formatFechaFull(item.created_at || item.fecha),
  }));

  const avgScore = dataPoints.length > 0
    ? Math.round(dataPoints.reduce((acc, d) => acc + d.porcentaje, 0) / dataPoints.length)
    : 0;

  const maxScore = dataPoints.length > 0 ? Math.max(...dataPoints.map((d) => d.porcentaje)) : 0;
  const minScore = dataPoints.length > 0 ? Math.min(...dataPoints.map((d) => d.porcentaje)) : 0;

  const chartWidth = 600;
  const chartHeight = 280;
  const padding = { top: 30, right: 30, bottom: 50, left: 50 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const xScale = (idx: number) => {
    if (dataPoints.length <= 1) return padding.left + innerWidth / 2;
    return padding.left + (idx / (dataPoints.length - 1)) * innerWidth;
  };

  const yScale = (value: number) => {
    return padding.top + innerHeight - (value / 100) * innerHeight;
  };

  const pathD = dataPoints.length > 0
    ? dataPoints.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.porcentaje)}`).join(' ')
    : '';

  const areaD = dataPoints.length > 0
    ? `${pathD} L ${xScale(dataPoints.length - 1)} ${padding.top + innerHeight} L ${xScale(0)} ${padding.top + innerHeight} Z`
    : '';

  function getColor(pct: number): string {
    if (pct >= 70) return '#16a34a';
    if (pct >= 40) return '#d97706';
    return '#dc2626';
  }

  function getLabel(pct: number): string {
    if (pct >= 80) return 'Excelente';
    if (pct >= 60) return 'Bueno';
    if (pct >= 40) return 'Regular';
    return 'Deficiente';
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet>
        <title>Evolucion de Diagnosticos</title>
        <meta name="description" content="Visualiza la evolucion de tus diagnosticos de accesibilidad" />
      </Helmet>
      <Header title="Evolucion de Diagnosticos" showBack onBack={() => navigate('/dashboard')} />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-6 space-y-6">

        {loading ? (
          <div className="space-y-4">
            <div className="h-64 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
            <div className="h-32 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
          </div>
        ) : dataPoints.length === 0 ? (
          <Card className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
            <BarChart3 className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-dark-text">Sin datos de evolucion</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">
                Completa al menos un diagnostico para ver tu evolucion.
              </p>
            </div>
          </Card>
        ) : (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="space-y-1 text-center py-4">
                <p className="text-2xl font-bold text-primary">{avgScore}%</p>
                <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Promedio</p>
              </Card>
              <Card className="space-y-1 text-center py-4">
                <p className="text-2xl font-bold text-success">{maxScore}%</p>
                <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Maximo</p>
              </Card>
              <Card className="space-y-1 text-center py-4">
                <p className="text-2xl font-bold text-warning">{minScore}%</p>
                <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Minimo</p>
              </Card>
            </div>

            {/* Chart */}
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-dark-text">Evolucion de Puntajes</h3>
                <span className="text-xs text-gray-500 dark:text-dark-text-secondary">{dataPoints.length} diagnosticos</span>
              </div>

              <div className="overflow-x-auto">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full min-w-[400px]"
                  role="img"
                  aria-label="Grafica de evolucion de diagnosticos"
                >
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((tick) => (
                    <g key={tick}>
                      <line
                        x1={padding.left}
                        y1={yScale(tick)}
                        x2={padding.left + innerWidth}
                        y2={yScale(tick)}
                        stroke="#e5e7eb"
                        className="dark:stroke-gray-600"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={padding.left - 8}
                        y={yScale(tick) + 4}
                        textAnchor="end"
                        fontSize="10"
                        fill="#9ca3af"
                      >
                        {tick}%
                      </text>
                    </g>
                  ))}

                  {/* Area fill */}
                  {dataPoints.length > 1 && (
                    <path d={areaD} fill="url(#areaGradient)" opacity="0.3" />
                  )}

                  {/* Line */}
                  {dataPoints.length > 1 && (
                    <path d={pathD} fill="none" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  )}

                  {/* Data points */}
                  {dataPoints.map((d, i) => (
                    <g key={d.id}>
                      <circle
                        cx={xScale(i)}
                        cy={yScale(d.porcentaje)}
                        r={hoveredPoint === d.id ? 8 : 6}
                        fill={getColor(d.porcentaje)}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredPoint(d.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                      {/* Value label on hover */}
                      {hoveredPoint === d.id && (
                        <g>
                          <rect
                            x={xScale(i) - 55}
                            y={yScale(d.porcentaje) - 35}
                            width="110"
                            height="28"
                            rx="6"
                            fill="#1e293b"
                          />
                          <text
                            x={xScale(i)}
                            y={yScale(d.porcentaje) - 22}
                            textAnchor="middle"
                            fontSize="10"
                            fill="white"
                            fontWeight="600"
                          >
                            {d.porcentaje}% - {getLabel(d.porcentaje)}
                          </text>
                          <text
                            x={xScale(i)}
                            y={yScale(d.porcentaje) - 12}
                            textAnchor="middle"
                            fontSize="8"
                            fill="#94a3b8"
                          >
                            {d.date}
                          </text>
                        </g>
                      )}
                    </g>
                  ))}

                  {/* X-axis labels */}
                  {dataPoints.map((d, i) => (
                    <text
                      key={d.id}
                      x={xScale(i)}
                      y={chartHeight - 10}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#9ca3af"
                      transform={`rotate(-30 ${xScale(i)} ${chartHeight - 10})`}
                    >
                      {d.label.substring(0, 12)}
                    </text>
                  ))}

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </Card>

            {/* History list */}
            <Card className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-dark-text">Historial Detallado</h3>
              <div className="space-y-2">
                {[...items].reverse().map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-dark-border p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="h-3 w-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getColor(item.porcentaje || 0) }}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-dark-text truncate">
                          {item.proyecto_nombre || 'Sin nombre'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-dark-text-secondary flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatFechaFull(item.created_at || item.fecha)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <TrendingUp className="h-4 w-4" style={{ color: getColor(item.porcentaje || 0) }} />
                      <span className="text-sm font-bold" style={{ color: getColor(item.porcentaje || 0) }}>
                        {item.porcentaje}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        <button
          onClick={() => navigate('/dashboard')}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-dark-border py-3 text-sm text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al Dashboard
        </button>
      </main>
    </div>
  );
}
