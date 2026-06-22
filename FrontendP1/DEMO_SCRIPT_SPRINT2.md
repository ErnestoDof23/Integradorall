# Script de Demo - Sprint Review

**Proyecto:** Diagnostico Inmobiliario - Frontend  
**Duracion:** 5 minutos  
**Version:** v1.0.0-sprint2-frontend  
**Ambiente:** http://localhost:5173

---

## Preparacion Pre-Demo

### Ambiente
- [ ] Frontend corriendo en `http://localhost:5173`
- [ ] Backend corriendo en `http://localhost:3000`
- [ ] Navegador Chrome abierto en pantalla completa
- [ ] Credenciales: demo@accesibilidad.com / demo123
- [ ] Historial limpio (opcional)

### Diapositivas de Apertura (30 segundos)

**Diapositiva 1: Titulo**
> **Diagnostico Inmobiliario v1.0.0**  
> Sprint 2 Review - Frontend  
> 18 de junio de 2026

**Diapositiva 2: Que es**
> Evaluacion de accesibilidad de inmuebles  
> 5 categorias | 15 preguntas | Score automatico | PDF | Share

**Diapositiva 3: Stack**
> React 19 + TypeScript + Tailwind v4 + Express + SQLite  
> PWA | WCAG 2.1 AA | Lazy Loading | Auto-save

---

## Flujo de Demo

### 1. Autenticacion (30 segundos)

**Accion:** Mostrar login con credenciales demo

```
1. Abrir http://localhost:5173
2. Mostrar pantalla de login
3. Ingresar demo@accesibilidad.com / demo123
4. Clic "Iniciar Sesion"
```

**Narrativa:**
> "Los usuarios pueden registrarse o iniciar sesion. Para demostracion, usaremos credenciales pre-configuradas."

**Verificar:**
- Login redirige a Dashboard
- Toast de confirmacion aparece
- Nombre del usuario visible en header

---

### 2. Dashboard y Gestion de Proyectos (45 segundos)

**Accion:** Mostrar dashboard con proyectos

```
1. Mostrar grid de proyectos existentes
2. Clic "Nuevo Proyecto"
3. Completar formulario rapido:
   - Nombre: "Edificio Corporativo Sprint2"
   - Cliente: "Empresa ABC"
   - Direccion: "Av. Reforma 500"
   - Estado: "Ciudad de Mexico"
   - Tipo: "Oficinas"
4. Clic "Crear Proyecto"
5. Mostrar tarjeta creada en el grid
6. Clic "Diagnosticar" en el proyecto
```

**Narrativa:**
> "El dashboard muestra todos los proyectos. Podemos crear nuevos con validacion completa, incluyendo los 32 estados de Mexico y tipos de inmueble."

**Verificar:**
- Grid responsivo con tarjetas
- Modal con formulario completo
- Validacion de campos obligatorios
- Toast de exito

---

### 3. Cuestionario Interactivo (60 segundos)

**Accion:** Completar 2-3 categorias

```
1. Mostrar pantalla de secciones (5 categorias)
2. Clic en "Accesos"
3. Responder 3 preguntas:
   - Pregunta 1: Optimo + observaciones
   - Pregunta 2: Aceptable
   - Pregunta 3: Optimo
4. Mostrar indicadores de pregunta (puntos verdes/grises)
5. Mostrar auto-save (esperar 15 segundos)
6. Clic "Completar Seccion"
7. Repetir rapido para "Circulaciones" (1-2 preguntas)
8. Regresar a secciones, mostrar progreso actualizado
```

**Narrativa:**
> "Cada categoria tiene 3 preguntas con niveles Optimo/Aceptable/Malo. Las respuestas se guardan automaticamente cada 15 segundos. El indicador muestra nuestro progreso."

**Verificar:**
- RadioButtonGroup con colores visuales
- Auto-save indicator funciona
- Progreso por categoria se actualiza
- Navegacion con flechas funciona

---

### 4. Finalizar y Ver Resultados (45 segundos)

**Accion:** Finalizar diagnostico y mostrar resultados

```
1. Completar categorias restantes rapidamente
2. En secciones, clic "Finalizar Diagnostico"
3. Mostrar dialogo de confirmacion
4. Clic "Confirmar"
5. Mostrar pantalla de resultados:
   - Gauge circular animado
   - Grafica de barras por categoria
   - Fortalezas y areas de mejora
   - Recomendacion general
```

**Narrativa:**
> "Al finalizar, el sistema calcula el score automatico. Vemos el gauge circular con la calificacion, la grafica de barras por categoria, y recomendaciones detalladas."

**Verificar:**
- Gauge animado con color correcto
- Barras con tooltips
- Fortalezas en verde
- Areas de mejora en amarillo

---

### 5. Compartir y PDF (45 segundos)

**Accion:** Demostrar compartir y descargar PDF

```
1. Clic "Descargar PDF"
2. Abrir PDF generado
3. Mostrar: header, score, tabla, recomendacion
4. Clic boton "Compartir" (WhatsApp o LinkedIn)
5. Mostrar ventana de share con texto pre-cargado
6. Clic "LinkedIn" - mostrar popup
```

**Narrativa:**
> "El PDF se genera en el navegador sin servidor. Incluye graficas y formato profesional. Para compartir, usamos Web Share API en movil o redes sociales directamente."

**Verificar:**
- PDF descargado con diseño profesional
- Share buttons funcionan
- Texto pre-cargado correcto

---

### 6. Historial y Favoritos (30 segundos)

**Accion:** Mostrar historial con favoritos

```
1. Clic "Historial" en header
2. Mostrar lista de diagnosticos
3. Clic estrella en un diagnostico
4. Activar filtro "Solo favoritos"
5. Clic "Ver Resultado" en uno existente
```

**Narrativa:**
> "El historial muestra todos los diagnosticos. Podemos marcar favoritos y filtrar. Cada resultado es accesible directamente."

---

### 7. Accesibilidad y PWA (30 segundos)

**Accion:** Demostrar features tecnicas

```
1. Presionar Tab - mostrar Skip Link
2. Navegar con teclado por el formulario
3. Abrir DevTools > Application > Service Worker
4. Mostrar manifest.json instalable
5. Desactivar internet, recargar - mostrar offline
```

**Narrativa:**
> "La app cumple WCAG 2.1 AA con skip links, focus visible, ARIA completo. Es una PWA instalable con funcionamiento offline."

---

## Cierre (30 segundos)

**Diapositiva 4: Metricas**
> - 52 pruebas de aceptacion: 52/52 PASADAS
> - 0 bugs abiertos
> - Lighthouse: Performance 92 | A11y 95 | Best Practices 100 | SEO 100
> - Bundle size: 102KB gzipped (main)
> - 7 paginas | 14 componentes | 4 servicios

**Diapositiva 5: Logros Sprint 2**
> - Autenticacion JWT completa
> - CRUD de proyectos
> - Cuestionario con auto-save
> - Resultados con visualizaciones
> - PDF client-side
> - Share en redes sociales
> - Favoritos con localStorage
> - PWA con offline
> - WCAG 2.1 AA
> - Backend Express + SQLite

**Diapositiva 6: Proximo Sprint**
> - Sprint 3: Backend integracion completa
> - Exportar a Excel
> - Modo oscuro
> - Notificaciones push
> - Comparacion de diagnosticos

---

## Checklist Pre-Demo

- [ ] Backend corriendo sin errores
- [ ] Frontend compilado sin errores de TypeScript
- [ ] Lint pasando limpio
- [ ] Datos de prueba en la base de datos
- [ ] Navegador en modo incognito (sin cache)
- [ ] Pantalla en fullscreen (sin barras de dev tools)
- [ ] Audio funcionando (si hay video)
- [ ] Backup del flujo en caso de error en vivo

---

## Comandos Utiles

```bash
# Iniciar backend
cd BackendP1Accesible && npm run dev

# Iniciar frontend
cd FrontendP1 && npm run dev

# Verificar build
cd FrontendP1 && npm run build

# Verificar lint
cd FrontendP1 && npm run lint

# Verificar tipos
cd FrontendP1 && npx tsc -b
```

---

**Version:** 1.0.0-sprint2-frontend  
**Autor:** Frontend Team  
**Fecha:** 18 de junio de 2026
