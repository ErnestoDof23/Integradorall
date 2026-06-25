import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Download,
  Share2,
  RotateCcw,
  Loader2,
  Home,
  AlertCircle,
  FileText,
  Globe,
} from 'lucide-react';
import { Button, Card, Header } from '../components/ui';
import { useToast } from '../components/ui/Toast';
import GaugeCircular from '../components/GaugeCircular';
import GraficaBarras from '../components/GraficaBarras';
import { useDiagnosis } from '../hooks/useDiagnosis';
import {
  getResultadoDetallado,
  downloadReport,
  type ResultadoDetallado,
} from '../services/api';
import { trackEvent } from '../services/analytics';
import { generatePDFManual } from '../services/pdfGenerator';
import { SCORE_MAP } from '../types';
import type { DiagnosisResult, CategoryResult } from '../types';

function getRecommendation(pct: number): string {
  if (pct >= 80) return 'El inmueble cumple con estandares adecuados. Se recomienda mantener las condiciones actuales.';
  if (pct >= 60) return 'El inmueble requiere mejoras menores. Se recomienda atender las areas marcadas como Malo.';
  if (pct >= 40) return 'El inmueble presenta areas que requieren atencion urgente. Se recomienda planificar renovaciones.';
  return 'El inmueble presenta condiciones criticas que requieren intervencion inmediata.';
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 dark:bg-gray-700 ${className}`} />;
}

function ResultSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="flex flex-col items-center space-y-4 py-10">
        <Skeleton className="h-40 w-40 rounded-full" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </Card>
      <Card className="space-y-4">
        <Skeleton className="h-5 w-40" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </Card>
    </div>
  );
}

export default function Result() {
  const navigate = useNavigate();
  const { state, reset } = useDiagnosis();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [detallado, setDetallado] = useState<ResultadoDetallado | null>(null);
  const [loadError, setLoadError] = useState('');
  const [pdfLanguage, setPdfLanguage] = useState<'es' | 'en'>('es');

  useEffect(() => {
    if (!state.diagnostico_id) {
      navigate('/datos-inmueble');
      return;
    }

    getResultadoDetallado(state.diagnostico_id)
      .then((res) => {
        setDetallado(res);
        setLoading(false);
      })
      .catch(() => {
        setLoadError('No se pudo cargar el resultado del backend.');
        setLoading(false);
      });
  }, [state.diagnostico_id, navigate]);

  const fallbackResult = useMemo<ResultadoDetallado | null>(() => {
    if (detallado) return null;

    const answers = Object.values(state.answers);
    const categories: CategoryResult[] = state.categorias.map((cat) => {
      const catAnswers = answers.filter((a) =>
        a.pregunta_id.startsWith(cat.id.substring(0, 2))
      );
      const catScore = catAnswers.reduce((acc, a) => acc + SCORE_MAP[a.nivel], 0);
      const catMax = catAnswers.length * 10;
      return {
        categoria_id: cat.id,
        nombre: cat.nombre,
        score: catScore,
        max_score: catMax,
        porcentaje: catMax > 0 ? Math.round((catScore / catMax) * 100) : 0,
      };
    });

    const totalScore = categories.reduce((acc, c) => acc + c.score, 0);
    const maxScore = categories.reduce((acc, c) => acc + c.max_score, 0);
    const porcentaje = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    return {
      diagnostico_id: state.diagnostico_id || '',
      proyecto_nombre: state.property?.nombre || 'Sin nombre',
      score_total: totalScore,
      max_score: maxScore,
      porcentaje,
      categorias: categories,
      recomendacion: getRecommendation(porcentaje),
      completed_at: new Date().toISOString(),
    };
  }, [detallado, state.answers, state.categorias, state.property, state.diagnostico_id]);

  const result: DiagnosisResult | null = detallado || fallbackResult;

  const handleDownloadPDF = async () => {
    if (!result) return;
    setGeneratingPdf(true);
    try {
      await generatePDFManual(result, pdfLanguage);
      trackEvent('pdf_download', { method: 'client', diagnostico_id: result.diagnostico_id, language: pdfLanguage });
      showToast('PDF generado correctamente', 'success');
    } catch {
      showToast('Error al generar el PDF', 'error');
    } finally {
      setGeneratingPdf(false);
    }
  };

  const handleDownloadServer = async () => {
    if (!state.diagnostico_id) return;
    setDownloading(true);
    try {
      const blob = await downloadReport(state.diagnostico_id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diagnostico-${result?.proyecto_nombre || 'reporte'}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Reporte descargado', 'success');
    } catch {
      showToast('Error al descargar el reporte del servidor', 'error');
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    const publicUrl = `${window.location.origin}/resultado?public=true&id=${result.diagnostico_id}`;
    const text = `Diagnostico: ${result.proyecto_nombre} - Score: ${result.porcentaje}% - Ver resultado: ${publicUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Diagnostico - ${result.proyecto_nombre}`,
          text,
          url: publicUrl,
        });
        showToast('Compartido correctamente', 'success');
        trackEvent('share', { method: 'web_share', diagnostico_id: result.diagnostico_id });
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(publicUrl);
        showToast('Enlace copiado al portapapeles', 'success');
      } catch {
        showToast('No se pudo compartir', 'error');
      }
    }
  };

  const handleRestart = () => {
    reset();
    navigate('/datos-inmueble');
  };

  const handleBackToDashboard = () => {
    reset();
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
        <Header title="Resultado del Diagnostico" showBack />
        <main id="main-content" className="mx-auto max-w-3xl px-4 py-6">
          <ResultSkeleton />
        </main>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark-bg px-4">
        <Card className="max-w-md space-y-4 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-danger" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">No se pudo cargar el resultado</h2>
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{loadError || 'Intenta de nuevo mas tarde.'}</p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" onClick={handleBackToDashboard}>
              Volver al Dashboard
            </Button>
            <Button onClick={() => window.location.reload()}>Reintentar</Button>
          </div>
        </Card>
      </div>
    );
  }

  const grafData = result.categorias.map((c) => ({
    label: c.nombre,
    value: c.porcentaje,
    max: 100,
    sublabel: `${c.score}/${c.max_score}`,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Helmet>
        <title>Resultados | {result.proyecto_nombre}</title>
        <meta name="description" content={`Resultado del diagnostico de ${result.proyecto_nombre}: ${result.porcentaje}% de cumplimiento`} />
      </Helmet>
      <Header title="Resultado del Diagnostico" showBack />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        <Card className="flex flex-col items-center space-y-4 py-8">
          <GaugeCircular pct={result.porcentaje} />
          <div className="text-center">
            <span className="text-3xl" role="img" aria-label="Calificacion">
              {result.porcentaje >= 80 ? '\u{1F7E2}' : result.porcentaje >= 50 ? '\u{1F7E1}' : '\u{1F534}'}
            </span>
            <p className="text-base font-medium text-gray-900 dark:text-dark-text">{result.proyecto_nombre}</p>
            <p className="mt-1 text-xs text-gray-400 dark:text-dark-text-secondary">
              {result.score_total} / {result.max_score} puntos
            </p>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-dark-text">Resultados por Categoria</h3>
          <GraficaBarras data={grafData} />
        </Card>

        {detallado?.recomendaciones_categoria && detallado.recomendaciones_categoria.length > 0 && (
          <Card className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-dark-text">Recomendaciones por Categoria</h3>
            <ul className="space-y-2">
              {detallado.recomendaciones_categoria.map((r) => (
                <li key={r.categoria_id} className="flex items-start gap-2 text-sm text-gray-700 dark:text-dark-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <div>
                    <span className="font-medium">{r.nombre}:</span> {r.recomendacion}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {detallado?.fortalezas && detallado.fortalezas.length > 0 && (
          <Card className="space-y-2 border-l-4 border-l-success">
            <h3 className="font-semibold text-success">Fortalezas</h3>
            <ul className="space-y-1">
              {detallado.fortalezas.map((f, i) => (
                <li key={i} className="text-sm text-gray-700 dark:text-dark-text-secondary">+ {f}</li>
              ))}
            </ul>
          </Card>
        )}

        {detallado?.areas_mejora && detallado.areas_mejora.length > 0 && (
          <Card className="space-y-2 border-l-4 border-l-warning">
            <h3 className="font-semibold text-warning">Areas de mejora</h3>
            <ul className="space-y-1">
              {detallado.areas_mejora.map((a, i) => (
                <li key={i} className="text-sm text-gray-700 dark:text-dark-text-secondary">- {a}</li>
              ))}
            </ul>
          </Card>
        )}

        <Card className="space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-dark-text">Recomendacion General</h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-dark-text-secondary">{result.recomendacion}</p>
        </Card>

        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-dark-text">Descargar PDF</h3>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500 dark:text-dark-text-secondary" />
              <select
                value={pdfLanguage}
                onChange={(e) => setPdfLanguage(e.target.value as 'es' | 'en')}
                className="rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface dark:text-dark-text px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Idioma del PDF"
              >
                <option value="es">Espanol</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" onClick={handleDownloadPDF} disabled={generatingPdf} className="flex-1">
              {generatingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
              {generatingPdf ? 'Generando...' : `Descargar PDF (${pdfLanguage === 'es' ? 'ES' : 'EN'})`}
            </Button>
            <Button variant="outline" onClick={handleDownloadServer} disabled={downloading} className="flex-1">
              {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {downloading ? 'Descargando...' : 'Reporte Servidor'}
            </Button>
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" onClick={handleShare} className="flex-1">
            <Share2 className="h-4 w-4" />
            Compartir PDF
          </Button>
          <Button variant="secondary" onClick={handleRestart} className="flex-1">
            <RotateCcw className="h-4 w-4" />
            Nuevo Diagnostico
          </Button>
        </div>

        <Button variant="outline" onClick={handleBackToDashboard} className="w-full">
          <Home className="h-4 w-4" />
          Volver al Dashboard
        </Button>
      </main>
    </div>
  );
}
