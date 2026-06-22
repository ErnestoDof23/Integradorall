# Pruebas de Regresion Final - Semana 4

**Proyecto:** Diagnostico Inmobiliario - Frontend  
**Fecha:** 22 de junio de 2026  
**Version:** v1.0.0-sprint4-frontend-proy1  
**Ambiente:** http://localhost:5173 + http://localhost:3000  
**Credenciales:** demo@accesibilidad.com / demo123

---

## Resumen Ejecutivo

| Metrica | Valor |
|---|---|
| Total pruebas | 42 |
| Pasaron | 42 |
| Fallaron | 0 |
| Cobertura de flujos | 100% |
| Bugs abiertos | 0 |

---

## 1. Flujo de Autenticacion

### TC-REG-AUTH-001: Login con credenciales validas
- **Pasos:** `/login` > email `demo@accesibilidad.com` > password `demo123` > Clic "Iniciar Sesion"
- **Esperado:** Redirige a `/dashboard`, toast exito, nombre visible
- **Estado:** PASADO

### TC-REG-AUTH-002: Login con credenciales invalidas
- **Pasos:** `/login` > email incorrecto > Clic "Iniciar Sesion"
- **Esperado:** Toast error "Credenciales incorrectas"
- **Estado:** PASADO

### TC-REG-AUTH-003: Registro exitoso
- **Pasos:** `/register` > nombre + email nuevo + password (6+ chars) > Clic "Registrarse"
- **Esperado:** Cuenta creada, login automatico, redirige a `/dashboard`
- **Estado:** PASADO

### TC-REG-AUTH-004: Registro con email existente
- **Pasos:** `/register` > `demo@accesibilidad.com` > Clic "Registrarse"
- **Esperado:** Toast error
- **Estado:** PASADO

### TC-REG-AUTH-005: Proteccion de rutas
- **Pasos:** Cerrar sesion > Ir a `/dashboard` directamente
- **Esperado:** Redirige a `/login`
- **Estado:** PASADO

### TC-REG-AUTH-006: Logout
- **Pasos:** Clic icono cerrar sesion
- **Esperado:** Limpia sesion, redirige a `/login`
- **Estado:** PASADO

---

## 2. Flujo de Proyectos

### TC-REG-PROJ-001: Crear proyecto
- **Pasos:** Dashboard > "Nuevo Proyecto" > Completar formulario > "Crear Proyecto"
- **Esperado:** Modal cierra, proyecto en grid, toast exito
- **Estado:** PASADO

### TC-REG-PROJ-002: Validacion de formulario
- **Pasos:** "Nuevo Proyecto" > Campos vacios > "Crear Proyecto"
- **Esperado:** Errores en campos requeridos
- **Estado:** PASADO

### TC-REG-PROJ-003: Eliminar proyecto
- **Pasos:** Clic papelera > Confirmar
- **Esperado:** Proyecto eliminado, toast confirmacion
- **Estado:** PASADO

### TC-REG-PROJ-004: Diagnosticar proyecto
- **Pasos:** Clic "Diagnosticar" en tarjeta
- **Esperado:** Navega a `/datos-inmueble` con datos pre-cargados
- **Estado:** PASADO

---

## 3. Flujo de Diagnostico

### TC-REG-DIAG-001: Crear diagnostico desde formulario
- **Pasos:** `/datos-inmueble` > Completar > "Continuar"
- **Esperado:** Proyecto creado, diagnostico creado, navega a `/secciones`
- **Estado:** PASADO

### TC-REG-DIAG-002: Listar 5 categorias
- **Pasos:** Ir a `/secciones`
- **Esperado:** 5 categorias: Accesos, Circulaciones, Sanitarios, Senalizacion, Estacionamiento
- **Estado:** PASADO

### TC-REG-DIAG-003: Responder pregunta
- **Pasos:** Seleccionar categoria > Elegir nivel > Observaciones > "Siguiente"
- **Esperado:** Respuesta guardada, avanza pregunta
- **Estado:** PASADO

### TC-REG-DIAG-004: Navegacion entre preguntas
- **Pasos:** "Anterior" / "Siguiente"
- **Esperado:** Navega sin perder respuestas
- **Estado:** PASADO

### TC-REG-DIAG-005: Auto-save 15 segundos
- **Pasos:** Responder > Esperar 15s
- **Esperado:** Indicador "Guardando..." luego "Guardado HH:MM"
- **Estado:** PASADO

### TC-REG-DIAG-006: Recuperacion en recarga
- **Pasos:** Responder > Recargar pagina > Volver al diagnostico
- **Esperado:** Respuestas restauradas desde localStorage
- **Estado:** PASADO

### TC-REG-DIAG-007: Indicadores de pregunta
- **Pasos:** Responder algunas preguntas
- **Esperado:** Puntos verdes (respondida), grises (pendiente), azul (actual)
- **Estado:** PASADO

### TC-REG-DIAG-008: Completar categoria
- **Pasos:** Responder todas > "Completar Seccion"
- **Esperado:** Regresa a `/secciones`, categoria completada
- **Estado:** PASADO

### TC-REG-DIAG-009: Finalizar diagnostico
- **Pasos:** Completar todas > "Finalizar Diagnostico" > Confirmar
- **Esperado:** Navega a `/resultado`
- **Estado:** PASADO

### TC-REG-DIAG-010: Boton deshabilitado
- **Pasos:** `/secciones` sin completar todo
- **Esperado:** Boton "Finalizar" deshabilitado
- **Estado:** PASADO

---

## 4. Flujo de Resultados

### TC-REG-RES-001: Gauge circular
- **Pasos:** Ver `/resultado`
- **Esperado:** Gauge animado con porcentaje y label de color
- **Estado:** PASADO

### TC-REG-RES-002: Grafica de barras
- **Pasos:** Ver categorias en resultado
- **Esperado:** Barras horizontales con colores y tooltips
- **Estado:** PASADO

### TC-REG-RES-003: Fortalezas y areas de mejora
- **Pasos:** Ver resultado detallado
- **Esperado:** Lista de fortalezas (verde) y areas de mejora (amarillo)
- **Estado:** PASADO

### TC-REG-RES-004: Descargar PDF (cliente)
- **Pasos:** Clic "Descargar PDF"
- **Esperado:** PDF generado con header, score, tabla, recomendacion
- **Estado:** PASADO

---

## 5. Compartir en Redes Sociales (NUEVO Semana 4)

### TC-REG-SHARE-001: Web Share API
- **Pasos:** Clic "Compartir" en movil
- **Esperado:** Sistema nativo de compartir se activa
- **Estado:** PASADO

### TC-REG-SHARE-002: LinkedIn
- **Pasos:** Clic LinkedIn
- **Esperado:** Popup con texto pre-cargado y enlace
- **Estado:** PASADO

### TC-REG-SHARE-003: Twitter
- **Pasos:** Clic Twitter
- **Esperado:** Popup con tweet pre-cargado
- **Estado:** PASADO

### TC-REG-SHARE-004: WhatsApp
- **Pasos:** Clic WhatsApp
- **Esperado:** WhatsApp Web con mensaje listo
- **Estado:** PASADO

---

## 6. Favoritos (NUEVO Semana 4)

### TC-REG-FAV-001: Marcar favorito
- **Pasos:** Historial > Clic estrella en diagnostico
- **Esperado:** Estrella cambia de gris a amarilla
- **Estado:** PASADO

### TC-REG-FAV-002: Filtrar favoritos
- **Pasos:** Activar toggle "Solo favoritos"
- **Esperado:** Solo muestran diagnosticos marcados
- **Estado:** PASADO

### TC-REG-FAV-003: Persistencia
- **Pasos:** Marcar favorito > Recargar pagina > Ver historial
- **Esperado:** Favorito persiste en localStorage
- **Estado:** PASADO

---

## 7. Perfil de Usuario (NUEVO Semana 4)

### TC-REG-PROFILE-001: Informacion visible
- **Pasos:** Login > Dashboard
- **Esperado:** Nombre del usuario visible en header
- **Estado:** PASADO

### TC-REG-PROFILE-002: Cerrar sesion
- **Pasos:** Clic cerrar sesion
- **Esperado:** Limpia token, redirige a `/login`
- **Estado:** PASADO

---

## 8. Historial

### TC-REG-HIST-001: Listar diagnosticos
- **Pasos:** `/historial`
- **Esperado:** Lista con nombre, fecha, score, estado
- **Estado:** PASADO

### TC-REG-HIST-002: Ver resultado desde historial
- **Pasos:** Clic "Ver Resultado"
- **Esperado:** Navega a `/resultado` con datos correctos
- **Estado:** PASADO

### TC-REG-HIST-003: Descargar PDF desde historial
- **Pasos:** Clic "Descargar PDF"
- **Esperado:** PDF descargado
- **Estado:** PASADO

### TC-REG-HIST-004: Estado vacio
- **Pasos:** Historial sin diagnosticos
- **Esperado:** Mensaje "No hay diagnosticos" con CTA
- **Estado:** PASADO

---

## 9. Accesibilidad

### TC-REG-A11Y-001: Skip Link
- **Pasos:** Tab en cualquier pagina
- **Esperado:** "Saltar al contenido principal" visible
- **Estado:** PASADO

### TC-REG-A11Y-002: Focus visible
- **Pasos:** Navegar con Tab
- **Esperado:** Indicador foco azul en elementos interactivos
- **Estado:** PASADO

### TC-REG-A11Y-003: Toast aria-live
- **Pasos:** Activar toast
- **Esperado:** Screen reader anuncia mensaje
- **Estado:** PASADO

### TC-REG-A11Y-004: ARIA en graficas
- **Pasos:** Inspeccionar grafica de barras
- **Esperado:** role="progressbar" con aria-valuenow
- **Estado:** PASADO

---

## 10. Rendimiento

### TC-REG-PERF-001: Build exitoso
- **Pasos:** `npm run build`
- **Esperado:** Build sin errores
- **Estado:** PASADO

### TC-REG-PERF-002: Lint limpio
- **Pasos:** `npm run lint`
- **Esperado:** 0 errores
- **Estado:** PASADO

### TC-REG-PERF-003: TypeScript limpio
- **Pasos:** `npx tsc -b`
- **Esperado:** 0 errores
- **Estado:** PASADO

### TC-REG-PERF-004: Bundle optimizado
- **Pasos:** Verificar tamanos de chunks
- **Esperado:** Result chunk < 20KB (sin jsPDF)
- **Estado:** PASADO

---

## 11. Manejo de Errores

### TC-REG-ERR-001: Error de red
- **Pasos:** Backend apagado > Login
- **Esperado:** Toast error amigable
- **Estado:** PASADO

### TC-REG-ERR-002: Sesion expirada
- **Pasos:** JWT expirado > Hacer accion
- **Esperado:** Redirect a `/login`
- **Estado:** PASADO

---

## Bugs Cerrados en Semana 4

| ID | Descripcion | Severidad | Estado |
|---|---|---|---|
| BUG-S4-001 | Backend retornaba `{ data: [...] }` en vez de `[...]` | Critico | CERRADO |
| BUG-S4-002 | Niveles de respuesta incompatibles (cumple vs optimo) | Critico | CERRADO |
| BUG-S4-003 | `/finalizar` no retornaba categorias ni proyecto_nombre | Alto | CERRADO |
| BUG-S4-004 | `/categorias/:id/preguntas` retornaba objeto envuelto | Alto | CERRADO |
| BUG-S4-005 | Proyecto requeria campos opcionales como obligatorios | Medio | CERRADO |
| BUG-S4-006 | Proxy Vite apuntaba a puerto incorrecto | Critico | CERRADO |
| BUG-S4-007 | Mock mode residual en api.ts | Medio | CERRADO |
| BUG-S4-008 | Result chunk de 614KB por imports estaticos | Alto | CERRADO |

---

**Fecha de cierre:** 22 de junio de 2026  
**Total pruebas:** 42  
**Pasaron:** 42  
**Fallaron:** 0  
**Bugs abiertos:** 0
