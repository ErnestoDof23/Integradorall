# ⚙️ CONFIGURACIÓN NECESARIA PARA MÓVIL - Verificación y Ajustes

## 📊 Estado Actual del Backend

✅ **Backend ejecutando** en puerto 8080  
✅ **Base de Datos MySQL** conectada  
✅ **CORS configurado** para aceptar solicitudes  
✅ **JWT configurado** para autenticación  
✅ **Roles y permisos** en lugar  

⚠️ **Problema encontrado:** Endpoint `/api/usuario` retorna **HTTP 403 Forbidden**  
→ **Causa:** El endpoint requiere autenticación (Bearer Token) pero no está permitido sin token

---

## 🔧 SOLUCIÓN: Agregar endpoints públicos

El endpoint `/api/usuario` necesita un token JWT, pero para tu app móvil necesitas poder listar usuarios sin token.

### Opción 1: Permitir lectura de usuarios sin autenticación (Recomendado para desarrollo)

Edita el archivo `SecurityConfig.java` y modifica esto:

**Archivo:** `/backend/src/main/java/com/integradora/campusreserve/config/SecurityConfig.java`

**Cambio:**
```java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/auth/**").permitAll()
    .requestMatchers("/rol/**").permitAll()
    .requestMatchers("/usuario").permitAll()  // ← AGREGAR ESTA LÍNEA
    .requestMatchers("/horario").permitAll()  // ← AGREGAR ESTA LÍNEA
    .requestMatchers("/instalacion").permitAll()  // ← AGREGAR ESTA LÍNEA
    .anyRequest().authenticated()
)
```

---

## 📋 Pasos para aplicar la solución

### 1. Actualizar SecurityConfig.java

Después de este bloque:
```java
.requestMatchers("/rol/**").permitAll()
```

Agregar:
```java
.requestMatchers("/usuario").permitAll()
.requestMatchers("/horario").permitAll()
.requestMatchers("/instalacion").permitAll()
```

### 2. Recompilar el backend

```bash
cd /Users/neardominguez/Desktop/Integradora/backend
mvn clean package -DskipTests
```

### 3. Reiniciar el backend

```bash
# Matar el proceso anterior
killall java

# Esperar 2 segundos
sleep 2

# Iniciar nuevamente
java -jar target/campus-reserve-api-1.0.0.jar
```

### 4. Verificar que funciona

```bash
# Debería retornar 200 OK en lugar de 403
curl -v http://localhost:8080/api/usuario
```

---

## 🛠️ CONFIGURACIÓN PARA ANDROID

### 1. URL del Backend

**Para Emulador de Android Studio:**
```kotlin
const val BASE_URL = "http://10.0.2.2:8080/api/"
```

**Para Dispositivo Físico (misma red WiFi):**
```kotlin
// Primero, obtén tu IP local
// En terminal macOS: ipconfig getifaddr en0
// Resultado ejemplo: 192.168.1.100

const val BASE_URL = "http://192.168.1.100:8080/api/"
```

### 2. Permisos en AndroidManifest.xml

Agregar estos permisos:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### 3. Estructura recomendada del proyecto Kotlin

```
app/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/campusreserve/
│       │       ├── data/
│       │       │   ├── api/
│       │       │   │   ├── ApiService.kt
│       │       │   │   └── RetrofitClient.kt
│       │       │   ├── model/
│       │       │   │   ├── LoginResponse.kt
│       │       │   │   ├── UsuarioDTO.kt
│       │       │   │   ├── ReservacionDTO.kt
│       │       │   │   └── ... (otros DTOs)
│       │       │   └── repository/
│       │       │       ├── AuthRepository.kt
│       │       │       ├── UsuarioRepository.kt
│       │       │       └── ReservacionRepository.kt
│       │       └── ui/
│       │           ├── auth/
│       │           │   ├── LoginViewModel.kt
│       │           │   └── LoginFragment.kt
│       │           ├── usuarios/
│       │           │   ├── UsuariosViewModel.kt
│       │           │   └── UsuariosFragment.kt
│       │           └── reservaciones/
│       │               ├── ReservacionesViewModel.kt
│       │               └── ReservacionesFragment.kt
│       └── AndroidManifest.xml
└── build.gradle
```

---

## 🔐 Endpoints Ahora Disponibles para Móvil

| Endpoint | Método | Autenticación | Descripción |
|----------|--------|---|---|
| `/auth/login` | POST | ❌ No | Login - obtener token |
| `/usuario` | GET | ❌ No | Listar todos usuarios |
| `/usuario/{id}` | GET | ✅ Sí | Obtener usuario específico |
| `/usuario` | POST | ✅ Sí | Crear usuario (Admin) |
| `/usuario/{id}` | PUT | ✅ Sí | Actualizar usuario |
| `/usuario/{id}` | DELETE | ✅ Sí | Eliminar usuario (Admin) |
| `/reservacion` | GET | ❌ No | Listar reservaciones |
| `/reservacion/{id}` | GET | ❌ No | Obtener reservación |
| `/reservacion/usuario/{id}` | GET | ✅ Sí | Mis reservaciones |
| `/reservacion` | POST | ✅ Sí | Crear reservación |
| `/reservacion/{id}` | PUT | ✅ Sí | Actualizar reservación |
| `/reservacion/{id}/cancelar` | PUT | ✅ Sí | Cancelar reservación |
| `/horario` | GET | ❌ No | Listar horarios |
| `/instalacion` | GET | ❌ No | Listar instalaciones |
| `/rol` | GET | ❌ No | Listar roles |

---

## 📱 Flujo de Autenticación en Android

### 1. Usuario abre app
```
MainActivity → Verificar si tiene token guardado
  ├─ Sí → Ir a DashboardActivity
  └─ No → Ir a LoginActivity
```

### 2. Usuario hace login
```
Usuario ingresa email/password
↓
POST /auth/login
↓
Recibe: { token, usuario }
↓
Guardar token en DataStore/SharedPreferences
↓
Ir a DashboardActivity
```

### 3. Usuario navega en app
```
Cada solicitud incluye: Authorization: Bearer {token}
↓
Backend valida token con JwtTokenProvider
↓
Si válido → Retorna datos
Si inválido → 401 Unauthorized → Ir a LoginActivity
```

### 4. Usuario hace logout
```
Usuario toca "Cerrar sesión"
↓
Limpiar token del almacenamiento
↓
Ir a LoginActivity
```

---

## 🧪 Testing desde Kotlin

### Prueba 1: Conectar al backend

```kotlin
// En onCreate() de MainActivity o en un Fragment
CoroutineScope(Dispatchers.Main).launch {
    try {
        val apiService = RetrofitClient.getApiService(context)
        val roles = apiService.getAllRoles()
        Log.d("CONEXION", "✅ Backend conectado: ${roles.size} roles encontrados")
    } catch (e: Exception) {
        Log.e("CONEXION", "❌ Error: ${e.message}")
    }
}
```

### Prueba 2: Login

```kotlin
CoroutineScope(Dispatchers.Main).launch {
    try {
        val apiService = RetrofitClient.getApiService(context)
        val response = apiService.login(LoginRequest(
            correoInstitucional = "juan@campus.edu",
            password = "password123"
        ))
        Log.d("LOGIN", "✅ Token: ${response.token}")
        Log.d("LOGIN", "✅ Usuario: ${response.usuario.nombre}")
    } catch (e: Exception) {
        Log.e("LOGIN", "❌ Error: ${e.message}")
    }
}
```

### Prueba 3: Listar usuarios

```kotlin
CoroutineScope(Dispatchers.Main).launch {
    try {
        val apiService = RetrofitClient.getApiService(context)
        val usuarios = apiService.getAllUsuarios()
        Log.d("USUARIOS", "✅ ${usuarios.size} usuarios encontrados")
        usuarios.forEach { 
            Log.d("USUARIO", "${it.nombre} - ${it.correoInstitucional}")
        }
    } catch (e: Exception) {
        Log.e("USUARIOS", "❌ Error: ${e.message}")
    }
}
```

---

## 📞 Checklist de Implementación

### Backend
- [ ] SecurityConfig.java actualizado con endpoints públicos
- [ ] Backend recompilado (`mvn clean package -DskipTests`)
- [ ] Backend reiniciado
- [ ] Endpoints retornan 200 OK (sin 403)

### Android Studio
- [ ] Permisos INTERNET agregados a AndroidManifest.xml
- [ ] Dependencias Retrofit agregadas a build.gradle
- [ ] Models/DTOs creados
- [ ] ApiService creado
- [ ] RetrofitClient configurado
- [ ] TokenManager implementado
- [ ] Repositorios creados
- [ ] ViewModels implementados
- [ ] Login Fragment conectado
- [ ] Usuarios Fragment conectado
- [ ] Reservaciones Fragment conectado
- [ ] Pruebas de conectividad pasando

### Integración
- [ ] App conecta al backend sin errores
- [ ] Login funciona y guarda token
- [ ] Usuarios se cargan correctamente
- [ ] Reservaciones se cargan correctamente
- [ ] Crear reservación funciona
- [ ] Cancelar reservación funciona

---

## ⚠️ Problemas Comunes

| Problema | Solución |
|----------|----------|
| "Unable to resolve host" | Emulador: usa `10.0.2.2` / Dispositivo: usa IP local |
| "Connection refused" | Backend no está corriendo en puerto 8080 |
| "401 Unauthorized" | Token expirado o no incluido en headers |
| "403 Forbidden" | Endpoint no autorizado - actualizar SecurityConfig |
| "Timeout" | Aumentar timeout en OkHttpClient a 30 segundos |
| "SSL error" | Usar `http://` no `https://` en desarrollo |

---

## 📖 Siguientes Pasos

1. **Actualizar SecurityConfig.java** con los endpoints públicos
2. **Recompilar el backend** con `mvn clean package`
3. **Reiniciar el backend**
4. **Empezar a implementar** la app en Kotlin
5. **Pruebas de conectividad** con las solicitudes de ejemplo
6. **Deployment** cuando todo funcione

