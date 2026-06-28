/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ClipboardList, FileText, Users, Trash2, Plus, Pencil, Save, X, Loader2,
  ChevronDown, ChevronRight, Shield, UserX, RefreshCw,
} from 'lucide-react';
import { Card, Header, Button, Input } from '../components/ui';
import { useToast } from '../components/ui/Toast';
import OnboardingTour, { TourButton } from '../components/OnboardingTour';
import {
  adminGetDiagnosticos, adminGetPreguntas, adminGetUsuarios,
  adminCreatePregunta, adminUpdatePregunta, adminDeletePregunta,
  adminUpdateUserRole, adminToggleBlockUser,
  type AdminDiagnostico, type AdminCategoriaPreguntas, type AdminUsuario,
} from '../services/api';
import { getEventStats } from '../services/analytics';

type Tab = 'panel' | 'diagnosticos' | 'preguntas' | 'usuarios';

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('panel');
  const stats = getEventStats();
  const totalEvents = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <OnboardingTour page="admin" />
      <Helmet>
        <title>Admin | TodoAccesible</title>
      </Helmet>
      <Header title="Panel de Administracion" showBack>
        <TourButton page="admin" />
        <span className="text-sm text-gray-500 dark:text-dark-text-secondary">demo@accesibilidad.com</span>
      </Header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {tab === 'panel' && (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <button data-tour="admin-diagnosticos" onClick={() => setTab('diagnosticos')} className="cursor-pointer">
                <Card className="flex items-center gap-4 p-6 transition-all hover:shadow-lg hover:scale-[1.02]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30">
                    <ClipboardList className="h-7 w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">{stats.diagnostico_complete || 0}</p>
                    <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Diagnosticos completados</p>
                  </div>
                </Card>
              </button>
              <button data-tour="admin-preguntas" onClick={() => setTab('preguntas')} className="cursor-pointer">
                <Card className="flex items-center gap-4 p-6 transition-all hover:shadow-lg hover:scale-[1.02]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <FileText className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">5</p>
                    <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Categorias de preguntas</p>
                  </div>
                </Card>
              </button>
              <button data-tour="admin-usuarios" onClick={() => setTab('usuarios')} className="cursor-pointer">
                <Card className="flex items-center gap-4 p-6 transition-all hover:shadow-lg hover:scale-[1.02]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-900/30">
                    <Users className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">{totalEvents}</p>
                    <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Eventos totales</p>
                  </div>
                </Card>
              </button>
            </div>
            <Card className="p-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-dark-text">Resumen rapido</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                <div className="rounded-lg bg-gray-50 dark:bg-dark-surface p-4">
                  <p className="text-gray-500 dark:text-dark-text-secondary">Diagnosticos iniciados</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-dark-text">{stats.diagnostico_start || 0}</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-dark-surface p-4">
                  <p className="text-gray-500 dark:text-dark-text-secondary">PDFs descargados</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-dark-text">{stats.pdf_download || 0}</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-dark-surface p-4">
                  <p className="text-gray-500 dark:text-dark-text-secondary">Shares en redes</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-dark-text">{stats.share || 0}</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-dark-surface p-4">
                  <p className="text-gray-500 dark:text-dark-text-secondary">Feedback enviado</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-dark-text">{stats.feedback_submit || 0}</p>
                </div>
              </div>
            </Card>
          </>
        )}

        {tab === 'diagnosticos' && <DiagnosticosTab onBack={() => setTab('panel')} />}
        {tab === 'preguntas' && <PreguntasTab onBack={() => setTab('panel')} />}
        {tab === 'usuarios' && <UsuariosTab onBack={() => setTab('panel')} />}
      </main>
    </div>
  );
}

function DiagnosticosTab({ onBack }: { onBack: () => void }) {
  const { showToast } = useToast();
  const [diagnosticos, setDiagnosticos] = useState<AdminDiagnostico[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    adminGetDiagnosticos()
      .then(setDiagnosticos)
      .catch(() => showToast('Error al cargar diagnosticos', 'error'))
      .finally(() => setLoading(false));
  }, [showToast]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-dark-surface cursor-pointer">
          <ChevronRight className="h-5 w-5 rotate-180 text-gray-500" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Diagnosticos</h2>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : diagnosticos.length === 0 ? (
        <Card className="py-12 text-center"><p className="text-gray-500">No hay diagnosticos registrados.</p></Card>
      ) : (
        <div className="space-y-3">
          {diagnosticos.map((d) => (
            <Card key={d.id} className="overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}
                className="flex w-full items-center gap-4 p-4 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-surface"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <ClipboardList className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-dark-text">{d.proyecto_nombre}</p>
                  <p className="text-xs text-gray-500">{d.usuario_nombre} - {d.usuario_email}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${d.estado === 'completado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {d.estado}
                </span>
                <span className="text-sm font-bold text-primary">{d.porcentaje || 0}%</span>
                {expandedId === d.id ? <ChevronDown className="h-5 w-5 text-gray-400" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
              </button>
              {expandedId === d.id && (
                <div className="border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-surface p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Cliente:</span> <span className="font-medium text-gray-900 dark:text-dark-text">{d.cliente || '-'}</span></div>
                    <div><span className="text-gray-500">Direccion:</span> <span className="font-medium text-gray-900 dark:text-dark-text">{d.direccion || '-'}</span></div>
                    <div><span className="text-gray-500">Creado:</span> <span className="font-medium text-gray-900 dark:text-dark-text">{new Date(d.created_at).toLocaleDateString('es-MX')}</span></div>
                    <div><span className="text-gray-500">Completado:</span> <span className="font-medium text-gray-900 dark:text-dark-text">{d.completed_at ? new Date(d.completed_at).toLocaleDateString('es-MX') : '-'}</span></div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function PreguntasTab({ onBack }: { onBack: () => void }) {
  const { showToast } = useToast();
  const [categorias, setCategorias] = useState<AdminCategoriaPreguntas[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [newTexts, setNewTexts] = useState<Record<string, string>>({});
  const [showNewFor, setShowNewFor] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGetPreguntas();
      setCategorias(data);
    } catch {
      showToast('Error al cargar preguntas', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { load(); }, [load]);

  const handleAdd = async (catId: string) => {
    const text = newTexts[catId]?.trim();
    if (!text) { showToast('Escribe el texto', 'error'); return; }
    try {
      await adminCreatePregunta({ categoria_id: catId, texto: text });
      setNewTexts((p) => ({ ...p, [catId]: '' }));
      setShowNewFor(null);
      showToast('Pregunta agregada', 'success');
      load();
    } catch { showToast('Error al agregar', 'error'); }
  };

  const handleUpdate = async (id: string) => {
    if (!editText.trim()) { showToast('El texto no puede estar vacio', 'error'); return; }
    try {
      await adminUpdatePregunta(id, { texto: editText });
      setEditingId(null);
      showToast('Pregunta actualizada', 'success');
      load();
    } catch { showToast('Error al actualizar', 'error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminar esta pregunta?')) return;
    try {
      await adminDeletePregunta(id);
      showToast('Pregunta eliminada', 'success');
      load();
    } catch { showToast('Error al eliminar', 'error'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-dark-surface cursor-pointer">
          <ChevronRight className="h-5 w-5 rotate-180 text-gray-500" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Preguntas por Categoria</h2>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        categorias.map((cat) => (
          <Card key={cat.categoria_id} className="overflow-hidden">
            <button
              onClick={() => setExpandedCat(expandedCat === cat.nombre ? null : cat.nombre)}
              className="flex w-full items-center gap-4 p-4 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-surface"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-dark-text">{cat.nombre}</p>
                <p className="text-xs text-gray-500">{cat.preguntas.length} preguntas</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowNewFor(showNewFor === cat.nombre ? null : cat.nombre); setExpandedCat(cat.nombre); }}
                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-dark cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
              {expandedCat === cat.nombre ? <ChevronDown className="h-5 w-5 text-gray-400" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
            </button>
            {expandedCat === cat.nombre && (
              <div className="border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-surface p-4 space-y-2">
                {showNewFor === cat.nombre && (
                  <div className="flex gap-2 mb-3">
                    <Input placeholder="Nueva pregunta..." value={newTexts[cat.nombre] || ''} onChange={(e) => setNewTexts((p) => ({ ...p, [cat.nombre]: e.target.value }))} />
                    <Button onClick={() => handleAdd(cat.categoria_id)}><Save className="h-4 w-4" /></Button>
                    <Button variant="outline" onClick={() => setShowNewFor(null)}><X className="h-4 w-4" /></Button>
                  </div>
                )}
                {cat.preguntas.map((p) => (
                  <div key={p.id} className="flex items-center gap-2 rounded-lg bg-white dark:bg-dark-card px-3 py-2">
                    {editingId === p.id ? (
                      <>
                        <Input value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-1" />
                        <button onClick={() => handleUpdate(p.id)} className="text-green-600 hover:text-green-700 cursor-pointer"><Save className="h-4 w-4" /></button>
                        <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X className="h-4 w-4" /></button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 text-sm text-gray-700 dark:text-dark-text-secondary">{p.texto}</span>
                        <button onClick={() => { setEditingId(p.id); setEditText(p.texto); }} className="text-gray-400 hover:text-primary cursor-pointer"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="text-gray-400 hover:text-red-500 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                      </>
                    )}
                  </div>
                ))}
                {cat.preguntas.length === 0 && <p className="text-xs text-gray-400">No hay preguntas.</p>}
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  );
}

function UsuariosTab({ onBack }: { onBack: () => void }) {
  const { showToast } = useToast();
  const [usuarios, setUsuarios] = useState<AdminUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const PARENT_ADMIN_EMAIL = 'demo@accesibilidad.com';

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGetUsuarios();
      setUsuarios(data);
    } catch {
      showToast('Error al cargar usuarios', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { load(); }, [load]);

  const handleToggleBlock = async (u: AdminUsuario) => {
    if (u.email === PARENT_ADMIN_EMAIL) {
      showToast('No se puede bloquear al administrador principal', 'error');
      return;
    }
    const accion = u.email === PARENT_ADMIN_EMAIL ? 'desbloquear' : (u as AdminUsuario & { blocked?: boolean }).blocked ? 'desbloquear' : 'bloquear';
    try {
      await adminToggleBlockUser(u.id);
      showToast(`Usuario ${accion}do exitosamente`, 'success');
      load();
    } catch { showToast('Error al modificar usuario', 'error'); }
  };

  const handleChangeRole = async (u: AdminUsuario) => {
    if (u.email === PARENT_ADMIN_EMAIL) {
      showToast('No se puede modificar el rol del administrador principal', 'error');
      return;
    }
    const newRole = u.email === PARENT_ADMIN_EMAIL ? 'admin' : 'admin';
    try {
      await adminUpdateUserRole(u.id, newRole);
      showToast('Rol actualizado exitosamente', 'success');
      load();
    } catch { showToast('Error al cambiar rol', 'error'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-dark-surface cursor-pointer">
          <ChevronRight className="h-5 w-5 rotate-180 text-gray-500" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Usuarios</h2>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usuarios.map((u) => {
            const isParent = u.email === PARENT_ADMIN_EMAIL;
            return (
              <Card key={u.id} className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isParent ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-dark-surface text-gray-600'}`}>
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-dark-text truncate">{u.nombre}</p>
                    <p className="text-xs text-gray-500 truncate">{u.email}</p>
                  </div>
                  {isParent && <Shield className="h-5 w-5 text-primary flex-shrink-0" title="Administrador principal" />}
                </div>
                <div className="text-xs text-gray-500">
                  {u.total_diagnosticos} diagnostico{u.total_diagnosticos !== 1 ? 's' : ''} &middot; {new Date(u.created_at).toLocaleDateString('es-MX')}
                </div>
                {!isParent && (
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" variant="outline" onClick={() => handleToggleBlock(u)} className="flex-1">
                      <UserX className="h-3.5 w-3.5" />
                      Bloquear
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleChangeRole(u)} className="flex-1">
                      <RefreshCw className="h-3.5 w-3.5" />
                      Rol Admin
                    </Button>
                  </div>
                )}
                {isParent && (
                  <div className="pt-1">
                    <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
                      <Shield className="h-3.5 w-3.5" />
                      Administrador principal - Protegido
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
