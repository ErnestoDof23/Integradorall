# Documentacion de Entrega - Frontend Proyecto 1

**Fecha:** 24 de junio de 2026
**Version:** v1.0.0-final-frontend-proy1
**Proyecto:** Diagnostico Inmobiliario

---

## 1. Resumen de Funcionalidades

### Core
- **Autenticacion**: Registro, login, JWT, perfil de usuario
- **Dashboard**: CRUD de proyectos con validacion
- **Diagnostico**: 5 categorias, 3 preguntas cada una (15 total), niveles optimo/aceptable/malo
- **Auto-save**: Guardado automatico cada 15 segundos + persistencia en localStorage
- **Resultado**: Gauge circular, grafica de barras, recomendaciones, fortalezas, areas de mejora
- **Historial**: Lista de diagnosticos, favoritos, filtrado
- **Evolucion**: Grafica de progreso temporal de diagnosticos
- **PDF**: Generacion client-side con jsPDF + html2canvas, multi-idioma (ES/EN)
- **Compartir**: Web Share API, LinkedIn, Twitter, WhatsApp, clipboard fallback
- **Feedback**: Widget flotante con rating 1-5
- **Onboarding**: Tour guiado en primera visita (react-joyride)
- **Admin Dashboard**: Estadisticas de eventos y conversion

### Accesibilidad (WCAG 2.1 AA)
- Navegacion por teclado completa
- SkipLink para saltar al contenido
- aria-label, aria-describedby, aria-live en componentes
- focus-visible para navegacion por teclado
- Contraste >= 4.5:1 en todos los textos
- respeta prefers-reduced-motion

### Performance
- React.lazy + Suspense en todas las paginas
- Dynamic import para jsPDF/html2canvas (chunk splitting)
- Memoizacion en componentes de graficas
- Service Worker con estrategia stale-while-revalidate
- Bundle optimizado (< 500KB gzip)

### Temas
- Modo claro/oscuro con persistencia en localStorage
- Deteccion automatica de preferencia del sistema
- Transiciones suaves entre temas

---

## 2. Stack Tecnico

| Tecnologia | Version | Uso |
|-----------|---------|-----|
| React | 19 | UI framework |
| TypeScript | 5 | Type safety |
| Vite | 8 | Build tool |
| Tailwind CSS | 4 | Styling (CSS-based config) |
| React Router | 7 | Client-side routing |
| Axios | 1.x | HTTP client |
| Lucide React | 0.400+ | Icons |
| jsPDF | 2.x | PDF generation (client-side) |
| html2canvas | 1.x | HTML to canvas for PDF |
| react-helmet-async | 2.x | SEO meta tags |
| react-joyride | 2.x | Onboarding tour |

---

## 3. Estructura del Proyecto

```
FrontendP1/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/                # Componentes UI reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── RadioButtonGroup.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── TextArea.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── index.ts
│   │   ├── AutoSaveIndicator.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── FavoriteButton.tsx
│   │   ├── FeedbackButton.tsx
│   │   ├── GaugeCircular.tsx
│   │   ├── GraficaBarras.tsx
│   │   ├── OnboardingTour.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── ResumenDiagnostico.tsx
│   │   ├── ShareButtons.tsx
│   │   ├── SkipLink.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   ├── useDiagnosis.tsx
│   │   └── useTheme.tsx
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── HistorialDiagnosticos.tsx
│   │   ├── PropertyData.tsx
│   │   ├── Sections.tsx
│   │   ├── DiagnosisInProgress.tsx
│   │   ├── Result.tsx
│   │   ├── EvolutionChart.tsx
│   │   └── AdminDashboard.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── analytics.ts
│   │   └── pdfGenerator.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── vercel.json
├── netlify.toml
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 4.Instrucciones de Instalacion

### Prerrequisitos
- Node.js >= 18
- npm o yarn
- Backend MySQL corriendo en localhost:3000

### Instalacion
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd FrontendP1

# Instalar dependencias
npm install --cache /tmp/.npm-cache

# Iniciar en modo desarrollo
npm run dev

# El frontend estara disponible en http://localhost:5173
```

### Build para Produccion
```bash
# Compilar TypeScript
npm run build

# Preview del build
npm run preview
```

### Lint
```bash
npm run lint
```

---

## 5. Instrucciones de Despliegue

### Vercel
1. Conectar el repositorio a Vercel
2. Configurar:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install --cache /tmp/.npm-cache`
3. Variables de entorno: Ninguna necesaria (proxy en vite.config.ts)

### Netlify
1. Conectar el repositorio a Netlify
2. Configurar:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Archivo `netlify.toml` ya incluido

### Docker
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --cache /tmp/.npm-cache
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## 6. Variables de Entorno

El frontend no requiere variables de entorno. El proxy API esta configurado en `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

---

## 7. Backend Requerido

El frontend espera un backend en `localhost:3000` con los siguientes endpoints:

### Auth
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil (requiere JWT)

### Proyectos
- `GET /api/proyectos` - Listar
- `POST /api/proyectos` - Crear
- `DELETE /api/proyectos/:id` - Eliminar

### Diagnosticos
- `GET /api/diagnosticos` - Listar
- `POST /api/diagnosticos` - Crear
- `GET /api/diagnosticos/:id/categorias` - Categorias
- `GET /api/diagnosticos/:id/respuestas` - Respuestas
- `POST /api/diagnosticos/:id/finalizar` - Finalizar
- `GET /api/diagnosticos/:id/resultado-detallado` - Resultado detallado
- `GET /api/diagnosticos/:id/reporte` - Reporte

### Categorias
- `GET /api/categorias/:id/preguntas` - Preguntas por categoria

### Respuestas
- `POST /api/respuestas` - Guardar respuesta

### Feedback
- `POST /api/feedback` - Enviar feedback
- `GET /api/feedback/stats` - Estadisticas
- `POST /api/feedback/analytics` - Eventos de analytics
- `GET /api/feedback/analytics` - Listar eventos

---

## 8. Cuenta de Demostracion

- **Email:** demo@accesibilidad.com
- **Password:** demo123

---

## 9. Documentacion Adicional

| Archivo | Contenido |
|---------|-----------|
| `ACCEPTANCE_FINAL_SEMANA5.md` | Pruebas de aceptacion completas |
| `USER_GUIDE_COMPLETE.md` | Guia de usuario |
| `DEMO_SCRIPT_SPRINT2.md` | Script de demostracion |
| `CHANGELOG.md` | Historial de cambios |
| `README_FRONTEND.md` | Readme del frontend |
| `CHECKLIST_ENTREGA.md` | Checklist de entrega |

---

## 10. Contacto

- **Equipo:** Proyecto 1 - Diagnostico Inmobiliario
- **Version:** v1.0.0-final-frontend-proy1
- **Fecha:** 24 de junio de 2026
