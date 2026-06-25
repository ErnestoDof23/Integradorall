import { useState } from 'react';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Button, Card } from './ui';
import type { Answer, Categoria } from '../types';

interface ResumenDiagnosticoProps {
  categorias: Categoria[];
  answers: Record<string, Answer>;
  preguntasMap: Record<string, { texto: string; categoria_id: string }>;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

const nivelLabels: Record<string, string> = {
  optimo: 'Optimo (10 pts)',
  aceptable: 'Aceptable (5 pts)',
  malo: 'Malo (0 pts)',
};

export default function ResumenDiagnostico({
  categorias,
  answers,
  preguntasMap,
  onConfirm,
  onCancel,
}: ResumenDiagnosticoProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totalPreguntas = Object.keys(answers).length;
  const totalCategorias = categorias.length;

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      await onConfirm();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-dark-text">Resumen del Diagnostico</h3>
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
          Revisa tus respuestas antes de finalizar. Tienes {totalPreguntas} preguntas respondidas
          en {totalCategorias} categorias.
        </p>
      </Card>

      {categorias.map((cat) => {
        const catAnswers = Object.entries(answers).filter(
          ([, a]) => preguntasMap[a.pregunta_id]?.categoria_id === cat.id
        );
        return (
          <Card key={cat.id} className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-dark-text">{cat.nombre}</h4>
            {catAnswers.length === 0 ? (
              <p className="text-xs text-warning flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Sin respuestas
              </p>
            ) : (
              <ul className="space-y-1">
                {catAnswers.map(([pid, a]) => (
                  <li key={pid} className="flex items-center gap-2 text-xs text-gray-600 dark:text-dark-text-secondary">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    <span className="truncate">{preguntasMap[pid]?.texto || pid}</span>
                    <span className="ml-auto font-medium text-gray-900 dark:text-dark-text">{nivelLabels[a.nivel] || a.nivel}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        );
      })}

      <Card className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700 dark:text-dark-text-secondary">
            Confirmo que he revisado mis respuestas y deseo finalizar el diagnostico.
          </span>
        </label>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} disabled={submitting} className="flex-1">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!confirmed || submitting} className="flex-1">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {submitting ? 'Finalizando...' : 'Finalizar Diagnostico'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
