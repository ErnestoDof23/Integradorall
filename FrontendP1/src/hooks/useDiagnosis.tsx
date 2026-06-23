/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type {
  Property,
  Categoria,
  Answer,
  DiagnosisResult,
  DiagnosisState,
} from '../types';

const DIAGNOSIS_STORAGE_KEY = 'diagnosis_context';

function loadSavedState(): Partial<DiagnosisState> {
  try {
    const saved = localStorage.getItem(DIAGNOSIS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        diagnostico_id: parsed.diagnostico_id || null,
        proyecto_id: parsed.proyecto_id || null,
        categorias: parsed.categorias || [],
      };
    }
  } catch { /* ignore */ }
  return {};
}

function saveStateToStorage(state: DiagnosisState) {
  try {
    localStorage.setItem(
      DIAGNOSIS_STORAGE_KEY,
      JSON.stringify({
        diagnostico_id: state.diagnostico_id,
        proyecto_id: state.proyecto_id,
        categorias: state.categorias,
      })
    );
  } catch { /* ignore */ }
}

interface DiagnosisContextValue {
  state: DiagnosisState;
  setProyectoId: (id: string) => void;
  setDiagnosticoId: (id: string) => void;
  setProperty: (property: Property) => void;
  setCategorias: (categorias: Categoria[]) => void;
  setAnswer: (questionId: string, answer: Answer) => void;
  setCurrentCategoria: (id: string | null) => void;
  setResult: (result: DiagnosisResult) => void;
  reset: () => void;
  progress: number;
}

const saved = loadSavedState();
const initial: DiagnosisState = {
  proyecto_id: saved.proyecto_id || null,
  diagnostico_id: saved.diagnostico_id || null,
  property: null,
  categorias: saved.categorias || [],
  answers: {},
  currentCategoriaId: null,
  result: null,
};

const DiagnosisContext = createContext<DiagnosisContextValue | null>(null);

export function DiagnosisProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DiagnosisState>(initial);

  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  const setProyectoId = useCallback(
    (id: string) => setState((s) => ({ ...s, proyecto_id: id })),
    []
  );

  const setDiagnosticoId = useCallback(
    (id: string) => setState((s) => ({ ...s, diagnostico_id: id })),
    []
  );

  const setProperty = useCallback(
    (property: Property) => setState((s) => ({ ...s, property })),
    []
  );

  const setCategorias = useCallback(
    (categorias: Categoria[]) => setState((s) => ({ ...s, categorias })),
    []
  );

  const setAnswer = useCallback(
    (questionId: string, answer: Answer) =>
      setState((s) => ({
        ...s,
        answers: { ...s.answers, [questionId]: answer },
      })),
    []
  );

  const setCurrentCategoria = useCallback(
    (id: string | null) =>
      setState((s) => ({ ...s, currentCategoriaId: id })),
    []
  );

  const setResult = useCallback(
    (result: DiagnosisResult) => setState((s) => ({ ...s, result })),
    []
  );

  const reset = useCallback(() => {
    localStorage.removeItem(DIAGNOSIS_STORAGE_KEY);
    setState({
      proyecto_id: null,
      diagnostico_id: null,
      property: null,
      categorias: [],
      answers: {},
      currentCategoriaId: null,
      result: null,
    });
  }, []);

  const totalAnswered = Object.keys(state.answers).length;
  const totalQuestions = state.categorias.reduce(
    (acc, c) => acc + c.total_preguntas,
    0
  );
  const progress = totalQuestions > 0 ? (totalAnswered / totalQuestions) * 100 : 0;

  return (
    <DiagnosisContext.Provider
      value={{
        state,
        setProyectoId,
        setDiagnosticoId,
        setProperty,
        setCategorias,
        setAnswer,
        setCurrentCategoria,
        setResult,
        reset,
        progress,
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
}

export function useDiagnosis() {
  const ctx = useContext(DiagnosisContext);
  if (!ctx) throw new Error('useDiagnosis must be used within DiagnosisProvider');
  return ctx;
}
