# Changelog

## [1.0.0-sprint2-frontend] - 2026-06-18

### Added - Sprint 2 Features
- ShareButtons: compartir en LinkedIn, Twitter, WhatsApp y Web Share API
- FavoriteButton: marcar diagnosticos como favoritos con persistencia en localStorage
- Filtro de favoritos en historial de diagnosticos
- EncuestaSatisfaccion: encuesta de 3 preguntas post-diagnostico
- ResumenDiagnostico: pre-visualizacion antes de finalizar con checkbox de confirmacion
- Perfil de usuario con informacion basica
- Historial de diagnosticos completo (/historial)
- ComparisonService: comparar diagnosticos anteriores
- EmailService: notificaciones por email
- Resultado detallado: fortalezas, areas de mejora, recomendaciones por categoria
- React Helmet async con titulos y meta descriptions dinamicos por pagina
- SEO: meta tags optimizados en Dashboard, Result, Historial
- Preferencias de movimiento reducido (prefers-reduced-motion)
- Question indicators: puntos de progreso por pregunta (respondida/pendiente/actual)
- AutoSaveIndicator con estado visual de guardado
- beforeunload warning para cambios sin guardar
- Recuperacion de progreso desde localStorage en recarga de pagina

### Fixed (Backend)
- Response format: todos los endpoints retornan datos directos (no wrapped objects)
- Niveles de respuesta: optimo/aceptable/malo (antes: cumple/cumple_parcial/no_cumple)
- /finalizar retorna DiagnosisResult completo con categorias y proyecto_nombre
- /categorias/:id/preguntas retorna array directo
- Proyecto campos opcionales con defaults (cliente, fecha, ciudad, tipo)

### Changed
- Auto-save interval: 30s -> 15s
- Bundle optimizado: chunks por pagina con React.lazy + Suspense
- Vite proxy apunta a localhost:3000 (backend)

### Documentation
- ACCEPTANCE_FINAL.md - 52 pruebas de aceptacion finales
- USER_GUIDE_FINAL.md - guia completa con redes sociales, favoritos, perfil
- DEMO_SCRIPT_SPRINT2.md - script de demo 5 minutos
- REGRESSION_FRONTEND.md - regresion con 42 casos

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
