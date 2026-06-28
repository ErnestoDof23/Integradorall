import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Plus,
  Building2,
  Trash2,
  LogOut,
  Loader2,
  FolderOpen,
  Calendar,
  MapPin,
  X,
  History,
  TrendingUp,
} from 'lucide-react';
import { Button, Card, Header, Input, Select } from '../components/ui';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/ui/Toast';
import { listProyectos, createProyecto, deleteProyecto } from '../services/api';
import { trackEvent } from '../services/analytics';
import OnboardingTour from '../components/OnboardingTour';
import type { Proyecto } from '../types';

const MEXICAN_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
  'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas',
];

const PROPERTY_TYPES = [
  { value: 'comercial', label: 'Comercial' },
  { value: 'educativo', label: 'Educativo' },
  { value: 'salud', label: 'Salud' },
  { value: 'oficinas', label: 'Oficinas' },
  { value: 'otro', label: 'Otro' },
];

const initialForm = {
  nombre: '',
  cliente: '',
  direccion: '',
  estado: '',
  ciudad: '',
  tipo: '',
  fecha: new Date().toISOString().split('T')[0],
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    trackEvent('page_view', { page: 'dashboard' });
    let cancelled = false;
    listProyectos()
      .then((data) => {
        if (!cancelled) setProyectos(data);
      })
      .catch(() => {
        if (!cancelled) showToast('Error al cargar proyectos', 'error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateForm = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio';
    if (!form.estado) errs.estado = 'Selecciona un estado';
    if (!form.ciudad.trim()) errs.ciudad = 'La ciudad es obligatoria';
    if (!form.tipo) errs.tipo = 'Selecciona un tipo';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const nuevo = await createProyecto({
        nombre: form.nombre,
        cliente: form.cliente,
        direccion: form.direccion,
        estado: form.estado,
        ciudad: form.ciudad,
        tipo: form.tipo,
        fecha: form.fecha,
      });
      showToast('Proyecto creado. Ahora completa los datos del inmueble para diagnosticar.', 'success');
      setShowModal(false);
      setForm({ ...initialForm, fecha: new Date().toISOString().split('T')[0] });
      setProyectos((prev) => [...prev, nuevo]);
    } catch {
      showToast('Error al crear proyecto', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar el proyecto "${nombre}"?`)) return;
    try {
      await deleteProyecto(id);
      showToast('Proyecto eliminado', 'success');
      setProyectos((prev) => prev.filter((p) => p.id !== id));
    } catch {
      showToast('Error al eliminar proyecto', 'error');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <OnboardingTour />
      <Helmet>
        <title>Dashboard | Diagnostico Inmobiliario</title>
        <meta name="description" content="Panel de control para gestionar diagnosticos de inmuebles" />
      </Helmet>
      <Header title="Dashboard" showBack={false}>
        <button
          onClick={() => navigate('/evolucion')}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          <TrendingUp className="h-4 w-4" />
          Evolucion
        </button>
        <button
          onClick={() => navigate('/historial')}
          data-tour="historial-link"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          <History className="h-4 w-4" />
          Historial
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Salir
        </button>
      </Header>

      <main id="main-content" className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
              Hola, {user?.nombre || 'Usuario'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
              {proyectos.length} proyecto{proyectos.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button onClick={() => setShowModal(true)} data-tour="nuevo-proyecto" data-help="Crear un nuevo proyecto de evaluacion">
            <Plus className="h-4 w-4" />
            Nuevo Proyecto
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : proyectos.length === 0 ? (
          <Card className="flex flex-col items-center py-16 space-y-4">
            <FolderOpen className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            <div className="text-center">
              <p className="font-medium text-gray-700 dark:text-dark-text">Sin proyectos</p>
              <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                Crea tu primer proyecto para comenzar un diagnóstico
              </p>
            </div>
            <Button onClick={() => setShowModal(true)}>
              <Plus className="h-4 w-4" />
              Crear Proyecto
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((p) => (
              <Card key={p.id} className="space-y-3" data-tour="proyecto-card">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <button
                    onClick={() => handleDelete(p.id, p.nombre)}
                    aria-label={`Eliminar proyecto ${p.nombre}`}
                    className="rounded-lg p-2 text-gray-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-danger cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-dark-text">{p.nombre}</h3>
                  {p.cliente && (
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Cliente: {p.cliente}</p>
                  )}
                </div>
                <div className="space-y-1 text-xs text-gray-500 dark:text-dark-text-secondary">
                  {p.direccion && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {p.direccion}, {p.ciudad}, {p.estado}
                    </div>
                  )}
                  {p.fecha && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {p.fecha}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    data-help="Iniciar diagnostico de accesibilidad para este proyecto"
                    onClick={() => {
                      localStorage.setItem('dashboard_proyecto', JSON.stringify(p));
                      navigate('/datos-inmueble');
                    }}
                  >
                    Diagnosticar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-dark-card p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Nuevo Proyecto</h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="Nombre del proyecto *"
                placeholder="Ej: Oficina Central"
                value={form.nombre}
                onChange={(e) => updateForm('nombre', e.target.value)}
                error={errors.nombre}
              />
              <Input
                label="Cliente"
                placeholder="Nombre del cliente"
                value={form.cliente}
                onChange={(e) => updateForm('cliente', e.target.value)}
              />
              <Input
                label="Dirección"
                placeholder="Calle, número, colonia"
                value={form.direccion}
                onChange={(e) => updateForm('direccion', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Estado *"
                  options={MEXICAN_STATES.map((s) => ({ value: s, label: s }))}
                  value={form.estado}
                  onChange={(e) => updateForm('estado', e.target.value)}
                  error={errors.estado}
                />
                <Input
                  label="Ciudad *"
                  placeholder="Ciudad"
                  value={form.ciudad}
                  onChange={(e) => updateForm('ciudad', e.target.value)}
                  error={errors.ciudad}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Tipo de inmueble *"
                  options={PROPERTY_TYPES}
                  value={form.tipo}
                  onChange={(e) => updateForm('tipo', e.target.value)}
                  error={errors.tipo}
                />
                <Input
                  label="Fecha"
                  type="date"
                  value={form.fecha}
                  onChange={(e) => updateForm('fecha', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreate} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Crear Proyecto'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
