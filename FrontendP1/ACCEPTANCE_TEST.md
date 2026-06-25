# Pruebas de Aceptacion - Proyecto 1

## Escenario 1: Registro de nuevo usuario
| Paso | Accion | Resultado Esperado | Estado |
|------|--------|-------------------|--------|
| 1 | Ir a `/register` | Se muestra formulario de registro | |
| 2 | Dejar campos vacios y hacer clic en "Crear Cuenta" | Aparecen errores de validacion | |
| 3 | Ingresar nombre, email invalido, contrasena corta | Error en email y contrasena | |
| 4 | Ingresar datos validos y hacer clic en "Crear Cuenta" | Redirige al Dashboard | |

## Escenario 2: Login
| Paso | Accion | Resultado Esperado | Estado |
|------|--------|-------------------|--------|
| 1 | Ir a `/login` | Se muestra formulario de login | |
| 2 | Ingresar credenciales incorrectas | Toast de error "Credenciales incorrectas" | |
| 3 | Ingresar credenciales correctas | Redirige al Dashboard | |
| 4 | Recargar pagina | Se mantiene sesion activa | |

## Escenario 3: Crear proyecto
| Paso | Accion | Resultado Esperado | Estado |
|------|--------|-------------------|--------|
| 1 | En Dashboard, clic en "Nuevo Proyecto" | Se abre modal | |
| 2 | Dejar campos obligatorios vacios | Errores de validacion | |
| 3 | Llenar nombre, estado, ciudad, tipo | Formulario valido | |
| 4 | Clic en "Crear Proyecto" | Proyecto aparece en la lista | |
| 5 | Clic en "Eliminar" y confirmar | Proyecto se elimina de la lista | |

## Escenario 4: Responder cuestionario completo
| Paso | Accion | Resultado Esperado | Estado |
|------|--------|-------------------|--------|
| 1 | Seleccionar proyecto y clic "Diagnosticar" | Se muestra formulario de datos | |
| 2 | Llenar datos del inmueble | Formulario valido | |
| 3 | Clic "Continuar" | Se muestran las 5 categorias | |
| 4 | Seleccionar primera categoria | Se muestran 3 preguntas | |
| 5 | Responder preguntas con Optimo/Aceptable/Malo | Barra de progreso avanza | |
| 6 | Clic "Completar Seccion" | Categoria marcada como completada | |
| 7 | Repetir para las 5 categorias | Todas completadas | |
| 8 | Clic "Ver Resultado" | Se muestra pantalla de resultados | |

## Escenario 5: Generar PDF
| Paso | Accion | Resultado Esperado | Estado |
|------|--------|-------------------|--------|
| 1 | En resultado, clic "Descargar PDF" | Se genera PDF localmente | |
| 2 | En resultado, clic "Reporte Servidor" | Se descarga PDF desde backend | |
| 3 | Verificar contenido del PDF | Contiene resultado del diagnostico | |

## Escenario 6: Ver historial
| Paso | Accion | Resultado Esperado | Estado |
|------|--------|-------------------|--------|
| 1 | En Dashboard, clic "Historial" | Se muestra lista de diagnosticos | |
| 2 | Clic "Ver Resultado" en un diagnostico | Se muestra pantalla de resultados | |
| 3 | Clic "Descargar PDF" | Se descarga el PDF | |
| 4 | Sin diagnosticos, verificar mensaje | Se muestra "No hay diagnosticos aun" | |

## Escenario 7: Edge cases
| Paso | Accion | Resultado Esperado | Estado |
|------|--------|-------------------|--------|
| 1 | Cortar conexion a internet | Mensaje de error amigable | |
| 2 | Recargar pagina durante cuestionario | Progreso se mantiene (auto-save) | |
| 3 | Clic en boton "Atras" del navegador | Navega a pagina anterior | |
| 4 | Cerrar pestana con cambios sin guardar | Alerta de confirmacion | |

## Escenario 8: Responsive
| Paso | Accion | Resultado Esperado | Estado |
|------|--------|-------------------|--------|
| 1 | Abrir en mobile (375px) | Layout se adapta | |
| 2 | Abrir en tablet (768px) | Layout se adapta | |
| 3 | Abrir en desktop (1024px+) | Layout se adapta | |
| 4 | Zoom 200% | No se rompe el layout | |

## Escenario 9: Accesibilidad
| Paso | Accion | Resultado Esperado | Estado |
|------|--------|-------------------|--------|
| 1 | Navegar solo con teclado (Tab) | Todos los elementos son alcanzables | |
| 2 | Presionar Tab en la pagina | Aparece skip link | |
| 3 | Verificar focus visible | Outline azul en elemento activo | |
| 4 | Ejecutar Lighthouse Accessibility | Puntaje > 90 | |
