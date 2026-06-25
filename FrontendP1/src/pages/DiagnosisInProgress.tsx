import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Circle } from 'lucide-react';
import { Button, Card, Header, RadioButtonGroup, TextArea } from '../components/ui';
import AutoSaveIndicator from '../components/AutoSaveIndicator';
import { useDiagnosis } from '../hooks/useDiagnosis';
import { getPreguntas, saveRespuesta } from '../services/api';
import type { Answer, AnswerLevel, Question } from '../types';

const ANSWER_OPTIONS = [
  { value: 'optimo' as AnswerLevel, label: 'Óptimo', description: '10 puntos' },
  { value: 'aceptable' as AnswerLevel, label: 'Aceptable', description: '5 puntos' },
  { value: 'malo' as AnswerLevel, label: 'Malo', description: '0 puntos' },
];

export default function DiagnosisInProgress() {
  const { categoryId: categoriaId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { state, setAnswer } = useDiagnosis();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localAnswers, setLocalAnswers] = useState<Record<string, Answer>>({});
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const mergedAnswers = useMemo(() => {
    const fromContext: Record<string, Answer> = {};
    questions.forEach((q) => {
      if (state.answers[q.id]) {
        fromContext[q.id] = state.answers[q.id];
      }
    });
    return { ...fromContext, ...localAnswers };
  }, [questions, state.answers, localAnswers]);

  useEffect(() => {
    if (!state.diagnostico_id || !categoriaId) {
      navigate('/secciones');
      return;
    }

    getPreguntas(categoriaId)
      .then((qs) => {
        setQuestions(qs);
        // Recover from localStorage on reload
        const saved = localStorage.getItem(`diagnostico_${state.diagnostico_id}_answers`);
        if (saved) {
          try {
            const parsed = JSON.parse(saved) as Record<string, Answer>;
            setLocalAnswers(parsed);
          } catch { /* ignore */ }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [state.diagnostico_id, categoriaId, navigate]);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = mergedAnswers[currentQuestion?.id];

  const handleAnswer = async (nivel: AnswerLevel) => {
    if (!currentQuestion || !state.diagnostico_id) return;

    const answer: Answer = {
      pregunta_id: currentQuestion.id,
      nivel,
      observaciones: localAnswers[currentQuestion.id]?.observaciones || '',
    };

    setLocalAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));

    setAnswer(currentQuestion.id, answer);

    setSaving(true);
    try {
      await saveRespuesta({
        pregunta_id: currentQuestion.id,
        diagnostico_id: state.diagnostico_id,
        nivel,
        observaciones: answer.observaciones,
      });
      setLastSaved(new Date());
    } catch {
      // Silently fail - answer is saved locally
    } finally {
      setSaving(false);
    }
  };

  const handleObservations = (text: string) => {
    if (!currentQuestion) return;
    setLocalAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        pregunta_id: currentQuestion.id,
        nivel: prev[currentQuestion.id]?.nivel || 'optimo',
        observaciones: text,
      },
    }));
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleComplete = () => {
    navigate('/secciones');
  };

  // Auto-save to localStorage every 15 seconds
  const saveToStorage = useCallback(() => {
    const hasAnswers = Object.keys(mergedAnswers).length > 0;
    if (hasAnswers && state.diagnostico_id) {
      localStorage.setItem(
        `diagnostico_${state.diagnostico_id}_answers`,
        JSON.stringify(mergedAnswers)
      );
      setLastSaved(new Date());
    }
  }, [mergedAnswers, state.diagnostico_id]);

  useEffect(() => {
    const interval = setInterval(saveToStorage, 15000);
    return () => clearInterval(interval);
  }, [saveToStorage]);

  // Warn before closing with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      const hasChanges = Object.keys(localAnswers).length > 0;
      if (hasChanges) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [localAnswers]);

  // Keyboard shortcuts: 1-9 jump to question, ArrowLeft/Right navigate
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key;
      if (key >= '1' && key <= '9') {
        const idx = parseInt(key) - 1;
        if (idx < questions.length) setCurrentIndex(idx);
      } else if (key === 'ArrowRight') {
        goNext();
      } else if (key === 'ArrowLeft') {
        goPrev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const answeredCount = questions.filter((q) => mergedAnswers[q.id]).length;
  const allAnswered = answeredCount === questions.length;
  const categoryPct = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  // Estimate: ~30 seconds per question
  const remainingQuestions = questions.length - answeredCount;
  const estimatedSeconds = remainingQuestions * 30;
  const estimatedMinutes = Math.ceil(estimatedSeconds / 60);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <p className="text-gray-500 dark:text-dark-text-secondary">No hay preguntas disponibles para esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Header
        title={state.categorias.find((c) => c.id === categoriaId)?.nombre || 'Diagnóstico'}
        showBack
        showProgress
        progressValue={answeredCount}
      />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        {/* Category progress bar */}
        <Card className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700 dark:text-dark-text-secondary">Progreso de categoria</span>
            <span className="font-bold text-primary">{categoryPct}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800/50">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${categoryPct}%` }}
            />
          </div>
          <AutoSaveIndicator saving={saving} lastSaved={lastSaved} />
        </Card>

        {/* Question indicators */}
        <div className="flex items-center justify-center gap-2" role="group" aria-label="Indicador de preguntas">
          {questions.map((q, idx) => {
            const isAnswered = !!mergedAnswers[q.id];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Pregunta ${idx + 1}: ${isAnswered ? 'respondida' : 'pendiente'}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-primary text-white ring-2 ring-primary/30'
                    : isAnswered
                    ? 'bg-success/10 text-success'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800/50 dark:text-gray-500'
                }`}
              >
                {isAnswered ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-3 w-3" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-dark-text-secondary">
          <span className="font-medium">
            PREGUNTA {currentIndex + 1} / {questions.length}
          </span>
          <div className="flex items-center gap-3">
            {remainingQuestions > 0 && (
              <span className="text-xs text-gray-400 dark:text-dark-text-secondary">
                ~{estimatedMinutes} min restante{estimatedMinutes !== 1 ? 's' : ''}
              </span>
            )}
            <span>{answeredCount}/{questions.length} respondidas</span>
          </div>
        </div>

        <Card className="space-y-6">
          <p className="text-base font-medium text-gray-900 dark:text-dark-text">
            {currentQuestion?.texto}
          </p>

          <RadioButtonGroup
            name={currentQuestion?.id || ''}
            options={ANSWER_OPTIONS}
            selected={currentAnswer?.nivel || null}
            onChange={handleAnswer}
          />

          <TextArea
            label="Observaciones"
            placeholder="Agrega observaciones adicionales..."
            value={currentAnswer?.observaciones || ''}
            onChange={(e) => handleObservations(e.target.value)}
          />
        </Card>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          {currentIndex === questions.length - 1 ? (
            <Button onClick={handleComplete}>
              <Check className="h-4 w-4" />
              {allAnswered ? 'Completar Seccion' : `Completar (${answeredCount}/${questions.length})`}
            </Button>
          ) : (
            <Button onClick={goNext}>
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
