import { useState } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';
import { Button, Card } from './ui';
import { useToast } from './ui/Toast';

interface EncuestaSatisfaccionProps {
  diagnosticoId: string;
  onComplete: () => void;
}

const preguntas = [
  'Que tan facil fue usar el sistema de diagnostico?',
  'Que tan util fue el resultado del diagnostico?',
  'Recomendarías el sistema a otros?',
];

export default function EncuestaSatisfaccion({ diagnosticoId, onComplete }: EncuestaSatisfaccionProps) {
  const { showToast } = useToast();
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const allAnswered = Object.keys(respuestas).length === preguntas.length;

  const handleRate = (preguntaIdx: number, value: number) => {
    setRespuestas((prev) => ({ ...prev, [preguntaIdx]: value }));
  };

  const handleSubmit = async () => {
    setSending(true);
    try {
      // Simulate sending to backend
      await new Promise((r) => setTimeout(r, 1000));
      console.log('Encuesta enviada:', { diagnosticoId, respuestas });
      setSent(true);
      showToast('Gracias por tu feedback', 'success');
    } catch {
      showToast('Error al enviar encuesta', 'error');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <Card className="space-y-3 text-center py-6">
        <Star className="mx-auto h-8 w-8 text-warning" />
        <p className="font-medium text-gray-900">Gracias por tu feedback</p>
        <Button onClick={onComplete}>Continuar</Button>
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <h3 className="font-semibold text-gray-900">Encuesta de Satisfaccion</h3>
      <p className="text-xs text-gray-500">Ayudanos a mejorar (3 preguntas rapidas)</p>

      {preguntas.map((pregunta, idx) => (
        <div key={idx} className="space-y-2">
          <p className="text-sm text-gray-700">{pregunta}</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleRate(idx, value)}
                aria-label={`${value} de 5`}
                className={`h-8 w-8 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                  respuestas[idx] === value
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-200 text-gray-500 hover:border-primary/50'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      <Button onClick={handleSubmit} disabled={!allAnswered || sending} className="w-full">
        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {sending ? 'Enviando...' : 'Enviar Encuesta'}
      </Button>
    </Card>
  );
}
