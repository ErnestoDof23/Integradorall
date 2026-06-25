# Action Items - Semana 5

**Fecha:** 22 de junio de 2026
**Fuente:** Bugs reportados + feedback de usuarios

---

## Prioridad Critica

### BUG-001: Progreso se pierde al recargar pagina
- **Problema:** `state.diagnostico_id` se pierde al recargar porque el DiagnosisContext no persiste
- **Solucion:** Guardar `diagnostico_id` y `categoriaId` en localStorage, restaurar al cargar
- **Archivos:** `DiagnosisInProgress.tsx`, `hooks/useDiagnosis.tsx`
- **Estado:** COMPLETADO (Semana 4)

### BUG-002: PDF no genera en Safari
- **Problema:** html2canvas tiene problemas con Safari (WebGL, CORS)
- **Solucion:** Agregar configuracion especifica Safari, fallback a metodo alternativo
- **Archivos:** `services/pdfGenerator.ts`
- **Estado:** COMPLETADO (Semana 4)

### BUG-003: Boton Compartir no funciona en movil
- **Problema:** Web Share API no disponible en todos los navegadores moviles, fallback incompleto
- **Solucion:** Mejorar fallback con clipboard, mostrar opciones manuales en movil
- **Archivos:** `components/ShareButtons.tsx`
- **Estado:** COMPLETADO (Semana 4)

---

## Prioridad Alta

### FEAT-001: Indicador de tiempo estimado restante
- **Descripcion:** Mostrar "Tiempo estimado: X minutos" basado en preguntas respondidas
- **Archivos:** `DiagnosisInProgress.tsx`
- **Estado:** COMPLETADO (Semana 4)

### FEAT-002: Permitir saltar preguntas
- **Descripcion:** El usuario puede saltar preguntas y volver despues sin perder progreso
- **Archivos:** `DiagnosisInProgress.tsx`
- **Estado:** COMPLETADO (Semana 4)

### FEAT-004: Modo Oscuro
- **Descripcion:** Soporte completo de dark mode con toggle, persistencia y deteccion automatica del sistema
- **Archivos:** `hooks/useTheme.tsx`, `components/ThemeToggle.tsx`, `index.css`, todos los componentes y paginas
- **Estado:** COMPLETADO (Semana 5)

### FEAT-005: PDF Multi-idioma (ES/EN)
- **Descripcion:** Generar PDFs en espanol o ingles con selector de idioma en la pagina de resultados
- **Archivos:** `services/pdfGenerator.ts`, `pages/Result.tsx`
- **Estado:** COMPLETADO (Semana 5)

### FEAT-006: Grafica de Evolucion
- **Descripcion:** Nueva pagina que muestra la evolucion temporal de los puntajes de diagnostico
- **Archivos:** `pages/EvolutionChart.tsx`, `App.tsx`, `pages/Dashboard.tsx`
- **Estado:** COMPLETADO (Semana 5)

---

## Prioridad Media

### FEAT-003: Diagnostico rapido
- **Descripcion:** Modo con preguntas reducidas (1 por categoria = 5 preguntas total)
- **Archivos:** `PropertyData.tsx`, `Sections.tsx`, backend
- **Estado:** PENDIENTE (futuro)

### PERF-001: Optimizar carga de landing page
- **Descripcion:** Lazy loading de imagenes, prefetch de recursos criticos
- **Archivos:** `LandingPage.tsx`
- **Estado:** COMPLETADO (ya usa Suspense + lazy loading)

---

## Prioridad Baja

### DOC-001: Actualizar documentacion
- **Descripcion:** Reflejar nuevas features y correcciones
- **Archivos:** CHANGELOG.md, USER_GUIDE_COMPLETE.md
- **Estado:** COMPLETADO

---

## Resumen de Estado

| Item | Estado |
|------|--------|
| BUG-001 | COMPLETADO |
| BUG-002 | COMPLETADO |
| BUG-003 | COMPLETADO |
| FEAT-001 | COMPLETADO |
| FEAT-002 | COMPLETADO |
| FEAT-003 | PENDIENTE |
| FEAT-004 | COMPLETADO |
| FEAT-005 | COMPLETADO |
| FEAT-006 | COMPLETADO |
| PERF-001 | COMPLETADO |
| DOC-001 | COMPLETADO |

**Total completados:** 10/11
**Pendientes:** 1 (FEAT-003 - Diagnostico rapido, prioridad media)
