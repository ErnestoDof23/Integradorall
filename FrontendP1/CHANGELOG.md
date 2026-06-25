# Changelog

## [1.0.0-sprint5-frontend-proy1] - 2026-06-24

### Added - Semana 5 Features (Consolidacion Final)

#### Modo Oscuro (Dark Mode)
- ThemeContext con persistencia en localStorage
- ThemeToggle (icono Luna/Sol) en Header de todas las paginas
- CSS variables dark mode (dark-bg, dark-surface, dark-card, dark-border, dark-text, dark-text-secondary)
- Deteccion automatica de preferencia del sistema (prefers-color-scheme)
- Soporte completo en 27 archivos: componentes UI, paginas, graficas

#### PDF Multi-idioma (Espanol / Ingles)
- Objeto de traducciones completo para ES y EN
- Parametro `lang` en `generatePDFManual()`
- Selector de idioma en pagina de Resultados
- Textos traducidos: titulo, categorias, score labels, recomendaciones, footer
- Fechas formateadas segun locale (es-MX / en-US)
- Nombre de archivo diferenciado (`diagnostico-nombre-en.pdf` para ingles)
- Tracking analytics con language parameter

#### Grafica de Evolucion
- Nueva pagina `/evolucion` (EvolutionChart.tsx)
- Grafica SVG lineal con area de relleno y gradiente
- Puntos interactivos con hover (muestra %, label, fecha)
- Estadisticas: promedio, maximo, minimo
- Lista historica detallada debajo de la grafica
- Deteccion de color por score (verde/amarillo/rojo)
- Empty state cuando no hay diagnosticos completados
- Acceso desde Dashboard via boton "Evolucion"

### Fixed - Bugs Semana 5
- Dark mode: todos los componentes responden al tema correctamente
- PDF Safari: configuracion allowTaint + imageTimeout para compatibilidad
- Share movil: fallback completo a clipboard + boton Copiar
- Progreso: persistencia de DiagnosisContext en localStorage
- TypeScript: 0 errores, ESLint: 0 errores

### UX/UI Improvements - Semana 5
- Transiciones suaves entre temas claro/oscuro
- Selector de idioma visual con icono Globe
- Skeleton loaders actualizados para dark mode
- Toast notifications con soporte dark mode
- Formularios (Input, Select, TextArea) con estilos dark
- Cards y botones con variantes oscuras
- Header sticky con ThemeToggle integrado
- LandingPage con gradientes adaptados al tema
- Login/Register con fondos adaptados al tema
- GaugeCircular con stroke adaptado al tema
- GraficaBarras con fondo de barras adaptado

### Documentation - Semana 5
- ACCEPTANCE_FINAL_SEMANA5.md - 74 pruebas de aceptacion
- DELIVERY_DOCS.md - documentacion de entrega completa
- ACTION_ITEMS.md - 10/11 items completados
- USER_GUIDE_COMPLETE_PROY1.md - guia de usuario consolidada
- REGRESSION_FINAL_SEMANA5.md - pruebas de regresion finales
- CHANGELOG.md - este archivo

---

## [1.0.0-semana5-frontend-proy1] - 2026-06-22

### Fixed - Bugs Criticos
- Progreso se pierde al recargar: persistir diagnostico_id en localStorage
- PDF no genera en Safari: configuracion html2canvas compatible con Safari
- Boton Compartir no funciona en movil: fallback a clipboard + boton Copiar

### Added - Semana 5 Features
- Indicador de tiempo estimado restante en cuestionario
- Permitir saltar preguntas y completar sin responder todas
- Boton "Copiar enlace" en ShareButtons
- Prefetch de recursos criticos en LandingPage
- Persistencia de DiagnosisContext en localStorage

### Documentation
- ACTION_ITEMS.md - tareas priorizadas
- REGRESSION_TEST_SEMANA5.md - 10 pruebas, 10/10 pasadas

---

## [1.0.0-sprint4-frontend-proy1] - 2026-06-22

### Added - Semana 4 Features
- **ShareButtons**: compartir diagnostico en LinkedIn, Twitter, WhatsApp y Web Share API
- **FavoriteButton**: marcar diagnosticos como favoritos con persistencia en localStorage
- **Filtro de favoritos**: toggle "Solo favoritos" en historial de diagnosticos
- **EncuestaSatisfaccion**: encuesta de 3 preguntas post-diagnostico (1-5 estrellas)
- **ResumenDiagnostico**: pre-visualizacion de respuestas antes de finalizar con checkbox de confirmacion
- **Perfil de usuario**: informacion basica del usuario autenticado
- **Historial completo** en `/historial` con badges de estado, scores, y acciones rapidas
- **ComparisonService**: comparar diagnosticos anteriores
- **EmailService**: notificaciones por email
- **Resultado detallado**: fortalezas, areas de mejora, recomendaciones por categoria
- **Question indicators**: puntos de progreso por pregunta (respondida/pendiente/actual)
- **AutoSaveIndicator**: estado visual de guardado ("Guardando..." / "Guardado HH:MM")
- **beforeunload warning**: proteccion contra cierre con cambios sin guardar
- **Recuperacion de progreso**: respuestas restauradas desde localStorage al recargar

### Fixed - Bugs Semana 4
- Backend response format: todos los endpoints retornan datos directos (no wrapped objects)
- Niveles de respuesta: optimo/aceptable/malo (antes: cumple/cumple_parcial/no_cumple)
- `/finalizar` retorna DiagnosisResult completo con categorias y proyecto_nombre
- `/categorias/:id/preguntas` retorna array directo
- Proyecto campos opcionales con defaults (cliente, fecha, ciudad, tipo)
- Proxy Vite apuntaba a puerto incorrecto (corregido a localhost:3000)
- Mock mode residual eliminado de api.ts

### UX/UI Improvements
- Result chunk optimizado: 614KB -> 15KB (dynamic import jsPDF + html2canvas)
- jsPDF y html2canvas cargados bajo demanda (solo al descargar PDF)
- Toast notifications con aria-live para accesibilidad
- Focus-visible en todos los elementos interactivos
- Skeleton loaders en todas las paginas
- Empty states con CTAs en Dashboard e Historial
- Responsive design optimizado para movil
- ErrorBoundary global con pagina de fallback
- Skip link para navegacion por teclado

### Changed
- Auto-save interval: 30s -> 15s
- Bundle optimizado: chunks por pagina con React.lazy + Suspense
- Vite proxy apunta a localhost:3000 (backend)

### Documentation
- ACCEPTANCE_FINAL.md - 52 pruebas de aceptacion finales
- USER_GUIDE_COMPLETE.md - guia consolidada completa
- DEMO_SCRIPT_SPRINT2.md - script de demo 5 minutos
- REGRESSION_FINAL_SEMANA4.md - regresion final semana 4
- CHANGELOG.md - este archivo

---

## [1.0.0-sprint2-frontend] - 2026-06-18

### Added - Sprint 2 Features
- ShareButtons: compartir en LinkedIn, Twitter, WhatsApp y Web Share API
- FavoriteButton: marcar diagnosticos como favoritos con persistencia en localStorage
- Filtro de favoritos en historial de diagnosticos
- EncuestaSatisfaccion: encuesta de 3 preguntas post-diagnostico
- ResumenDiagnostico: pre-visualizacion antes de finalizar con checkbox de confirmacion

### Performance (Sprint 2)
- Result chunk: 614KB -> 15KB (dynamic import de jsPDF + html2canvas)
- jsPDF y html2canvas se cargan solo cuando el usuario descarga PDF
- Bundle principal: 314KB gzip: 102KB

---

## [1.0.0-semana3] - 2026-06-11

### Added
- Login y registro de usuarios
- Dashboard con CRUD de proyectos
- Cuestionario con 5 categorias y 15 preguntas
- Gauge circular animado para resultado global
- Grafica de barras por categoria
- Generacion y descarga de PDF (local y servidor)
- Historial de diagnosticos
- Confirmation dialog antes de finalizar diagnostico
- Auto-save a localStorage cada 30 segundos
- Toast de notificaciones (success, error, info)
- Error Boundary global con pagina de fallback
- Skip navigation link para accesibilidad
- Focus visible con outline personalizado
- ARIA labels en botones y formularios
- aria-live en notificaciones dinamicas
- Contraste de colores WCAG 2.1 AA (4.5:1)
- Service worker con stale-while-revalidate
- PWA con manifest.json instalable
- React Helmet con titulos dinamicos por pagina
- Code splitting con React.lazy para todas las paginas
- Memoizacion en GraficaBarras, GraficaCategorias, GaugeCircular
- Bundle analysis con rollup-plugin-visualizer
- Proteccion contra envio duplicado de formularios
- beforeunload para cambios sin guardar
- Responsive design (mobile, tablet, desktop)
- prefers-reduced-motion respetado

### Changed
- API limpia sin mocks, conecta a backend real via proxy
- Colores oscurecidos para cumplir contraste AA
- Layout optimizado con lazy loading (main bundle: 934KB -> 313KB)

### Documentation
- USER_GUIDE.md - guia de usuario completa
- ACCEPTANCE_TEST.md - escenarios de prueba
- DEMO_SCRIPT.md - script de demostracion
- CHECKLIST_ENTREGA.md - checklist de entrega
- CHANGELOG.md - este archivo
- .env.example - variables de entorno documentadas

### Deploy
- vercel.json configurado
- netlify.toml configurado
- Build de produccion funcional
