# Guia de Usuario Completa - Diagnostico Inmobiliario

**Version:** 1.0.0-sprint5-frontend-proy1
**Ultima actualizacion:** 24 de junio de 2026

---

## Indice

1. [Bienvenida](#1-bienvenida)
2. [Requisitos del Sistema](#2-requisitos-del-sistema)
3. [Registro e Inicio de Sesion](#3-registro-e-inicio-de-sesion)
4. [Dashboard - Gestion de Proyectos](#4-dashboard---gestion-de-proyectos)
5. [Crear un Diagnostico](#5-crear-un-diagnostico)
6. [Realizar el Cuestionario](#6-realizar-el-cuestionario)
7. [Ver Resultados](#7-ver-resultados)
8. [Descargar PDF Multi-idioma](#8-descargar-pdf-multi-idioma)
9. [Compartir en Redes Sociales](#9-compartir-en-redes-sociales)
10. [Historial y Favoritos](#10-historial-y-favoritos)
11. [Grafica de Evolucion](#11-grafica-de-evolucion)
12. [Modo Oscuro](#12-modo-oscuro)
13. [Perfil de Usuario](#13-perfil-de-usuario)
14. [Accesibilidad](#14-accesibilidad)
15. [Preguntas Frecuentes](#15-preguntas-frecuentes)
16. [Soporte](#16-soporte)

---

## 1. Bienvenida

**Diagnostico Inmobiliario** es una herramienta web que te permite evaluar las condiciones de accesibilidad de inmuebles de manera rapida y profesional.

Con esta aplicacion puedes:

- Evaluar 5 categorias de accesibilidad con 15 preguntas tecnicas
- Obtener un puntaje global y recomendaciones por categoria
- Generar reportes PDF profesionales en **espanol o ingles**
- Visualizar tu **evolucion** a lo largo del tiempo
- Usar la app en **modo oscuro** o claro
- Compartir resultados en redes sociales
- Marcar diagnosticos como favoritos

---

## 2. Requisitos del Sistema

| Requisito | Minimo | Recomendado |
|---|---|---|
| Navegador | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ | Chrome o Firefox latest |
| Conexion a internet | Si (para autenticacion) | Estable |
| Resolucion | 320px (movil) | 1024px+ (desktop) |
| JavaScript | Habilitado | Habilitado |

---

## 3. Registro e Inicio de Sesion

### Crear una cuenta

1. Abre la aplicacion en tu navegador
2. Haz clic en **"Registrarse"**
3. Completa los campos:
   - **Nombre completo**
   - **Correo electronico**
   - **Contrasena** (minimo 6 caracteres)
   - **Confirmar contrasena**
4. Haz clic en **"Crear Cuenta"**
5. Se iniciara sesion automaticamente

### Iniciar sesion

1. Ingresa tu correo electronico
2. Ingresa tu contrasena
3. Haz clic en **"Iniciar Sesion"**

### Credenciales de demostracion

Si quieres probar la aplicacion sin crear cuenta:

- **Email:** demo@accesibilidad.com
- **Contrasena:** demo123

---

## 4. Dashboard - Gestion de Proyectos

El Dashboard es tu pantalla principal donde puedes:

### Ver tus proyectos
- Cada proyecto se muestra como una tarjeta con: nombre, cliente, direccion, ciudad y tipo de inmueble
- Los proyectos se ordenan por fecha de creacion (mas reciente primero)

### Crear un proyecto
1. Haz clic en **"Nuevo Proyecto"** (esquina superior derecha)
2. Completa el formulario:
   - **Nombre del proyecto** (requerido)
   - **Cliente**
   - **Direccion** (requerido)
   - **Estado** (Selecciona de la lista de 32 estados de Mexico)
   - **Ciudad**
   - **Tipo de inmueble:** Comercial, Educativo, Salud, Oficinas u Otro
   - **Fecha**
3. Haz clic en **"Crear Proyecto"**

### Diagnosticar un proyecto
1. En la tarjeta del proyecto, haz clic en **"Diagnosticar"**
2. Se abrira el formulario de datos del inmueble pre-cargado

### Eliminar un proyecto
1. Haz clic en el icono de **papelera** en la tarjeta del proyecto
2. Confirma la eliminacion en el dialogo

### Navegacion rapida
- **Evolucion** - Ver grafica de progreso temporal
- **Historial** - Ver lista de diagnosticos anteriores
- **Salir** - Cerrar sesion

---

## 5. Crear un Diagnostico

### Desde el Dashboard
1. Haz clic en **"Diagnosticar"** en un proyecto existente
2. Los datos del proyecto se cargan automaticamente

### Nuevo diagnostico
1. Haz clic en **"Nuevo Proyecto"** o ve a la ruta `/datos-inmueble`
2. Completa la informacion del inmueble
3. Haz clic en **"Continuar"**
4. Se creara el diagnostico y se te redirigira a las secciones

---

## 6. Realizar el Cuestionario

### Secciones del diagnostico
El cuestionario tiene **5 categorias** con **3 preguntas cada una**:

1. **Accesos** - Rampas, barreras, senalizacion de entrada
2. **Circulaciones** - Ancho de pasillos, puertas, suelos
3. **Sanitarios** - Banos adaptados, barras de apoyo, mecanismos
4. **Senalizacion** - Braille, contraste visual, indicadores
5. **Estacionamiento** - Espacios reservados, dimensiones, rutas

### Responder preguntas
1. Selecciona una categoria
2. Para cada pregunta, elige un nivel:
   - **Optimo** (verde) - Cumple perfectamente (10 puntos)
   - **Aceptable** (amarillo) - Cumple parcialmente (5 puntos)
   - **Malo** (rojo) - No cumple (0 puntos)
3. Agrega observaciones opcionales
4. Navega con **"Siguiente"** / **"Anterior"**
5. Cuando completes todas las preguntas, haz clic en **"Completar Seccion"**

### Guardado automatico
- Tus respuestas se guardan automaticamente cada **15 segundos**
- Si cierras el navegador sin finalizar, tus respuestas se recuperan
- Un indicador muestra "Guardando..." o "Guardado HH:MM"

### Tiempo estimado
- Se muestra el tiempo estimado restante basado en preguntas respondidas
- Aproximadamente 30 segundos por pregunta

### Saltar preguntas
- Puedes saltar preguntas y completar sin responder todas
- Las preguntas sin respuesta no generan puntos

### Finalizar el diagnostico
1. Completa todas las 5 categorias (o las que desees)
2. En la pantalla de secciones, el boton **"Finalizar Diagnostico"** se activara
3. Revisa el resumen de tus respuestas
4. Confirma que has revisado tus respuestas
5. Haz clic en **"Confirmar"**

---

## 7. Ver Resultados

Despues de finalizar un diagnostico, veras:

### Gauge Circular
- Muestra el porcentaje global de accesibilidad
- Colores:
  - **Verde (>=80%)** - EXCELENTE
  - **Azul (>=60%)** - BUENO
  - **Amarillo (>=40%)** - REGULAR
  - **Rojo (<40%)** - DEFICIENTE

### Grafica de Barras
- Muestra el puntaje de cada categoria
- Colores: verde (>=70%), ambar (>=40%), rojo (<40%)

### Recomendaciones
- **Recomendacion general** - Resumen del estado del inmueble
- **Fortalezas** - Categorias con buen desempeno
- **Areas de mejora** - Categorias que necesitan atencion

---

## 8. Descargar PDF Multi-idioma

### Seleccionar idioma
1. En la pantalla de Resultados, busca el selector de idioma
2. Elige entre:
   - **Espanol** - PDF completo en espanol
   - **English** - PDF completo en ingles

### Descargar PDF
1. Haz clic en **"Descargar PDF (ES)"** o **"Descargar PDF (EN)"**
2. El PDF se generara con:
   - Encabezado con titulo y fecha
   - Informacion del proyecto
   - Score global con color
   - Tabla de categorias con barras de progreso
   - Recomendacion
   - Pie de pagina

### Reporte del Servidor
- Haz clic en **"Reporte Servidor"** para descargar el PDF generado por el backend

### Desde el Historial
1. En la lista de historial, haz clic en **"Descargar PDF"**
2. El PDF se descargara automaticamente

---

## 9. Compartir en Redes Sociales

### Compartir desde la pantalla de Resultados

1. Despues de ver tu resultado, busca los botones de **"Compartir"**
2. Elige la plataforma:

#### Web Share API (Movil)
- Haz clic en **"Compartir"** (icono de nodo)
- Se abrira el sistema de compartir nativo de tu dispositivo
- Puedes enviar por WhatsApp, email, SMS, etc.

#### LinkedIn
1. Haz clic en el boton de **LinkedIn**
2. Se abrira una ventana con el texto pre-cargado
3. Haz clic en **"Compartir"** en LinkedIn

#### Twitter / X
1. Haz clic en el boton de **Twitter**
2. Se abrira una ventana con el tweet pre-cargado
3. Haz clic en **"Twittear"**

#### WhatsApp
1. Haz clic en el boton de **WhatsApp**
2. Se abrira WhatsApp Web con el mensaje listo
3. Selecciona el contacto o grupo
4. Haz clic en **"Enviar"**

### Compartir enlace directo
- El enlace de resultados es publico y accesible sin login
- Cualquier persona con el enlace puede ver el resultado
- Copia el enlace desde la barra de direcciones o desde los botones de compartir

---

## 10. Historial y Favoritos

### Acceder al historial
1. Haz clic en **"Historial"** en el header del Dashboard
2. Veras todos tus diagnosticos anteriores

### Informacion mostrada
- Nombre del proyecto
- Fecha del diagnostico
- Direccion
- Estado (completado, en proceso, etc.)
- Porcentaje de score

### Marcar como favorito
1. Haz clic en la **estrella** de un diagnostico
2. La estrella cambiara de color (gris a amarilla)
3. Los favoritos se guardan localmente en tu navegador

### Filtrar por favoritos
1. Activa el toggle **"Solo favoritos"**
2. Solo se mostraran los diagnosticos marcados con estrella
3. Desactiva el toggle para ver todos

### Ver resultado desde historial
1. Haz clic en **"Ver Resultado"** en un diagnostico completado
2. Se abrira la pantalla de resultados con todos los datos

### Descargar PDF desde historial
1. Haz clic en **"Descargar PDF"**
2. El PDF se descargara automaticamente

---

## 11. Grafica de Evolucion

### Acceder
1. Haz clic en **"Evolucion"** en el header del Dashboard
2. Se abrira la grafica de progreso temporal

### Informacion mostrada

#### Estadisticas generales
- **Promedio** - Score promedio de todos tus diagnosticos
- **Maximo** - Tu mejor score
- **Minimo** - Tu score mas bajo

#### Grafica lineal
- Muestra la evolucion de tus puntajes en el tiempo
- Puntos interactivos: pasa el mouse para ver detalles
- Colores: verde (>=70%), amarillo (>=40%), rojo (<40%)

#### Lista historica
- Lista detallada de todos tus diagnosticos completados
- Ordenados del mas reciente al mas antiguo
- Muestra: nombre, fecha, score con color

### Cuando hay datos
- La grafica se actualiza automaticamente con cada nuevo diagnostico completado
- Solo se muestran diagnosticos con estado "completado"

### Cuando no hay datos
- Se muestra un mensaje indicando que necesitas completar al menos un diagnostico

---

## 12. Modo Oscuro

### Activar modo oscuro
1. Haz clic en el **icono de luna** en el header (esquina superior derecha)
2. La aplicacion cambiara a modo oscuro
3. El icono cambiara a **sol** para volver al modo claro

### Preferencia del sistema
- La aplicacion detecta automaticamente la preferencia de tu sistema operativo
- Si tu sistema esta en modo oscuro, la aplicacion arrancara en modo oscuro
- Tu eleccion se guarda en localStorage y persiste entre sesiones

### Componentes adaptados
- **Header** - Fondo y bordes adaptados
- **Cards** - Fondo oscuro con bordes sutiles
- **Botones** - Variantes oscuras para secondary y outline
- **Formularios** - Inputs, selects y textareas con fondos oscuros
- **Graficas** - Fondos de barras y lineas adaptados
- **Gauge** - Stroke del circulo adaptado
- **Toast** - Notificaciones con fondos oscuros
- **Landing** - Gradientes y secciones adaptadas
- **Login/Register** - Fondos adaptados

---

## 13. Perfil de Usuario

### Informacion del perfil
Tu perfil contiene:
- **Nombre** - Tu nombre completo
- **Email** - Tu correo electronico registrado
- **ID de usuario** - Identificador unico

### Cerrar sesion
1. Haz clic en el icono de **cerrar sesion** (esquina superior derecha del Dashboard)
2. Tu sesion se cerrara y seras redirigido a la pantalla de login

### Proteccion de datos
- Tu contrasena se almacena de forma encriptada
- La sesion se mantiene mediante JWT (token de autenticacion)
- Si cierras la sesion, el token se elimina automaticamente
- La sesion expira despues de un periodo de inactividad

---

## 14. Accesibilidad

La aplicacion cumple con estandares **WCAG 2.1 nivel AA**:

### Navegacion por teclado
- Usa **Tab** para navegar entre elementos
- Usa **Enter** o **Espacio** para activar botones
- Usa **Flechas** para navegar en el cuestionario

### Skip Link
- Al presionar Tab en cualquier pagina, aparece **"Saltar al contenido principal"**
- Presiona Enter para ir directamente al contenido

### Indicadores de foco
- Todos los elementos interactivos tienen un indicador de foco azul visible
- Funciona tanto con mouse como con teclado

### Lectores de pantalla
- Todos los campos de formulario tienen etiquetas asociadas
- Los botones de accion tienen descripciones `aria-label`
- Los toasts se anuncian automaticamente con `aria-live`
- Las graficas tienen roles ARIA y valores accesibles

### Movimiento reducido
- Si activas "Reducir movimiento" en tu sistema operativo, las animaciones se desactivan automaticamente

### Contraste
- Todos los textos cumplen con contraste minimo 4.5:1
- Colores adaptados para modo claro y oscuro

---

## 15. Preguntas Frecuentes

### Q: Mis respuestas se guardan automaticamente?
**R:** Si, cada 15 segundos tu progreso se guarda localmente. Si cierras el navegador sin finalizar, tus respuestas se recuperan al volver.

### Q: Que pasa si pierdo conexion a internet?
**R:** La aplicacion funciona offline para ver datos guardados. Para enviar respuestas necesitas conexion.

### Q: Puedo modificar un diagnostico ya finalizado?
**R:** No, una vez finalizado el diagnostico no se puede editar. Puedes crear uno nuevo.

### Q: Como se calcula el score?
**R:** Cada pregunta vale 10 puntos (optimo), 5 puntos (aceptable) o 0 puntos (malo). El score total es la suma de puntos dividido entre el maximo posible.

### Q: Puedo compartir resultados sin que la otra persona tenga cuenta?
**R:** Si, los enlaces de resultados son publicos y no requieren autenticacion.

### Q: En que navegadores funciona?
**R:** Chrome, Firefox, Safari y Edge en sus ultimas versiones. Tambien funciona en navegadores moviles.

### Q: Puedo descargar el PDF en ingles?
**R:** Si, en la pantalla de resultados hay un selector de idioma (Espanol/English). El PDF se genera completamente en el idioma seleccionado.

### Q: Como activo el modo oscuro?
**R:** Haz clic en el icono de luna en el header. La preferencia se guarda automaticamente.

### Q: Donde veo mi progreso a lo largo del tiempo?
**R:** Haz clic en "Evolucion" en el header del Dashboard para ver la grafica de progreso.

### Q: Puedo saltar preguntas?
**R:** Si, puedes saltar preguntas y completar sin responder todas. Las preguntas sin respuesta no generan puntos.

---

## 16. Soporte

Si tienes problemas o sugerencias:

- **GitHub Issues:** [https://github.com/ErnestoDof23/Integradorall/issues](https://github.com/ErnestoDof23/Integradorall/issues)

---

**Version:** 1.0.0-sprint5-frontend-proy1
**Fecha:** 24 de junio de 2026
**Equipo:** Frontend Team - Proyecto 1
