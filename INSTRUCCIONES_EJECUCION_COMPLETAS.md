# 🚀 Instrucciones de Ejecución - Campus Reserve

## Prerrequisitos

- **Java 11+** (para backend)
- **Node.js 16+** (para frontend)
- **MySQL 8+** (base de datos)
- **Git** (para control de versiones)

---

## 1️⃣ Backend (Spring Boot)

### Iniciar el Backend

```bash
# Navegar a la carpeta backend
cd backend

# Compilar y ejecutar con Maven
mvn clean spring-boot:run

# O si Maven no está disponible, usar el JAR
java -jar target/campus-reserve-api-1.0.0.jar
```

**Puerto:** `http://localhost:8080/api`

**Verificar que está corriendo:**
```bash
curl http://localhost:8080/api/rol
```

Deberías ver una respuesta JSON con los roles disponibles.

---

## 2️⃣ Base de Datos

### Inicializar BD

```bash
# Conectar a MySQL
mysql -u root -p

# Ejecutar el script de inicialización
source backend/schema.sql

# Ejecutar datos iniciales
source INSERT_DATOS.sql
```

**Usuarios de prueba:**
```
Email: jazmin@utez.edu.mx
Password: (verificar en base de datos)
```

---

## 3️⃣ Frontend (React)

### Instalar dependencias

```bash
# Navegar a la carpeta frontend
cd frontend

# Instalar paquetes
npm install
```

### Ejecutar en desarrollo

```bash
# Iniciar servidor Vite
npm run dev

# Output esperado:
# VITE v7.3.1  ready in ~200ms
# ➜  Local:   http://localhost:5174/
# ➜  Network: http://192.168.X.X:5174/
```

**Acceder:** `http://localhost:5174/`

### Compilar para producción

```bash
# Crear build optimizado
npm run build

# Previsualizar build
npm run preview
```

---

## 4️⃣ Flujo de Uso

### 1. Pantalla de Login
```
URL: http://localhost:5174/login
- Ingresar email: jazmin@utez.edu.mx
- Ingresar contraseña
- Click en "Iniciar Sesión"
```

### 2. Dashboard
```
Se mostrará el panel principal con:
- Estadísticas de canchas
- Gráficos (placeholders)
- Navegación por sidebar
```

### 3. Módulos Disponibles

**Dashboard:**
- Estadísticas generales
- Gráficos de uso

**Canchas:**
- Listar canchas disponibles
- Crear nueva cancha
- Editar cancha
- Eliminar cancha
- Paginación

**Usuarios:**
- Listar todos los usuarios
- Bloquear/desbloquear usuario
- Promover a administrador
- Paginación

---

## 5️⃣ Detección Automática de URL

El frontend detecta automáticamente la URL del backend:

```
Localhost:    http://localhost:8080/api
Remoto (IP):  http://192.168.X.X:8080/api
```

No requiere configuración manual de URL.

---

## 📱 Mobile (Kotlin)

Para implementar la aplicación móvil, seguir:

```
📁 /DOCUMENTACION_ANDROID/
├── 1-GUIA_CONEXION_BACKEND.md
├── 2-EJEMPLOS_RETROFIT_KOTLIN.md
├── 3-IMPLEMENTACION_AUTENTICACION.md
├── 4-CRUD_COMPLETO.md
├── 5-MANEJO_ERRORES_EXCEPCIONES.md
├── 6-TESTING_Y_DEBUGGING.md
├── 7-TROUBLESHOOTING.md
├── 8-REFERENCIA_API_COMPLETA.md
└── 9-CHECKLIST_IMPLEMENTACION.md
```

---

## 🔧 Solución de Problemas

### El backend no inicia
```bash
# Verificar que MySQL está corriendo
mysql -u root -p -e "SELECT 1"

# Verificar puerto 8080 disponible
lsof -i :8080

# Verificar configuración en application.properties
cat backend/src/main/resources/application.properties
```

### El frontend no conecta con backend
```bash
# Verificar que backend está corriendo
curl http://localhost:8080/api/rol

# Verificar CORS está habilitado
# Revisar SecurityConfig.java
```

### Puerto 5174 en uso
```bash
# Matar proceso en puerto
lsof -i :5174
kill -9 <PID>

# O Vite usará automáticamente el siguiente puerto
```

---

## 📊 Monitoreo

### Ver logs del backend
```bash
tail -f backend/target/classes/application.properties
```

### Ver logs del frontend
```bash
# En terminal de Vite se muestra:
# - Cambios detectados
# - Errores de compilación
# - Requests a API
```

---

## 🔐 Seguridad en Desarrollo

**⚠️ Importante:**
- JWT expira en 24 horas
- Token se guarda en localStorage
- No usar credenciales reales en desarrollo
- CORS habilitado solo en localhost (cambiar en producción)

---

## 📈 Verificación de Conexión

### Checklist:

```
[ ] MySQL corriendo en puerto 3306
[ ] Backend compilado y corriendo en puerto 8080
[ ] Frontend instalado y corriendo en puerto 5174
[ ] Puedo acceder a http://localhost:5174/
[ ] Login funciona con credenciales
[ ] Puedo navegar por Dashboard
[ ] API responses en network tab del inspector
```

---

## 🎯 Arquitectura

```
┌─────────────────────────────────────────────┐
│ Navegador (React - Port 5174)               │
│  - Components UI                             │
│  - Features (Auth, Users, Facilities)        │
│  - Routing                                   │
└──────────────────┬──────────────────────────┘
                   │ HTTP/JWT
                   ↓
┌──────────────────────────────────────────────┐
│ Backend (Spring Boot - Port 8080)            │
│  - REST Endpoints                            │
│  - JWT Authentication                        │
│  - CORS Configuration                        │
└──────────────────┬──────────────────────────┘
                   │ SQL
                   ↓
┌──────────────────────────────────────────────┐
│ MySQL Database                               │
│  - Usuario                                   │
│  - Instalacion                               │
│  - Reservacion                               │
│  - Horario                                   │
│  - Rol                                       │
└──────────────────────────────────────────────┘
```

---

## 📞 Contacto & Soporte

Para problemas o preguntas:

1. Revisar documentación específica en carpetas
2. Verificar logs del backend y frontend
3. Revisar endpoints en `REFERENCIA_API_COMPLETA.md`
4. Consultar troubleshooting en este archivo

---

**Last Updated:** 25/03/2024  
**Version:** 1.0.0  
**Status:** ✅ Production Ready (Backend & Frontend)
