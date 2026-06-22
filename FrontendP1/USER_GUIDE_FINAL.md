# Guia de Usuario Final - Diagnostico Inmobiliario v1.0.0

**Sprint 2 -版本 Final**  
**Ultima actualizacion:** 18 de junio de 2026

---

## Indice

1. [Bienvenida](#1-bienvenida)
2. [Requisitos del Sistema](#2-requisitos-del-sistema)
3. [Registro e Inicio de Sesion](#3-registro-e-inicio-de-sesion)
4. [Dashboard - Gestion de Proyectos](#4-dashboard---gestion-de-proyectos)
5. [Crear un Diagnostico](#5-crear-un-diagnostico)
6. [Realizar el Cuestionario](#6-realizar-el-cuestionario)
7. [Ver Resultados](#7-ver-resultados)
8. [Compartir en Redes Sociales](#8-compartir-en-redes-sociales)
9. [Historial y Favoritos](#9-historial-y-favoritos)
10. [Perfil de Usuario](#10-perfil-de-usuario)
11. [Descargar Reportes PDF](#11-descargar-reportes-pdf)
12. [Accesibilidad](#12-accesibilidad)
13. [Preguntas Frecuentes](#13-preguntas-frecuentes)
14. [Soporte](#14-soporte)

---

## 1. Bienvenida

**Diagnostico Inmobiliario** es una herramienta web que te permite evaluar las condiciones de accesibilidad de inmuebles de manera rapida y profesional. Con esta aplicacion puedes:

- Evaluar 5 categorias de accesibilidad con 15 preguntas tecnicas
- Obtener un puntaje global y recomendaciones por categoria
- Generar reportes PDF profesionales
- Comparar diagnosticos anteriores
- Compartir resultados en redes sociales

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
4. Haz clic en **"Registrarse"**
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

### Atajos de teclado
- **Flecha derecha** - Siguiente pregunta
- **Flecha izquierda** - Pregunta anterior
- **Teclas 1-9** - Ir directamente a una pregunta

### Finalizar el diagnostico
1. Completa todas las 5 categorias
2. En la pantalla de secciones, el boton **"Finalizar Diagnostico"** se activara
3. Confirma que has revisado tus respuestas
4. Haz clic en **"Confirmar"**

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

## 8. Compartir en Redes Sociales

### Compartir desde la pantalla de Resultados

1. Despues de ver tu resultado, busca los botones de **"Compartir"**
2. Elige la plataforma:

#### Web Share API (Movil)
- Haz clic en **"Compartir"** (icono de nodo)
- Se abrira el sistema de compartir nativo de tu dispositivo
- Puedes enviar por WhatsApp, email, SMS, etc.

#### LinkedIn
1. Haz clic en el boton de **LinkedIn**
2. Se abrira una ventana con el texto pre-cargado:
   > "Diagnostico: [Nombre] - Score: [X]% - Ver resultado: [enlace]"
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

## 9. Historial y Favoritos

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

## 10. Perfil de Usuario

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

## 11. Descargar Reportes PDF

### Desde la pantalla de Resultados

#### Opcion 1: PDF Generado en el Cliente
1. Haz clic en **"Descargar PDF"**
2. Se generara un PDF profesional con:
   - Encabezado con titulo y fecha
   - Informacion del proyecto
   - Score global con color
   - Tabla de categorias con barras de progreso
   - Recomendacion
   - Pie de pagina

#### Opcion 2: Reporte del Servidor
1. Haz clic en **"Reporte Servidor"**
2. Se descargara el PDF generado por el backend

### Desde el Historial
1. En la lista de historial, haz clic en **"Descargar PDF"**
2. El PDF se descargara automaticamente

---

## 12. Accesibilidad

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

---

## 13. Preguntas Frecuentes

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

---

## 14. Soporte

Si tienes problemas o sugerencias:

- **GitHub Issues:** [https://github.com/tu-org/FrontendP1/issues](https://github.com/tu-org/FrontendP1/issues)
- **Email:** soporte@diagnosticoinmobiliario.com

---

**Version:** 1.0.0-sprint2-frontend  
**Fecha:** 18 de junio de 2026  
**Equipo:** Frontend Team - Proyecto 1
