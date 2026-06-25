# Pruebas de Regresion - Frontend

**Fecha**: 2026-06-13
**Responsable**: Frontend Team
**Entorno**: localhost:5173 (dev) + build de produccion

## 1. Login/Registro

| Caso | Pasos | Esperado | Estado |
|------|-------|----------|--------|
| Registro exitoso | Llenar nombre, email, contrasena -> Submit | Redirige a Dashboard | [ ] |
| Registro con email existente | Usar email ya registrado | Toast error | [ ] |
| Registro con campos vacios | Submit sin datos | Errores de validacion | [ ] |
| Login exitoso | Credenciales correctas | Redirige a Dashboard | [ ] |
| Login con credenciales incorrectas | Email o password incorrecto | Toast error | [ ] |
| Login con campos vacios | Submit sin datos | Errores de validacion | [ ] |
| Sesion persiste al recargar | Recargar pagina | Se mantiene en Dashboard | [ ] |
| Logout | Clic "Salir" | Redirige a Login | [ ] |

## 2. CRUD de Proyectos

| Caso | Pasos | Esperado | Estado |
|------|-------|----------|--------|
| Crear proyecto | Llenar nombre, estado, ciudad, tipo -> Submit | Proyecto aparece en lista | [ ] |
| Crear con campos obligatorios vacios | Submit incompleto | Errores de validacion | [ ] |
| Eliminar proyecto | Clic trash -> Confirmar | Proyecto desaparece | [ ] |
| Cancelar eliminacion | Clic trash -> Cancelar | Proyecto permanece | [ ] |
| Lista vacia | Sin proyectos | Mensaje "Sin proyectos" | [ ] |

## 3. Cuestionario

| Caso | Pasos | Esperado | Estado |
|------|-------|----------|--------|
| Iniciar diagnostico | Seleccionar proyecto -> Diagnosticar | Muestra datos inmueble | [ ] |
| Guardar datos inmueble | Llenar formulario -> Continuar | Muestra 5 categorias | [ ] |
| Responder preguntas | Seleccionar nivel en cada pregunta | Barra de progreso avanza | [ ] |
| Navegar entre preguntas | Botones Anterior/Siguiente | Navega correctamente | [ ] |
| Completar seccion | Responder todas -> Completar | Categoria marcada completada | [ ] |
| Intentar completar sin responder | Dejar preguntas sin responder | Boton deshabilitado | [ ] |
| Auto-save | Esperar 30 segundos | Datos guardados en localStorage | [ ] |
| beforeunload | Cerrar pestana con cambios | Alerta de confirmacion | [ ] |

## 4. Resultado y PDF

| Caso | Pasos | Esperado | Estado |
|------|-------|----------|--------|
| Ver resultado | Completar todas las categorias -> Ver Resultado | Muestra gauge + graficas | [ ] |
| Gauge circular | Verificar porcentaje | Muestra color segun puntaje | [ ] |
| Grafica de barras | Verificar categorias | Muestra barras por categoria | [ ] |
| Descargar PDF local | Clic "Descargar PDF" | Se genera archivo PDF | [ ] |
| Descargar PDF servidor | Clic "Reporte Servidor" | Se descarga PDF | [ ] |
| Compartir | Clic "Compartir PDF" | Web Share API o clipboard | [ ] |
| Volver al dashboard | Clic "Volver al Dashboard" | Navega a Dashboard | [ ] |
| Nuevo diagnostico | Clic "Nuevo Diagnostico" | Navega a Datos Inmueble | [ ] |

## 5. Historial

| Caso | Pasos | Esperado | Estado |
|------|-------|----------|--------|
| Ver historial | Clic "Historial" en Dashboard | Lista de diagnosticos | [ ] |
| Ver resultado desde historial | Clic "Ver Resultado" | Muestra pantalla resultado | [ ] |
| Descargar desde historial | Clic "Descargar PDF" | Se descarga PDF | [ ] |
| Historial vacio | Sin diagnosticos | Mensaje "No hay diagnosticos aun" | [ ] |

## 6. Accesibilidad

| Caso | Pasos | Esperado | Estado |
|------|-------|----------|--------|
| Skip link | Presionar Tab al cargar | Aparece "Saltar al contenido principal" | [ ] |
| Focus visible | Navegar con Tab | Outline azul visible | [ ] |
| Navegacion por teclado | Tab/Shift+Tab | Todos los elementos alcanzables | [ ] |
| ARIA labels | Inspeccionar botones icon-only | Tienen aria-label | [ ] |
| Contraste | Lighthouse Accessibility | Score > 90 | [ ] |

## 7. Responsive

| Caso | Pasos | Esperado | Estado |
|------|-------|----------|--------|
| Mobile (375px) | Abrir en Chrome mobile | Layout se adapta | [ ] |
| Tablet (768px) | Abrir en tablet | Layout se adapta | [ ] |
| Desktop (1024px+) | Abrir en escritorio | Layout se adapta | [ ] |
| Zoom 200% | Zoom del navegador | No se rompe layout | [ ] |

## 8. Build y Performance

| Caso | Pasos | Esperado | Estado |
|------|-------|----------|--------|
| Build limpio | `npm run build` | Sin errores | [ ] |
| Lint limpio | `npm run lint` | Sin warnings | [ ] |
| Code splitting | Verificar chunks | Paginas en chunks separados | [ ] |
| Service worker | Verificar registro | SW registrado en Application | [ ] |

## Resultados

- **Total de casos**: 42
- **Aprobados**: ___
- **Reprobados**: ___
- **Observaciones**: ___
