import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Loader2 } from 'lucide-react';
import { Button, Card, Header, Input, Select } from '../components/ui';
import { useDiagnosis } from '../hooks/useDiagnosis';
import { createProyecto, createDiagnostico } from '../services/api';
import { trackEvent } from '../services/analytics';
import type { Property, Proyecto } from '../types';

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

function getInitialForm(): Property {
  const stored = localStorage.getItem('dashboard_proyecto');
  if (stored) {
    try {
      const p: Proyecto = JSON.parse(stored);
      localStorage.removeItem('dashboard_proyecto');
      return {
        nombre: p.nombre || '',
        cliente: p.cliente || '',
        direccion: p.direccion || '',
        estado: p.estado || '',
        ciudad: p.ciudad || '',
        tipo: p.tipo || '',
        fecha: p.fecha || new Date().toISOString().split('T')[0],
      };
    } catch {
      // ignore
    }
  }
  return {
    nombre: '',
    cliente: '',
    direccion: '',
    estado: '',
    ciudad: '',
    tipo: '',
    fecha: new Date().toISOString().split('T')[0],
  };
}

export default function PropertyData() {
  const navigate = useNavigate();
  const { state, setProyectoId, setDiagnosticoId, setProperty } = useDiagnosis();

  const [form, setForm] = useState<Property>(getInitialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update = (field: keyof Property, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio';
    if (!form.cliente.trim()) errs.cliente = 'El cliente es obligatorio';
    if (!form.direccion.trim()) errs.direccion = 'La dirección es obligatoria';
    if (!form.estado) errs.estado = 'Selecciona un estado';
    if (!form.ciudad.trim()) errs.ciudad = 'La ciudad es obligatoria';
    if (!form.tipo) errs.tipo = 'Selecciona un tipo de inmueble';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      let proyectoId = state.proyecto_id;

      if (!proyectoId) {
        const proyecto = await createProyecto({
          nombre: form.nombre,
          cliente: form.cliente,
          direccion: form.direccion,
          estado: form.estado,
          ciudad: form.ciudad,
          tipo: form.tipo,
          fecha: form.fecha,
        });
        proyectoId = proyecto.id;
        setProyectoId(proyecto.id);
      }

      const diagnostico = await createDiagnostico(proyectoId);
      setDiagnosticoId(diagnostico.id);
      trackEvent('diagnostico_start', { proyecto_id: proyectoId });

      setProperty(form);
      navigate('/secciones');
    } catch {
      setErrors({ submit: 'Error al conectar con el servidor. Verifica que el backend esté corriendo en localhost:3001' });
    } finally {
      setLoading(false);
    }
  };

  const stateOptions = MEXICAN_STATES.map((s) => ({ value: s, label: s }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Header title="Datos del Inmueble" showBack={false} />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-6">
        <Card className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-dark-text">Información del Inmueble</h2>
              <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Completa los datos para comenzar el diagnóstico</p>
            </div>
          </div>

          {errors.submit && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {errors.submit}
            </div>
          )}

          <Input
            label="Nombre del inmueble *"
            placeholder="Ej: Oficina Central, Sucursal Norte"
            value={form.nombre}
            onChange={(e) => update('nombre', e.target.value)}
            error={errors.nombre}
          />

          <Input
            label="Cliente"
            placeholder="Nombre del cliente"
            value={form.cliente}
            onChange={(e) => update('cliente', e.target.value)}
            error={errors.cliente}
          />

          <Input
            label="Dirección"
            placeholder="Calle, número, colonia"
            value={form.direccion}
            onChange={(e) => update('direccion', e.target.value)}
            error={errors.direccion}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Estado *"
              options={stateOptions}
              value={form.estado}
              onChange={(e) => update('estado', e.target.value)}
              error={errors.estado}
            />
            <Input
              label="Ciudad *"
              placeholder="Ciudad"
              value={form.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
              error={errors.ciudad}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Tipo de inmueble *"
              options={PROPERTY_TYPES}
              value={form.tipo}
              onChange={(e) => update('tipo', e.target.value)}
              error={errors.tipo}
            />
            <Input
              label="Fecha de evaluación"
              type="date"
              value={form.fecha}
              onChange={(e) => update('fecha', e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSubmit} size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'COMENZAR'
              )}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
