# Frontend - Diagnostico Inmobiliario

## Stack tecnologico
- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Axios (HTTP client)
- React Router v7
- Lucide React (iconos)
- jsPDF + html2canvas (generacion de PDF)
- react-helmet-async (SEO)

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre http://localhost:5173

## Build de produccion

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/              # Componentes base (Button, Card, Input, Select, etc.)
│   ├── ErrorBoundary.tsx
│   ├── GraficaBarras.tsx
│   ├── GraficaCategorias.tsx
│   ├── GaugeCircular.tsx
│   ├── ProtectedRoute.tsx
│   └── SkipLink.tsx
├── hooks/
│   ├── useAuth.tsx       # Context de autenticacion
│   └── useDiagnosis.tsx  # Context de diagnostico
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── PropertyData.tsx
│   ├── Sections.tsx
│   ├── DiagnosisInProgress.tsx
│   ├── Result.tsx
│   └── HistorialDiagnosticos.tsx
├── services/
│   ├── api.ts            # Axios + endpoints
│   └── pdfGenerator.ts   # Generacion de PDF
├── types/
│   └── index.ts          # Interfaces TypeScript
├── App.tsx
├── main.tsx
└── index.css
```

## Features

### Funcionalidad
- Login y registro de usuarios
- CRUD de proyectos
- Cuestionario con 5 categorias y 15 preguntas
- Gauge circular animado
- Grafica de barras por categoria
- Generacion y descarga de PDF
- Historial de diagnosticos
- Auto-save cada 30 segundos

### Performance
- Code splitting con React.lazy
- Memoizacion en componentes pesados
- Service worker con stale-while-revalidate
- Bundle analysis con rollup-plugin-visualizer

### Accesibilidad (WCAG 2.1 AA)
- Skip navigation link
- Focus visible con outline personalizado
- ARIA labels en botones y formularios
- Contraste de colores >= 4.5:1
- prefers-reduced-motion

### PWA
- manifest.json instalable
- Service worker para offline

### SEO
- React Helmet con titulos dinamicos
- Meta descripciones por pagina

## Cuenta demo
- **Email**: demo@accesibilidad.com
- **Contrasena**: demo123

## Deploy
- Vercel: vercel.json configurado
- Netlify: netlify.toml configurado

## API
El frontend conecta al backend via proxy `/api` -> `localhost:3001`.

Para production, configurar `VITE_API_URL` en el hosting.

## Documentacion
- USER_GUIDE.md - Guia de usuario
- ACCEPTANCE_TEST.md - Pruebas de aceptacion
- REGRESSION_FRONTEND.md - Pruebas de regresion
- CHECKLIST_ENTREGA.md - Checklist de entrega
- DEMO_SCRIPT.md - Script de demostracion
- CHANGELOG.md - Historial de cambios
