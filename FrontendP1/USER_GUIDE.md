# Guia de Usuario - Diagnostico Inmobiliario

## 1. Registro

1. Ve a `/register`
2. Completa nombre, email y contrasena
3. Haz clic en "Crear Cuenta"
4. Seras redirigido al dashboard

## 2. Inicio de Sesion

1. Ve a `/login`
2. Ingresa tu email y contrasena
3. Haz clic en "Iniciar Sesion"

## 3. Crear un Proyecto

1. En el Dashboard, haz clic en "Nuevo Proyecto"
2. Completa los campos obligatorios: nombre, estado, ciudad y tipo de inmueble
3. Haz clic en "Crear Proyecto"
4. El proyecto aparecera en la lista del dashboard

## 4. Realizar un Diagnostico

1. En el Dashboard, selecciona un proyecto y haz clic en "Diagnosticar"
2. Completa los datos del inmueble en "Datos del Inmueble"
3. Haz clic en "Continuar" para ir a las secciones
4. Selecciona una categoria para comenzar
5. Responde cada pregunta seleccionando: Optimo, Aceptable o Malo
6. Navega entre preguntas con los botones "Anterior" y "Siguiente"
7. Cuando termines una categoria, haz clic en "Completar Seccion"
8. Repite para todas las categorias
9. Cuando todas esten completadas, haz clic en "Ver Resultado"

## 5. Ver Resultado

- El gauge circular muestra el porcentaje global
- Las graficas de barras muestran el puntaje por categoria
- Las recomendaciones aparecen debajo de las graficas
- Puedes compartir el resultado con el boton "Compartir PDF"

## 6. Descargar PDF

- **Descargar PDF**: genera el PDF localmente en tu navegador
- **Reporte Servidor**: descarga el PDF desde el backend
- Ambos botones aparecen en la pantalla de resultado

## 7. Historial de Diagnosticos

1. En el Dashboard, haz clic en "Historial"
2. Veras la lista de todos tus diagnosticos
3. Haz clic en "Ver Resultado" para ver los detalles
4. Haz clic en "Descargar PDF" para obtener el reporte

## Preguntas Frecuentes

**Que pasa si cierro el navegador durante un diagnostico?**
Las respuestas se guardan automaticamente cada 30 segundos. Puedes continuar donde te quedaste.

**Puedo modificar un diagnostico ya completado?**
No, los diagnosticos completados son de solo lectura. Puedes crear uno nuevo.

**Que significan los colores del gauge?**
- Verde (80-100%): Excelente
- Azul (60-79%): Bueno
- Naranja (40-59%): Regular
- Rojo (0-39%): Deficiente

**Necesito internet para usar la app?**
La app requiere conexion al backend para guardar datos. El service worker permite acceso offline a los assets estaticos.
