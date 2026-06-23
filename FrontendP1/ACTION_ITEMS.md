# Action Items - Semana 5

**Fecha:** 22 de junio de 2026  
**Fuente:** Bugs reportados + feedback de usuarios

---

## Prioridad Critica

### BUG-001: Progreso se pierde al recargar pagina
- **Problema:** `state.diagnostico_id` se pierde al recargar porque el DiagnosisContext no persiste
- **Solucion:** Guardar `diagnostico_id` y `categoriaId` en localStorage, restaurar al cargar
- **Archivos:** `DiagnosisInProgress.tsx`, `hooks/useDiagnosis.tsx`
- **Estado:** EN PROCESO

### BUG-002: PDF no genera en Safari
- **Problema:** html2canvas tiene problemas con Safari (WebGL, CORS)
- **Solucion:** Agregar configuracion especifica Safari, fallback a metodo alternativo
- **Archivos:** `services/pdfGenerator.ts`
- **Estado:** EN PROCESO

### BUG-003: Boton Compartir no funciona en movil
- **Problema:** Web Share API no disponible en todos los navegadores moviles, fallback incompleto
- **Solucion:** Mejorar fallback con clipboard, mostrar opciones manuales en movil
- **Archivos:** `components/ShareButtons.tsx`
- **Estado:** EN PROCESO

---

## Prioridad Alta

### FEAT-001: Indicador de tiempo estimado restante
- **Descripcion:** Mostrar "Tiempo estimado: X minutos" basado en preguntas respondidas
- **Archivos:** `DiagnosisInProgress.tsx`
- **Estado:** PENDIENTE

### FEAT-002: Permitir saltar preguntas
- **Descripcion:** El usuario puede saltar preguntas y volver despues sin perder progreso
- **Archivos:** `DiagnosisInProgress.tsx`
- **Estado:** PENDIENTE

---

## Prioridad Media

### FEAT-003: Diagnostico rapido
- **Descripcion:** Modo con preguntas reducidas (1 por categoria = 5 preguntas total)
- **Archivos:** `PropertyData.tsx`, `Sections.tsx`, backend
- **Estado:** PENDIENTE

### PERF-001: Optimizar carga de landing page
- **Descripcion:** Lazy loading de imagenes, prefetch de recursos criticos
- **Archivos:** `LandingPage.tsx`
- **Estado:** PENDIENTE

---

## Prioridad Baja

### DOC-001: Actualizar documentacion
- **Descripcion:** Reflejar nuevas features y correcciones
- **Archivos:** CHANGELOG.md, USER_GUIDE_COMPLETE.md
- **Estado:** PENDIENTE
