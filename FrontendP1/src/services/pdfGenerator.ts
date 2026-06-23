import type { DiagnosisResult } from '../types';

function getScoreLabel(pct: number): string {
  if (pct >= 80) return 'EXCELENTE';
  if (pct >= 60) return 'BUENO';
  if (pct >= 40) return 'REGULAR';
  return 'DEFICIENTE';
}

function getRecommendation(pct: number): string {
  if (pct >= 80) return 'El inmueble cumple con estandares adecuados. Se recomienda mantener las condiciones actuales.';
  if (pct >= 60) return 'El inmueble requiere mejoras menores. Se recomienda atender las areas marcadas como Malo.';
  if (pct >= 40) return 'El inmueble presenta areas que requieren atencion urgente. Se recomienda planificar renovaciones.';
  return 'El inmueble presenta condiciones criticas que requieren intervencion inmediata.';
}

export async function generatePDFFromElement(
  elementId: string,
  fileName: string
): Promise<void> {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ]);

  const element = document.getElementById(elementId);
  if (!element) throw new Error('Elemento no encontrado para generar PDF');

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    ...(isSafari && {
      width: element.scrollWidth,
      height: element.scrollHeight,
      logging: false,
      imageTimeout: 15000,
    }),
  });

  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
}

export async function generatePDFManual(data: DiagnosisResult): Promise<void> {
  const { default: jsPDF } = await import('jspdf');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let y = 20;

  // Header
  pdf.setFillColor(37, 99, 235);
  pdf.rect(0, 0, pageWidth, 45, 'F');

  // Border accent
  pdf.setFillColor(30, 64, 175);
  pdf.rect(0, 42, pageWidth, 3, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('REPORTE DE DIAGNOSTICO', pageWidth / 2, 18, { align: 'center' });
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Sistema de Diagnostico Inmobiliario', pageWidth / 2, 28, { align: 'center' });
  pdf.setFontSize(9);
  pdf.text(`Fecha: ${new Date().toLocaleDateString('es-MX')} | Hora: ${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`, pageWidth / 2, 36, { align: 'center' });

  y = 55;

  // Info del proyecto
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('INFORMACION DEL PROYECTO', 15, y);
  y += 8;

  pdf.setDrawColor(37, 99, 235);
  pdf.setLineWidth(0.8);
  pdf.line(15, y, 80, y);
  y += 6;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text(`Inmueble: ${data.proyecto_nombre}`, 15, y);
  y += 6;
  pdf.text(`Diagnostico ID: ${data.diagnostico_id}`, 15, y);
  y += 6;
  pdf.text(`Fecha de evaluacion: ${new Date(data.completed_at).toLocaleDateString('es-MX')}`, 15, y);
  y += 6;
  pdf.text(`Evaluador: Equipo de Diagnostico`, 15, y);
  y += 14;

  // Score general con sombra
  pdf.setFillColor(245, 247, 250);
  pdf.roundedRect(17, y + 2, pageWidth - 30, 35, 3, 3, 'F');
  pdf.setDrawColor(37, 99, 235);
  pdf.setLineWidth(1);
  pdf.roundedRect(15, y, pageWidth - 30, 35, 3, 3, 'S');

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('CALIFICACION GENERAL', pageWidth / 2, y + 10, { align: 'center' });

  pdf.setFontSize(32);
  const scoreColor: [number, number, number] = data.porcentaje >= 70 ? [22, 163, 74] : data.porcentaje >= 40 ? [217, 119, 6] : [220, 38, 38];
  pdf.setTextColor(...scoreColor);
  pdf.text(`${data.porcentaje}%`, pageWidth / 2, y + 25, { align: 'center' });

  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`${data.score_total} / ${data.max_score} puntos - ${getScoreLabel(data.porcentaje)}`, pageWidth / 2, y + 32, { align: 'center' });

  y += 45;

  // Resultados por categoria
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RESULTADOS POR CATEGORIA', 15, y);
  y += 4;

  pdf.setDrawColor(37, 99, 235);
  pdf.setLineWidth(0.8);
  pdf.line(15, y, 100, y);
  y += 8;

  // Header de tabla
  pdf.setFillColor(37, 99, 235);
  pdf.roundedRect(15, y, pageWidth - 30, 8, 2, 2, 'F');
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text('Categoria', 18, y + 5.5);
  pdf.text('Puntos', 110, y + 5.5);
  pdf.text('Maximo', 135, y + 5.5);
  pdf.text('Porcentaje', 160, y + 5.5);
  y += 10;

  // Filas
  pdf.setFont('helvetica', 'normal');
  data.categorias.forEach((cat, idx) => {
    if (idx % 2 === 0) {
      pdf.setFillColor(248, 250, 252);
      pdf.rect(15, y - 3, pageWidth - 30, 14, 'F');
    }

    pdf.setTextColor(0, 0, 0);
    pdf.text(cat.nombre, 18, y + 5);
    pdf.text(`${cat.score}`, 115, y + 5);
    pdf.text(`${cat.max_score}`, 140, y + 5);

    const catColor: [number, number, number] = cat.porcentaje >= 70 ? [22, 163, 74] : cat.porcentaje >= 40 ? [217, 119, 6] : [220, 38, 38];
    pdf.setTextColor(...catColor);
    pdf.text(`${cat.porcentaje}%`, 165, y + 5);
    pdf.setTextColor(0, 0, 0);

    // Barra
    const barX = 18;
    const barWidth = pageWidth - 36;
    const barHeight = 3;
    const fillWidth = (cat.porcentaje / 100) * barWidth;

    pdf.setFillColor(220, 220, 220);
    pdf.roundedRect(barX, y + 7, barWidth, barHeight, 1, 1, 'F');
    pdf.setFillColor(...catColor);
    if (fillWidth > 0) {
      pdf.roundedRect(barX, y + 7, fillWidth, barHeight, 1, 1, 'F');
    }

    y += 14;
  });

  y += 8;

  // Recomendacion
  pdf.setFillColor(248, 250, 252);
  pdf.roundedRect(17, y + 2, pageWidth - 30, 25, 3, 3, 'F');
  pdf.setDrawColor(37, 99, 235);
  pdf.setLineWidth(0.5);
  pdf.roundedRect(15, y, pageWidth - 30, 25, 3, 3, 'S');

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(37, 99, 235);
  pdf.text('RECOMENDACION GENERAL', 20, y + 8);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(60, 60, 60);
  const lines = pdf.splitTextToSize(getRecommendation(data.porcentaje), pageWidth - 40);
  pdf.text(lines, 20, y + 15);

  // Footer
  const footerY = pageHeight - 15;
  pdf.setDrawColor(200, 200, 200);
  pdf.line(15, footerY - 5, pageWidth - 15, footerY - 5);

  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text(
    `Generado por Sistema de Diagnostico Inmobiliario | ${new Date().toLocaleDateString('es-MX')}`,
    pageWidth / 2,
    footerY,
    { align: 'center' }
  );

  pdf.save(`diagnostico-${data.proyecto_nombre || 'reporte'}.pdf`);
}
