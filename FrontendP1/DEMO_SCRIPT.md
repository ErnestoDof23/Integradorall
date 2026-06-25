# Script de Demostracion - Proyecto 1

## Cuenta demo
- **Email**: demo@accesibilidad.com
- **Contrasena**: demo123

## Duracion: 2 minutos

## Flujo de la demo

### 1. Login (15 segundos)
1. Abrir `http://localhost:5173`
2. Ingresar email: `demo@accesibilidad.com`
3. Ingresar contrasena: `demo123`
4. Clic "Iniciar Sesion"
5. **Narrar**: "Esta es la pantalla de dashboard donde gestionamos nuestros proyectos"

### 2. Crear proyecto (20 segundos)
1. Clic "Nuevo Proyecto"
2. Nombre: "Oficina Central Tech"
3. Estado: "Ciudad de Mexico"
4. Ciudad: "Ciudad de Mexico"
5. Tipo: "Oficinas"
6. Clic "Crear Proyecto"
7. **Narrar**: "Creamos un nuevo proyecto para diagnosticar sus condiciones"

### 3. Iniciar diagnostico (15 segundos)
1. Seleccionar el proyecto creado
2. Clic "Diagnosticar"
3. Llenar datos del inmueble rapidamente
4. Clic "Continuar"
5. **Narrar**: "El sistema nos muestra las 5 categorias a evaluar"

### 4. Responder cuestionario (40 segundos)
1. Seleccionar "Accesos"
2. Responder 3 preguntas (Optimo, Aceptable, Malo)
3. Clic "Completar Seccion"
4. Repetir para 2 categorias mas (mostrar flujo)
5. **Narrar**: "Cada pregunta tiene 3 niveles: Optimo, Aceptable y Malo. El progreso se guarda automaticamente"

### 5. Ver resultado (15 segundos)
1. Clic "Ver Resultado"
2. **Narrar**: "El gauge circular muestra el porcentaje global y las graficas el detalle por categoria"
3. Mostrar recomendaciones

### 6. Descargar PDF (10 segundos)
1. Clic "Descargar PDF"
2. Abrir PDF generado
3. **Narrar**: "El PDF se genera directamente en el navegador"

### 7. Historial (5 segundos)
1. Volver al Dashboard
2. Clic "Historial"
3. **Narrar**: "Todos los diagnosticos quedan registrados aqui"

## Puntos clave a mencionar
- Accesibilidad WCAG 2.1 AA (navegacion por teclado, ARIA, contraste)
- PWA instalable con modo offline
- Auto-save cada 30 segundos
- Code splitting para performance
- Error Boundary para manejo de errores

## Pre-requisitos
- Backend corriendo en `localhost:3001`
- Frontend corriendo en `localhost:5173`
- Chrome actualizado
