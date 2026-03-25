# 🎓 Campus Reserve - Sistema Completo Listo para Ejecutar

> **Estado:** ✅ COMPILADO Y LISTO PARA USAR
> **Backend:** Java 25 + Spring Boot 3.2.0 + MySQL
> **Frontend:** React + Vite

---

## 🔐 Credenciales de Acceso

### Administrador Principal
```
Email:    admin@campus.com
Password: password123
Rol:      Administrador
```

---

## ⚡ Inicio Rápido (2 pasos)

### Paso 1: Asegúrate que MySQL esté corriendo
```bash
mysql -u root -prootroot -e "SELECT 1;"
```

Si MySQL no está corriendo:
```bash
brew services start mysql
```

### Paso 2: Ejecuta el script de inicio
```bash
bash /Users/neardominguez/Desktop/Integradora/run.sh
```

El script iniciará:
- ✅ Backend en puerto **8080** → http://localhost:8080/api
- ✅ Frontend en puerto **5173** → http://localhost:5173

---

## 📍 Ubicaciones de los Archivos

```
/Users/neardominguez/Desktop/Integradora/
├── backend/
│   ├── target/campus-reserve-api-1.0.0.jar  ← JAR compilado
│   └── src/main/resources/application.properties
├── frontend/
│   └── src/services/apiService.js  ← Conexión con API
├── INSTRUCCIONES_EJECUCION.md  ← Guía completa
└── run.sh  ← Script de inicio automático
```

---

## 🗄️ Base de Datos

**Nombre:** `campusReserve`
**Usuario:** `root`
**Contraseña:** `rootroot`

Tablas creadas:
- ✅ `rol`
- ✅ `usuario`
- ✅ `instalacion`
- ✅ `horario`
- ✅ `reservacion`

Con todos los triggers de validación configurados.

---

## 📊 Acceso a la Plataforma

1. **Abre** http://localhost:5173 en tu navegador
2. **Ingresa:**
   - Email: `admin@campus.com`
   - Contraseña: `password123`
3. **¡Listo!** Verás el Dashboard

---

## 🛣️ Rutas Disponibles

### Usuarios
- `GET /api/usuario` - Listar todos
- `POST /api/usuario` - Crear nuevo

### Instalaciones (Canchas)
- `GET /api/instalacion` - Listar todas
- `POST /api/instalacion` - Crear nueva

### Horarios
- `GET /api/horario` - Listar todos
- `POST /api/horario` - Crear nuevo

### Reservaciones
- `GET /api/reservacion` - Listar todas
- `POST /api/reservacion` - Crear nueva

### Roles
- `GET /api/rol` - Listar roles

---

## 🧪 Pruebas Rápidas

### Test de Backend
```bash
curl http://localhost:8080/api/rol
```

### Test de Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"correoInstitucional":"admin@campus.com","password":"password123"}'
```

---

## 🔧 Configuración

### Cambiar puerto del API
Edita: `/Users/neardominguez/Desktop/Integradora/backend/src/main/resources/application.properties`
```properties
server.port=8080  # Cambiar aquí
```

### Cambiar URL del Backend (Frontend)
Edita: `/Users/neardominguez/Desktop/Integradora/frontend/src/Components/LoginForm.jsx`
```javascript
const API_BASE_URL = 'http://localhost:8080/api';  // Cambiar aquí
```

---

## 🐛 Troubleshooting

### Backend no inicia
```bash
# Verifica MySQL
mysql -u root -prootroot -e "SELECT 1;"

# Limpia y recompila
cd /Users/neardominguez/Desktop/Integradora/backend
mvn clean package -DskipTests

# Ejecuta manualmente
java -jar target/campus-reserve-api-1.0.0.jar
```

### Frontend muestra error de conexión
1. Verifica que Backend está corriendo: http://localhost:8080/api/rol
2. Verifica CORS está habilitado (ya está configurado)
3. Abre la consola del navegador (F12) para ver errores

### Puerto ocupado
```bash
# Ver procesos en puerto 8080
lsof -i :8080

# Matar proceso si es necesario
kill -9 <PID>
```

---

## 📚 Tecnologías Usadas

### Backend
- **Spring Boot 3.2.0** - Framework web
- **Spring Data JPA** - ORM
- **Spring Security** - Autenticación
- **MySQL 8.x** - Base de datos
- **Lombok 1.18.40** - Generación de código
- **JJWT 0.12.3** - JWT tokens
- **Maven 3.11.0** - Build tool

### Frontend
- **React 18** - UI Framework
- **Vite** - Build tool
- **SweetAlert2** - Notificaciones
- **Fetch API** - HTTP client

---

## 🎯 Características Implementadas

✅ Autenticación con JWT
✅ Control de acceso por roles
✅ CRUD completo de usuarios
✅ CRUD completo de instalaciones
✅ CRUD completo de horarios
✅ CRUD completo de reservaciones
✅ Validaciones en BD (Triggers)
✅ Manejo de errores
✅ Interfaz Material Design
✅ Responsive Design

---

## 📞 Soporte

Si algo no funciona:
1. Revisa los logs: `tail -f /tmp/backend.log` o `tail -f /tmp/frontend.log`
2. Verifica que MySQL está corriendo
3. Verifica los puertos (8080 y 5173)
4. Revisa la consola del navegador (F12)

---

## ✨ ¡Listo para Usar!

Todo está compilado y configurado. Solo necesitas:
1. MySQL corriendo
2. Ejecutar el script `run.sh`
3. Acceder a http://localhost:5173

**¡Disfruta tu aplicación Campus Reserve!** 🚀
