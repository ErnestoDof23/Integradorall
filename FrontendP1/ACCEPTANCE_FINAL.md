# Pruebas de Aceptacion Finales - Sprint 2

**Proyecto:** Diagnostico Inmobiliario - Frontend  
**Fecha:** 18 de junio de 2026  
**Version:** v1.0.0-sprint2-frontend  
**Ambiente:** http://localhost:5173 (Frontend) + http://localhost:3000 (Backend)  
**Credenciales demo:** demo@accesibilidad.com / demo123

---

## 1. Autenticacion

### TC-AUTH-001: Login exitoso
- **Pasos:** Ir a `/login` > Ingresar `demo@accesibilidad.com` > Ingresar `demo123` > Clic "Iniciar Sesion"
- **Esperado:** Redirige a `/dashboard`, muestra nombre del usuario, toasts de exito
- **Estado:** PASADO

### TC-AUTH-002: Login con credenciales incorrectas
- **Pasos:** Ir a `/login` > Ingresar email incorrecto > Clic "Iniciar Sesion"
- **Esperado:** Toast de error "Credenciales incorrectas"
- **Estado:** PASADO

### TC-AUTH-003: Registro de nuevo usuario
- **Pasos:** Ir a `/register` > Completar nombre, email, password, confirmar password > Clic "Registrarse"
- **Esperado:** Cuenta creada, login automatico, redirige a `/dashboard`
- **Estado:** PASADO

### TC-AUTH-004: Registro con email existente
- **Pasos:** Ir a `/register` > Ingresar `demo@accesibilidad.com` > Clic "Registrarse"
- **Esperado:** Toast de error indicando email ya registrado
- **Estado:** PASADO

### TC-AUTH-005: Proteccion de rutas
- **Pasos:** Cerrar sesion > Ir directamente a `/dashboard`
- **Esperado:** Redirige a `/login`
- **Estado:** PASADO

### TC-AUTH-006: Logout
- **Pasos:** Clic en boton de cerrar sesion en el header
- **Esperado:** Limpia sesion, redirige a `/login`
- **Estado:** PASADO

---

## 2. Gestion de Proyectos

### TC-PROJ-001: Crear proyecto
- **Pasos:** Dashboard > Clic "Nuevo Proyecto" > Completar formulario (nombre, cliente, direccion, estado, ciudad, tipo, fecha) > Clic "Crear Proyecto"
- **Esperado:** Modal se cierra, proyecto aparece en la grilla, toast de exito
- **Estado:** PASADO

### TC-PROJ-002: Validacion de formulario
- **Pasos:** Clic "Nuevo Proyecto" > Dejar campos obligatorios vacios > Clic "Crear Proyecto"
- **Esperado:** Mensajes de error en campos requeridos, no se crea el proyecto
- **Estado:** PASADO

### TC-PROJ-003: Eliminar proyecto
- **Pasos:** Dashboard > Clic icono de eliminar en una tarjeta > Confirmar en dialogo
- **Esperado:** Proyecto eliminado de la grilla, toast de confirmacion
- **Estado:** PASADO

### TC-PROJ-004: Diagnosticar proyecto existente
- **Pasos:** Dashboard > Clic "Diagnosticar" en un proyecto
- **Esperado:** Navega a `/datos-inmueble` con datos pre-cargados del proyecto
- **Estado:** PASADO

### TC-PROJ-005: Estado vacio
- **Pasos:** Login con usuario sin proyectos
- **Esperado:** Mensaje "No hay proyectos" con boton para crear uno
- **Estado:** PASADO

---

## 3. Formulario de Datos del Inmueble

### TC-PROP-001: Crear proyecto desde formulario
- **Pasos:** Ir a `/datos-inmueble` > Completar todos los campos > Clic "Continuar"
- **Esperado:** Proyecto creado, diagnostico creado, navega a `/secciones`
- **Estado:** PASADO

### TC-PROP-002: Pre-carga desde Dashboard
- **Pasos:** Seleccionar "Diagnosticar" desde Dashboard
- **Esperado:** Todos los campos pre-cargados con datos del proyecto
- **Estado:** PASADO

### TC-PROP-003: Estados de Mexico
- **Pasos:** Abrir dropdown de estado
- **Esperado:** Lista de 32 estados de Mexico
- **Estado:** PASADO

### TC-PROP-004: Tipos de inmueble
- **Pasos:** Abrir dropdown de tipo
- **Esperado:** Opciones: Comercial, Educativo, Salud, Oficinas, Otro
- **Estado:** PASADO

---

## 4. Secciones del Diagnostico

### TC-SEC-001: Listar categorias
- **Pasos:** Completar formulario de inmueble > Ir a `/secciones`
- **Esperado:** 5 categorias listadas: Accesos, Circulaciones, Sanitarios, Senalizacion, Estacionamiento
- **Estado:** PASADO

### TC-SEC-002: Progreso por categoria
- **Pasos:** Responder preguntas de una categoria > Regresar a `/secciones`
- **Esperado:** Barra de progreso actualizada, badge "En proceso" o "Completado"
- **Estado:** PASADO

### TC-SEC-003: Finalizar diagnostico
- **Pasos:** Completar todas las categorias > Clic "Finalizar Diagnostico" > Confirmar
- **Esperado:** Diagnostico finalizado, redirige a `/resultado`
- **Estado:** PASADO

### TC-SEC-004: Boton deshabilitado sin completar
- **Pasos:** Ir a `/secciones` sin completar todas las categorias
- **Esperado:** Boton "Finalizar" deshabilitado
- **Estado:** PASADO

---

## 5. Cuestionario / Diagnostico en Progreso

### TC-DIAG-001: Responder pregunta
- **Pasos:** Ir a `/diagnostico/:categoriaId` > Seleccionar nivel (Optimo/Aceptable/Malo) > Observaciones > Clic "Siguiente"
- **Esperado:** Respuesta guardada, avanza a siguiente pregunta
- **Estado:** PASADO

### TC-DIAG-002: Navegacion entre preguntas
- **Pasos:** Clic "Anterior" / "Siguiente"
- **Esperado:** Navega entre preguntas sin perder respuestas
- **Estado:** PASADO

### TC-DIAG-003: Indicadores de pregunta
- **Pasos:** Responder algunas preguntas
- **Esperado:** Puntos indicadores: verde (respondida), gris (pendiente), azul (actual)
- **Estado:** PASADO

### TC-DIAG-004: Auto-save
- **Pasos:** Responder una pregunta > Esperar 15 segundos
- **Esperado:** Indicador "Guardando..." aparece, luego "Guardado HH:MM"
- **Estado:** PASADO

### TC-DIAG-005: Recuperacion de progreso
- **Pasos:** Responder preguntas > Recargar pagina > Volver al diagnostico
- **Esperado:** Respuestas previas restauradas desde localStorage
- **Estado:** PASADO

### TC-DIAG-006: beforeunload warning
- **Pasos:** Responder preguntas > Intentar cerrar pestana
- **Esperado:** Dialogo de confirmacion del navegador
- **Estado:** PASADO

### TC-DIAG-007: Completar categoria
- **Pasots:** Responder todas las preguntas de una categoria > Clic "Completar Seccion"
- **Esperado:** Regresa a `/secciones`, categoria marcada como completada
- **Estado:** PASADO

---

## 6. Resultados

### TC-RES-001: Visualizacion de resultado
- **Pasos:** Finalizar diagnostico > Ir a `/resultado`
- **Esperado:** Gauge circular animado, grafica de barras, recomendaciones, fortalezas, areas de mejora
- **Estado:** PASADO

### TC-RES-002: Gauge circular
- **Pasos:** Ver gauge de resultado
- **Esperado:** Arco animado con porcentaje, label de color (EXCELENTE/BUENO/REGULAR/DEFICIENTE)
- **Estado:** PASADO

### TC-RES-003: Grafica de barras
- **Pasos:** Ver grafica de categorias
- **Esperado:** Barras horizontales con colores (verde >=70%, ambar >=40%, rojo <40%), tooltips
- **Estado:** PASADO

### TC-RES-004: Descargar PDF (cliente)
- **Pasos:** Clic "Descargar PDF" (opcion cliente)
- **Esperado:** PDF generado con header, informacion del proyecto, score, tabla de categorias, recomendacion
- **Estado:** PASADO

### TC-RES-005: Compartir en redes sociales
- **Pasos:** Clic boton de compartir (LinkedIn, Twitter, WhatsApp)
- **Esperado:** Ventana de compartir se abre con datos del diagnostico
- **Estado:** PASADO

### TC-RES-006: Web Share API
- **Pasos:** Clic "Compartir" en dispositivo movil
- **Esperado:** Sistema nativo de compartir se activa
- **Estado:** PASADO

### TC-RES-007: Reiniciar diagnostico
- **Pasos:** Clic "Reiniciar"
- **Esperado:** Limpia estado, navega a `/datos-inmueble`
- **Estado:** PASADO

---

## 7. Historial de Diagnosticos

### TC-HIST-001: Listar diagnosticos
- **Pasos:** Ir a `/historial`
- **Esperado:** Lista de diagnosticos con nombre, fecha, direccion, estado, score
- **Estado:** PASADO

### TC-HIST-002: Favoritos
- **Pasots:** Clic estrella en un diagnostico > Activar filtro "Solo favoritos"
- **Esperado:** Estrella cambia de estado, filtro muestra solo favoritos
- **Estado:** PASADO

### TC-HIST-003: Ver resultado desde historial
- **Pasos:** Clic "Ver Resultado" en un diagnostico completado
- **Esperado:** Navega a `/resultado` con datos correctos
- **Estado:** PASADO

### TC-HIST-004: Descargar PDF desde historial
- **Pasos:** Clic "Descargar PDF" en historial
- **Esperado:** PDF descargado
- **Estado:** PASADO

### TC-HIST-005: Estado vacio
- **Pasos:** Ir a `/historial` sin diagnosticos
- **Esperado:** Mensaje "No hay diagnosticos" con CTA
- **Estado:** PASADO

---

## 8. Accesibilidad (WCAG 2.1 AA)

### TC-A11Y-001: Skip Link
- **Pasos:** Presionar Tab en cualquier pagina
- **Esperado:** Enlace "Saltar al contenido principal" visible
- **Estado:** PASADO

### TC-A11Y-002: Focus visible
- **Pasos:** Navegar con teclado (Tab) por formularios
- **Esperado:** Indicador de foco azul visible en todos los elementos interactivos
- **Estado:** PASADO

### TC-A11Y-003: ARIA en formularios
- **Pasos:** Inspeccionar inputs con Lighthouse o screen reader
- **Esperado:** aria-required, aria-invalid, aria-describedby presentes
- **Estado:** PASADO

### TC-A11Y-004: Toast con aria-live
- **Pasos:** Activar un toast
- **Esperado:** Screen reader anuncia el mensaje
- **Estado:** PASADO

### TC-A11Y-005: Graficas con roles ARIA
- **Pasos:** Inspeccionar grafica de barras
- **Esperado:** role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax
- **Estado:** PASADO

### TC-A11Y-006: Botones de compartir con aria-label
- **Pasos:** Inspeccionar botones de share
- **Esperado:** aria-label descriptivo en cada boton
- **Estado:** PASADO

### TC-A11Y-007: Reduced motion
- **Pasos:** Activar "Reduce motion" en SO > Usar la app
- **Esperado:** Animaciones desactivadas
- **Estado:** PASADO

### TC-A11Y-008: Contraste de colores
- **Pasos:** Ejecutar Lighthouse accessibility audit
- **Esperado:** Score >= 90
- **Estado:** PASADO

---

## 9. PWA / Rendimiento

### TC-PWA-001: Manifest instalable
- **Pasos:** Verificar manifest.json cargado
- **Esperado:** App instalable desde navegador
- **Estado:** PASADO

### TC-PWA-002: Service Worker activo
- **Pasos:** Inspeccionar Application > Service Workers
- **Esperado:** SW registrado y activo
- **Estado:** PASADO

### TC-PWA-003: Cache offline
- **Pasos:** Cargar app > Desactivar internet > Recargar
- **Esperado:** App carga desde cache
- **Estado:** PASADO

### TC-PWA-004: Lighthouse Performance
- **Pasos:** Ejecutar Lighthouse
- **Esperado:** Score >= 90
- **Estado:** PASADO

---

## 10. Navegadores

### TC-BROWSER-001: Chrome (latest)
- **Pasos:** Abrir en Chrome > Flujo completo
- **Esperado:** Todo funciona correctamente
- **Estado:** PASADO

### TC-BROWSER-002: Firefox (latest)
- **Pasos:** Abrir en Firefox > Flujo completo
- **Esperado:** Todo funciona correctamente
- **Estado:** PASADO

### TC-BROWSER-003: Safari (latest)
- **Pasos:** Abrir en Safari > Flujo completo
- **Esperado:** Todo funciona correctamente
- **Estado:** PASADO

### TC-BROWSER-004: Edge (latest)
- **Pasos:** Abrir en Edge > Flujo completo
- **Esperado:** Todo funciona correctamente
- **Estado:** PASADO

### TC-BROWSER-005: Chrome Movil (Responsive)
- **Pasos:** Abrir en Chrome DevTools > Modo movil
- **Esperado:** Layout responsivo, touch targets correctos
- **Estado:** PASADO

---

## 11. Manejo de Errores

### TC-ERR-001: Error de red
- **Pasos:** Desactivar backend > Intentar login
- **Esperado:** Toast de error amigable
- **Estado:** PASADO

### TC-ERR-002: Error de rendering
- **Pasos:** Simular error en componente (ErrorBoundary)
- **Esperado:** Fallback de error con boton "Volver al dashboard"
- **Estado:** PASADO

### TC-ERR-003: Sesion expirada
- **Pasos:** Esperar a que JWT expire > Hacer accion
- **Esperado:** Redirect automatico a `/login`
- **Estado:** PASADO

---

## Resumen de Bugs Cerrados

| ID | Descripcion | Severidad | Estado |
|---|---|---|---|
| BUG-001 | Backend retornaba `{ data: [...] }` en vez de `[...]` | Critico | CERRADO |
| BUG-002 | Niveles de respuesta incompatibles (cumple vs optimo) | Critico | CERRADO |
| BUG-003 | `/finalizar` no retornaba `categorias` ni `proyecto_nombre` | Alto | CERRADO |
| BUG-004 | `/categorias/:id/preguntas` retornaba `{categoria, preguntas}` | Alto | CERRADO |
| BUG-005 | Proyecto requeria campos `cliente` y `fecha` obligatorios | Medio | CERRADO |
| BUG-006 | Proxy Vite apuntaba a puerto incorrecto | Critico | CERRADO |
| BUG-007 | Mock mode residual en api.ts | Medio | CERRADO |

**Total de pruebas:** 52  
**Pruebas pasadas:** 52  
**Bugs abiertos:** 0  
**Fecha de cierre:** 18 de junio de 2026

---

## Firmas de Aprobacion

| Rol | Nombre | Fecha | Firma |
|---|---|---|---|
| Tech Lead | _____________ | ___/___/2026 | _________ |
| QA Lead | _____________ | ___/___/2026 | _________ |
| Product Owner | _____________ | ___/___/2026 | _________ |
