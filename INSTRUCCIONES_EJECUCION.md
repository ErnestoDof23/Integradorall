# 🚀 Instrucciones de Ejecución - Campus Reserve

## Credenciales de Acceso

### Usuario Administrador
- **Email:** `admin@campus.com`
- **Contraseña:** `password123`
- **Rol:** Administrador

### Usuario Regular (para pruebas)
- **Email:** `usuario@campus.com`
- **Contraseña:** `password123`
- **Rol:** Usuario

---

## 📋 Requisitos Previos

### Backend (Java + Spring Boot)
- Java 17 o superior (instalado: Java 25.0.1)
- Maven 3.11.0 o superior
- MySQL 8.x ejecutándose en `localhost:3306`

### Frontend (React + Vite)
- Node.js 16+ 
- npm o yarn

### Base de Datos
- MySQL corriendo
- Usuario: `root`
- Contraseña: `rootroot`

---

## 🔧 Configuración Inicial

### 1. Base de Datos MySQL

Asegúrate de que MySQL esté corriendo. Si no está, inicia el servicio:

```bash
# macOS (con Homebrew)
brew services start mysql

# O si está instalado localmente
/usr/local/mysql/support-files/mysql.server start
```

Verifica que MySQL esté corriendo:
```bash
mysql -u root -prootroot -e "SELECT 1;"
```

---

## ▶️ Ejecutar la Aplicación

### **Opción 1: Terminal separadas (Recomendado para desarrollo)**

#### Terminal 1: Backend (Puerto 8080)
```bash
cd /Users/neardominguez/Desktop/Integradora/backend
java -jar target/campus-reserve-api-1.0.0.jar
```

O si prefieres compilar y ejecutar:
```bash
cd /Users/neardominguez/Desktop/Integradora/backend
mvn clean package -DskipTests
java -jar target/campus-reserve-api-1.0.0.jar
```

**Espera a ver:** `Tomcat started on port 8080 (http) with context path '/api'`

#### Terminal 2: Frontend (Puerto 5173)
```bash
cd /Users/neardominguez/Desktop/Integradora/frontend
npm install
npm run dev
```

**Espera a ver:** `Local: http://localhost:5173/`

---

### **Opción 2: Una sola terminal (Ejecutar ambos en background)**

```bash
# Backend en background
cd /Users/neardominguez/Desktop/Integradora/backend && \
nohup java -jar target/campus-reserve-api-1.0.0.jar > /tmp/backend.log 2>&1 &

sleep 3

# Frontend en background
cd /Users/neardominguez/Desktop/Integradora/frontend && \
npm run dev > /tmp/frontend.log 2>&1 &

echo "Backend corriendo en: http://localhost:8080/api"
echo "Frontend corriendo en: http://localhost:5173"
```

---

## 🌐 Acceso a la Aplicación

Una vez que ambos servidores estén corriendo:

1. **Abre tu navegador** y ve a: http://localhost:5173

2. **Inicia sesión** con:
   - Email: `admin@campus.com`
   - Contraseña: `password123`

3. ¡**Listo!** Ya deberías ver el Dashboard

---

## 📝 Endpoints del API

### Autenticación
- `POST /api/auth/login` - Login de usuario

### Usuarios
- `GET /api/usuario` - Listar todos los usuarios
- `GET /api/usuario/{id}` - Obtener usuario por ID
- `POST /api/usuario` - Crear nuevo usuario
- `PUT /api/usuario/{id}` - Actualizar usuario
- `DELETE /api/usuario/{id}` - Eliminar usuario

### Instalaciones
- `GET /api/instalacion` - Listar todas las instalaciones
- `GET /api/instalacion/{id}` - Obtener instalación por ID
- `POST /api/instalacion` - Crear nueva instalación
- `PUT /api/instalacion/{id}` - Actualizar instalación
- `DELETE /api/instalacion/{id}` - Eliminar instalación

### Horarios
- `GET /api/horario` - Listar todos los horarios
- `GET /api/horario/{id}` - Obtener horario por ID
- `POST /api/horario` - Crear nuevo horario
- `PUT /api/horario/{id}` - Actualizar horario
- `DELETE /api/horario/{id}` - Eliminar horario

### Reservaciones
- `GET /api/reservacion` - Listar todas las reservaciones
- `GET /api/reservacion/{id}` - Obtener reservación por ID
- `POST /api/reservacion` - Crear nueva reservación
- `PUT /api/reservacion/{id}` - Actualizar reservación
- `DELETE /api/reservacion/{id}` - Eliminar reservación

---

## 🐛 Troubleshooting

### Backend no inicia
```bash
# Verifica que MySQL esté corriendo
mysql -u root -prootroot -e "SELECT 1;"

# Verifica que el puerto 8080 esté disponible
lsof -i :8080

# Si está ocupado, mata el proceso
kill -9 <PID>
```

### Frontend no inicia
```bash
# Borra node_modules y reinstala
cd /Users/neardominguez/Desktop/Integradora/frontend
rm -rf node_modules
npm install
npm run dev
```

### CORS error
Si ves errores de CORS, asegúrate que:
- Backend está corriendo en `http://localhost:8080`
- Frontend está corriendo en `http://localhost:5173`
- Backend tiene CORS configurado (ya está configurado)

### Credenciales inválidas en login
- Verifica que el usuario `admin@campus.com` existe en la BD
- Verifica que la contraseña sea exactamente `password123`

---

## 📊 Datos de Prueba

La BD incluye:

**Roles:**
- Administrador (id: 1)
- Usuario (id: 2)

**Usuario Admin:**
- ID: 1
- Email: admin@campus.com
- Contraseña: password123 (hasheada)
- Rol: Administrador

**Instalaciones:**
1. Cancha de Fútbol
2. Cancha de Voleibol

**Horarios:**
- Cancha Fútbol: 08:00-09:00 (20/03/2026)
- Cancha Voleibol: 10:00-11:00 (20/03/2026)

---

## 📚 Validaciones de Negocio (Triggers MySQL)

El sistema implementa las siguientes validaciones automáticas en la BD:

1. **No se pueden reservar el mismo horario dos veces** - Trigger: `validar_reservacion_duplicada`
2. **No se pueden crear horarios que se traslapen en la misma instalación** - Trigger: `validar_traslape_horario`
3. **Las reservaciones solo se permiten entre 7am y 7pm** - Trigger: `validar_horario_reserva`
4. **Los horarios deben estar entre 7am y 7pm** - Trigger: `validar_horario_instalacion`
5. **Al reservar un horario, la instalación cambia a estado "Reservado"** - Trigger: `actualizar_estado_instalacion`

---

## 🔑 Variables de Entorno (Opcional)

Si quieres cambiar la configuración, edita:

**Backend:** `/Users/neardominguez/Desktop/Integradora/backend/src/main/resources/application.properties`

```properties
# Cambiar puerto del servidor
server.port=8080

# Cambiar contexto del API
server.servlet.context-path=/api

# Cambiar datos de conexión a BD
spring.datasource.url=jdbc:mysql://localhost:3306/campusReserve
spring.datasource.username=root
spring.datasource.password=rootroot
```

**Frontend:** `/Users/neardominguez/Desktop/Integradora/frontend/src/Components/LoginForm.jsx`

```javascript
const API_BASE_URL = 'http://localhost:8080/api'; // Cambiar aquí
```

---

## ✅ Verificación

Para verificar que todo está funcionando:

```bash
# Verificar que MySQL está corriendo
mysql -u root -prootroot -e "USE campusReserve; SELECT COUNT(*) FROM usuario;"

# Verificar que Backend responde
curl http://localhost:8080/api/rol

# Verificar que Frontend está corriendo
curl http://localhost:5173
```

---

## 🎉 ¡Listo!

Si seguiste todos los pasos, deberías:
- ✅ Backend corriendo en puerto 8080
- ✅ Frontend corriendo en puerto 5173
- ✅ Poder hacer login con `admin@campus.com` / `password123`
- ✅ Ver el Dashboard con la lista de usuarios, instalaciones, horarios y reservaciones

¿Necesitas ayuda? Revisa los logs:
```bash
tail -50 /tmp/backend.log  # Backend
tail -50 /tmp/frontend.log # Frontend
```
