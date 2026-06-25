import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart3, Users, FileText, Download, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui';
import { Header } from '../components/ui';
import { getEventStats, getAbandonmentPoints } from '../services/analytics';

const EVENT_LABELS: Record<string, string> = {
  page_view: 'Paginas vistas',
  login: 'Logins',
  register: 'Registros',
  diagnostico_start: 'Diagnosticos iniciados',
  diagnostico_answer: 'Respuestas guardadas',
  diagnostico_complete: 'Diagnosticos completados',
  pdf_download: 'PDFs descargados',
  share: 'Shares en redes',
  feedback_submit: 'Feedback enviado',
  favorite_toggle: 'Favoritos toggled',
};

const EVENT_ICONS: Record<string, typeof Users> = {
  page_view: Users,
  login: Users,
  register: Users,
  diagnostico_start: FileText,
  diagnostico_complete: FileText,
  pdf_download: Download,
  share: Users,
};

export default function AdminDashboard() {
  const stats = useMemo(() => getEventStats(), []);
  const abandonment = useMemo(() => getAbandonmentPoints(), []);

  const totalEvents = Object.values(stats).reduce((a, b) => a + b, 0);
  const conversionRate = stats.diagnostico_start
    ? Math.round(((stats.diagnostico_complete || 0) / stats.diagnostico_start) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet>
        <title>Admin - Metricas | Diagnostico Inmobiliario</title>
      </Helmet>
      <Header title="Dashboard de Metricas" showBack>
        <span className="text-sm text-gray-500 dark:text-dark-text-secondary">Solo administrador</span>
      </Header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                <BarChart3 className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">{totalEvents}</p>
                <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Eventos totales</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">{stats.diagnostico_start || 0}</p>
                <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Diagnosticos iniciados</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">{conversionRate}%</p>
                <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Tasa de conversion</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Download className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">{stats.pdf_download || 0}</p>
                <p className="text-xs text-gray-500 dark:text-dark-text-secondary">PDFs descargados</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Event breakdown */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-dark-text">Eventos por tipo</h2>
          <div className="space-y-3">
            {Object.entries(stats)
              .sort(([, a], [, b]) => b - a)
              .map(([event, count]) => {
                const Icon = EVENT_ICONS[event] || Users;
                const pct = totalEvents > 0 ? Math.round((count / totalEvents) * 100) : 0;
                return (
                  <div key={event} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-gray-400 dark:text-dark-text-secondary" />
                    <span className="w-48 text-sm text-gray-700 dark:text-dark-text-secondary">{EVENT_LABELS[event] || event}</span>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800/50">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <span className="w-16 text-right text-sm font-medium text-gray-900 dark:text-dark-text">{count}</span>
                    <span className="w-12 text-right text-xs text-gray-400 dark:text-dark-text-secondary">{pct}%</span>
                  </div>
                );
              })}
          </div>
        </Card>

        {/* Abandonment points */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Puntos de abandono</h2>
          </div>
          {abandonment.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">No hay datos de abandono disponibles.</p>
          ) : (
            <div className="space-y-3">
              {abandonment.map((a) => (
                <div key={a.page} className="flex items-center justify-between rounded-lg bg-amber-50 px-4 py-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">{a.page}</span>
                  <span className="text-sm text-amber-600">{a.count} abandonos</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Data note */}
        <p className="text-center text-xs text-gray-400 dark:text-dark-text-secondary">
          Los datos se almacenan en localStorage del navegador. Para datos persistentes, integra un servicio de analytics externo (Google Analytics, Mixpanel, etc.).
        </p>
      </main>
    </div>
  );
}
