# ✅ SISTEMA CAMPUS RESERVE - COMPLETAMENTE FUNCIONAL

## 🚀 Estado Actual

```
✅ Backend:    http://localhost:8080/api (CORRIENDO)
✅ Frontend:   http://localhost:5173 (CORRIENDO)
✅ Base Datos: MySQL conectada (FUNCIONANDO)
✅ Login:      Conectado al backend (PROBADO)
✅ Canchas:    Cargan de BD (LISTADAS)
✅ Usuarios:   Cargan de BD (LISTADAS)
```

---

## 📋 Credenciales de Acceso

**Administrador:**
- 📧 Email: `jazminrogel@utez.edu.mx`
- 🔐 Contraseña: `admin123`

**Segundo Admin:**
- 📧 Email: `20233tn194@utez.edu.mx`
- 🔐 Contraseña: `admin123`

---

## ✨ Funcionalidades Implementadas

### 🔐 Login
- ✅ Conexión directa al backend `/api/auth/login`
- ✅ Validación de credenciales en BD (MySQL)
- ✅ Almacenamiento de JWT en localStorage
- ✅ Toggle para mostrar/ocultar contraseña
- ✅ Bloqueo después de 3 intentos fallidos (60 segundos)
- ✅ Alertas con SweetAlert2

### 🏟️ Gestión de Canchas
- ✅ Cargar todas las canchas desde `/api/instalacion`
- ✅ Material Design Cards
- ✅ Mostrar: nombre, descripción, estado, foto
- ✅ Paginación (6 items por página)
- ✅ Validación de archivo: solo JPG, JPEG, PNG
- ✅ Crear, Editar, Eliminar (CRUD)

### 👥 Gestión de Usuarios
- ✅ Cargar todos los usuarios desde `/api/usuario`
- ✅ Mostrar: nombre, email, rol, estado
- ✅ Bloquear/Desbloquear usuarios
- ✅ Cambiar rol (Admin ↔ Usuario)
- ✅ Paginación (6 items por página)
- ✅ Solo administradores pueden acceder

### 🎨 Diseño
- ✅ Material Design
- ✅ Tema personalizado (colores UTEZ)
- ✅ SweetAlert2 para alertas
- ✅ Responsive Design
- ✅ Transiciones suaves

---

## 🛠️ Stack Técnico

### Backend
- Java Spring Boot 3.2.0
- MySQL 8
- JWT para autenticación
- CORS configurado para puerto 5173
- Arquitectura en capas (Controller → Service → Repository)

### Frontend
- React 18 + Vite
- Material Design
- SweetAlert2
- Fetch API con token Bearer

### Base de Datos
- Tabla `usuario` (2 registros)
- Tabla `instalacion` (Canchas)
- Tabla `rol` (Roles del sistema)
- Tabla `reservacion`, `horario`

---

## 🔄 Flujo de Funcionamiento

```
1. Usuario ingresa credenciales en LoginForm
   ↓
2. Frontend envía POST /api/auth/login
   ↓
3. Backend valida en BD y retorna JWT
   ↓
4. Frontend guarda token en localStorage
   ↓
5. Dashboard carga e IniciaSesión
   ↓
6. Usuario puede acceder a Canchas y Usuarios
   ↓
7. Todos los endpoints usan Authorization: Bearer {token}
```

---

## 📦 Servicios Creados

### `apiService.js`
Servicio universal para comunicación HTTP:
- `getInstalaciones()` - Obtener canchas
- `crearInstalacion()` - Crear cancha
- `actualizarInstalacion()` - Editar cancha
- `eliminarInstalacion()` - Eliminar cancha
- `getUsuarios()` - Obtener usuarios
- `actualizarUsuario()` - Editar usuario
- Y más...

### `authService.js`
Servicio de autenticación:
- `login(email, password)` - Login
- `logout()` - Logout
- `getToken()` - Obtener token
- `isAuthenticated()` - Verificar autenticación

---

## 🚀 Ejecutar Sistema

**Terminal 1 - Backend:**
```bash
cd /Users/neardominguez/Desktop/Integradora/backend
java -jar target/campus-reserve-api-1.0.0.jar
```

**Terminal 2 - Frontend:**
```bash
cd /Users/neardominguez/Desktop/Integradora/frontend
npm run dev
```

**Acceso:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api

---

## ✅ Pruebas Realizadas

- ✅ Login con credenciales correctas
- ✅ Bloqueo de login después de 3 intentos
- ✅ Toggle de contraseña visible/oculta
- ✅ Obtención de canchas desde BD
- ✅ Obtención de usuarios desde BD
- ✅ Validación de archivos (solo jpg/jpeg/png)
- ✅ SweetAlert2 para confirmaciones
- ✅ Paginación en canchas y usuarios
- ✅ Material Design implementado
- ✅ CORS funcionando correctamente

---

## 📝 Notas Importantes

1. **JWT Token**: Se guarda en localStorage bajo clave "token"
2. **Solo Administradores**: La aplicación solo permite login de usuarios con rol "Administrador"
3. **CORS**: Backend permite solicitudes desde localhost:5173
4. **Validación de Archivos**: Solo acepta JPG, JPEG, PNG en crear/editar canchas
5. **Material Design**: Todos los componentes usan tema personalizado

---

## 🎯 Próximos Pasos (Opcionales)

- [ ] Agregar búsqueda de canchas/usuarios
- [ ] Exportar datos a Excel/PDF
- [ ] Gráficos de reservaciones
- [ ] Emails de confirmación
- [ ] Notificaciones en tiempo real
- [ ] Validación avanzada de formularios

---

**¡Sistema 100% Funcional! ✨**
