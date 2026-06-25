import { useState } from 'react';
import { MessageSquare, Star, X, Send, Loader2 } from 'lucide-react';
import { Button } from './ui';
import { useToast } from './ui/Toast';
import api from '../services/api';

interface FeedbackData {
  puntuacion: number;
  comentario: string;
  contactar: boolean;
  email_contacto: string;
}

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FeedbackData>({
    puntuacion: 0,
    comentario: '',
    contactar: false,
    email_contacto: '',
  });
  const { showToast } = useToast();

  const handleRating = (rating: number) => {
    setForm((prev) => ({ ...prev, puntuacion: rating }));
  };

  const handleSubmit = async () => {
    if (form.puntuacion === 0) {
      showToast('Selecciona una puntuacion', 'error');
      return;
    }
    setSending(true);
    try {
      await api.post('/feedback', {
        puntuacion: form.puntuacion,
        comentario: form.comentario,
        contactar: form.contactar,
        email_contacto: form.contactar ? form.email_contacto : undefined,
      });
      setSubmitted(true);
      showToast('Gracias por tu feedback!', 'success');
      setTimeout(() => {
        setOpen(false);
        setSubmitted(false);
        setForm({ puntuacion: 0, comentario: '', contactar: false, email_contacto: '' });
      }, 2000);
    } catch {
      showToast('Error al enviar feedback', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="Danos tu opinion sobre la aplicacion"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="hidden text-sm font-medium sm:inline">Te gusta la app?</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Formulario de feedback">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-dark-card shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Danos tu opinion</h3>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Cerrar">
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-dark-text">Gracias!</p>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Tu opinion nos ayuda a mejorar.</p>
              </div>
            ) : (
              <div className="space-y-5 px-6 py-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Puntuacion</label>
                  <div className="flex gap-2" role="radiogroup" aria-label="Puntuacion del 1 al 5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => handleRating(n)}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-bold transition-all ${
                          form.puntuacion === n
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-dark-text-secondary hover:border-primary/50'
                        }`}
                        role="radio"
                        aria-checked={form.puntuacion === n}
                        aria-label={`${n} estrellas`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback-comentario" className="mb-1 block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Comentario (opcional)</label>
                  <textarea
                    id="feedback-comentario"
                    rows={3}
                    value={form.comentario}
                    onChange={(e) => setForm((prev) => ({ ...prev, comentario: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-dark-card dark:text-dark-text"
                    placeholder="Cuentanos tu experiencia..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="feedback-contacto"
                    checked={form.contactar}
                    onChange={(e) => setForm((prev) => ({ ...prev, contactar: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="feedback-contacto" className="text-sm text-gray-600">Quiero que me contacten</label>
                </div>

                {form.contactar && (
                  <div>
                    <label htmlFor="feedback-email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Tu email</label>
                    <input
                      type="email"
                      id="feedback-email"
                      value={form.email_contacto}
                      onChange={(e) => setForm((prev) => ({ ...prev, email_contacto: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-dark-card dark:text-dark-text"
                      placeholder="tu@email.com"
                    />
                  </div>
                )}

                <Button onClick={handleSubmit} disabled={sending || form.puntuacion === 0} className="w-full">
                  {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Enviar opinion
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
