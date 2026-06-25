/* eslint-disable react-hooks/immutability, react-hooks/preserve-manual-memoization */
import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  BarChart3, FileText, Download, AlertTriangle,
  ClipboardList, Eye, Trash2, Plus, Pencil, Save, X, Loader2,
} from 'lucide-react';
import { Card, Header, Button, Input } from '../components/ui';
import { useToast } from '../components/ui/Toast';
import {
  adminGetDiagnosticos, adminGetPreguntas,
  adminCreatePregunta, adminUpdatePregunta, adminDeletePregunta,
  type AdminDiagnostico, type AdminCategoriaPreguntas,
} from '../services/api';
import { getEventStats, getAbandonmentPoints } from '../services/analytics';

type Tab = 'metricas' | 'diagnosticos' | 'preguntas';

export default function AdminDashboard() {
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>('metricas');

  // Metricas
  const stats = getEventStats();
  const abandonment = getAbandonmentPoints();
  const totalEvents = Object.values(stats).reduce((a, b) => a + b, 0);
  const conversionRate = stats.diagnostico_start
    ? Math.round(((stats.diagnostico_complete || 0) / stats.diagnostico_start) * 100)
    : 0;

  // Diagnosticos
  const [diagnosticos, setDiagnosticos] = useState<AdminDiagnostico[]>([]);
  const [loadingDiag, setLoadingDiag] = useState(false);

  // Preguntas
  const [categoriasPreguntas, setCategoriasPreguntas] = useState<AdminCategoriaPreguntas[]>([]);
  const [loadingPreg, setLoadingPreg] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [newTexts, setNewTexts] = useState<Record<string, string>>({});
  const [showNewFor, setShowNewFor] = useState<string | null>(null);

  useEffect(() => {
    if (tab === 'diagnosticos') loadDiagnosticos();
    if (tab === 'preguntas') loadPreguntas();
  }, [tab, loadDiagnosticos, loadPreguntas]);

  const loadDiagnosticos = useCallback(async () => {
    setLoadingDiag(true);
    try {
      const data = await adminGetDiagnosticos();
      setDiagnosticos(data);
    } catch {
      showToast('Error al cargar diagnosticos', 'error');
    } finally {
      setLoadingDiag(false);
    }
  }, [showToast]);

  const loadPreguntas = useCallback(async () => {
    setLoadingPreg(true);
    try {
      const data = await adminGetPreguntas();
      setCategoriasPreguntas(data);
    } catch {
      showToast('Error al cargar preguntas', 'error');
    } finally {
      setLoadingPreg(false);
    }
  }, [showToast]);

  const handleAddPregunta = useCallback(async (categoriaId: string) => {
    const text = newTexts[categoriaId]?.trim();
    if (!text) { showToast('Escribe el texto de la pregunta', 'error'); return; }
    try {
      await adminCreatePregunta({ categoria_id: categoriaId, texto: text });
      setNewTexts((prev) => ({ ...prev, [categoriaId]: '' }));
      setShowNewFor(null);
      showToast('Pregunta agregada', 'success');
      loadPreguntas();
    } catch {
      showToast('Error al agregar pregunta', 'error');
    }
  }, [newTexts, showToast, loadPreguntas]);

  const handleUpdatePregunta = useCallback(async (id: string) => {
    if (!editText.trim()) { showToast('El texto no puede estar vacio', 'error'); return; }
    try {
      await adminUpdatePregunta(id, { texto: editText });
      setEditingId(null);
      showToast('Pregunta actualizada', 'success');
      loadPreguntas();
    } catch {
      showToast('Error al actualizar pregunta', 'error');
    }
  }, [editText, showToast, loadPreguntas]);

  const handleDeletePregunta = useCallback(async (id: string) => {
    if (!confirm('Eliminar esta pregunta?')) return;
    try {
      await adminDeletePregunta(id);
      showToast('Pregunta eliminada', 'success');
      loadPreguntas();
    } catch {
      showToast('Error al eliminar pregunta', 'error');
    }
  }, [showToast, loadPreguntas]);

  const tabs: { key: Tab; label: string; icon: typeof BarChart3 }[] = [
    { key: 'metricas', label: 'Metricas', icon: BarChart3 },
    { key: 'diagnosticos', label: 'Diagnosticos', icon: ClipboardList },
    { key: 'preguntas', label: 'Preguntas', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet>
        <title>Admin | Diagnostico Inmobiliario</title>
      </Helmet>
      <Header title="Panel de Administracion" showBack>
        <span className="text-sm text-gray-500 dark:text-dark-text-secondary">demo@accesibilidad.com</span>
      </Header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-dark-border pb-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                tab === t.key
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-dark-text-secondary dark:hover:bg-dark-surface'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB: Metricas */}
        {tab === 'metricas' && (
          <>
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

            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-dark-text">Eventos por tipo</h2>
              <div className="space-y-3">
                {Object.entries(stats)
                  .sort(([, a], [, b]) => b - a)
                  .map(([event, count]) => {
                    const pct = totalEvents > 0 ? Math.round((count / totalEvents) * 100) : 0;
                    return (
                      <div key={event} className="flex items-center gap-3">
                        <span className="w-48 text-sm text-gray-700 dark:text-dark-text-secondary">{event}</span>
                        <div className="flex-1">
                          <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800/50">
                            <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                        <span className="w-16 text-right text-sm font-medium text-gray-900 dark:text-dark-text">{count}</span>
                      </div>
                    );
                  })}
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Puntos de abandono</h2>
              </div>
              {abandonment.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">No hay datos de abandono.</p>
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
          </>
        )}

        {/* TAB: Diagnosticos */}
        {tab === 'diagnosticos' && (
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
                Diagnosticos de todos los usuarios
              </h2>
              <Button variant="outline" onClick={loadDiagnosticos} disabled={loadingDiag}>
                {loadingDiag ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
                Actualizar
              </Button>
            </div>
            {loadingDiag ? (
              <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : diagnosticos.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-dark-text-secondary">No hay diagnosticos registrados.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-dark-border text-left">
                      <th className="pb-2 font-medium text-gray-500 dark:text-dark-text-secondary">Proyecto</th>
                      <th className="pb-2 font-medium text-gray-500 dark:text-dark-text-secondary">Cliente</th>
                      <th className="pb-2 font-medium text-gray-500 dark:text-dark-text-secondary">Usuario</th>
                      <th className="pb-2 font-medium text-gray-500 dark:text-dark-text-secondary">Estado</th>
                      <th className="pb-2 font-medium text-gray-500 dark:text-dark-text-secondary">Score</th>
                      <th className="pb-2 font-medium text-gray-500 dark:text-dark-text-secondary">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                    {diagnosticos.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-dark-surface">
                        <td className="py-3 font-medium text-gray-900 dark:text-dark-text">{d.proyecto_nombre}</td>
                        <td className="py-3 text-gray-600 dark:text-dark-text-secondary">{d.cliente || '-'}</td>
                        <td className="py-3">
                          <div className="text-gray-900 dark:text-dark-text">{d.usuario_nombre}</div>
                          <div className="text-xs text-gray-500 dark:text-dark-text-secondary">{d.usuario_email}</div>
                        </td>
                        <td className="py-3">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            d.estado === 'completado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {d.estado}
                          </span>
                        </td>
                        <td className="py-3 font-medium text-gray-900 dark:text-dark-text">{d.porcentaje || 0}%</td>
                        <td className="py-3 text-gray-500 dark:text-dark-text-secondary">
                          {new Date(d.created_at).toLocaleDateString('es-MX')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* TAB: Preguntas */}
        {tab === 'preguntas' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
                Gestion de Preguntas
              </h2>
              <Button variant="outline" onClick={loadPreguntas} disabled={loadingPreg}>
                {loadingPreg ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
                Actualizar
              </Button>
            </div>
            {loadingPreg ? (
              <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              categoriasPreguntas.map((cat) => (
                <Card key={cat.categoria_id} className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-dark-text">{cat.nombre}</h3>
                    <button
                      onClick={() => setShowNewFor(showNewFor === cat.categoria_id ? null : cat.categoria_id)}
                      className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-dark cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Agregar
                    </button>
                  </div>

                  {/* Add new question form */}
                  {showNewFor === cat.categoria_id && (
                    <div className="mb-3 flex gap-2">
                      <Input
                        placeholder="Texto de la nueva pregunta..."
                        value={newTexts[cat.categoria_id] || ''}
                        onChange={(e) => setNewTexts((prev) => ({ ...prev, [cat.categoria_id]: e.target.value }))}
                      />
                      <Button onClick={() => handleAddPregunta(cat.categoria_id)}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={() => setShowNewFor(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="space-y-2">
                    {cat.preguntas.map((p) => (
                      <div key={p.id} className="flex items-center gap-2 rounded-lg bg-gray-50 dark:bg-dark-surface px-3 py-2">
                        {editingId === p.id ? (
                          <>
                            <Input
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="flex-1"
                            />
                            <button onClick={() => handleUpdatePregunta(p.id)} className="text-green-600 hover:text-green-700 cursor-pointer">
                              <Save className="h-4 w-4" />
                            </button>
                            <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="flex-1 text-sm text-gray-700 dark:text-dark-text-secondary">{p.texto}</span>
                            <button
                              onClick={() => { setEditingId(p.id); setEditText(p.texto); }}
                              className="text-gray-400 hover:text-primary cursor-pointer"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePregunta(p.id)}
                              className="text-gray-400 hover:text-red-500 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                    {cat.preguntas.length === 0 && (
                      <p className="text-xs text-gray-400 dark:text-dark-text-secondary">No hay preguntas en esta categoria.</p>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
