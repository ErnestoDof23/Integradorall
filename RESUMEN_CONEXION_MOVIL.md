# ✅ RESUMEN - Conexión Backend ↔ Android (Kotlin)

## 🎯 Estado Actual

### Backend ✅
- **Puerto:** 8080
- **Contexto:** /api
- **URL Base:** `http://localhost:8080/api` (desarrollo local)
- **Base de Datos:** MySQL conectada ✅
- **CORS:** Habilitado ✅
- **JWT/Autenticación:** Configurado ✅
- **Endpoints públicos:** Configurados ✅

### Verificación de Endpoints

#### Endpoint de Usuarios
```bash
curl http://localhost:8080/api/usuario
```

**Respuesta exitosa (200 OK):**
```json
[
  {
    "idUsuario": 1,
    "nombre": "Jazmin Rogel Arizmendi",
    "correoInstitucional": "jazmín@utez.edu.mx",
    "idRol": 1,
    "rolNombre": "Administrador"
  },
  {
    "idUsuario": 2,
    "nombre": "Ernesto",
    "correoInstitucional": "20233tn194@utez.edu.mx",
    "idRol": 1,
    "rolNombre": "Administrador"
  }
]
```

#### Endpoint de Roles
```bash
curl http://localhost:8080/api/rol
```

**Respuesta exitosa (200 OK):**
```json
[
  {
    "idRol": 1,
    "nombre": "Administrador",
    "descripcion": "Control total del sistema"
  },
  {
    "idRol": 2,
    "nombre": "Usuario",
    "descripcion": "Usuario que realiza reservaciones"
  }
]
```

---

## 📱 Configuración en Android Studio

### 1. Archivo: `build.gradle` (Module: app)

```gradle
dependencies {
    // Retrofit & Networking
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:4.11.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.11.0'
    
    // JSON
    implementation 'com.google.code.gson:gson:2.10.1'
    
    // Kotlin Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.2'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.2'
    
    // Lifecycle
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.2'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.6.2'
    
    // DataStore (para guardar token)
    implementation 'androidx.datastore:datastore-preferences:1.0.0'
}
```

### 2. AndroidManifest.xml

```xml
<manifest ...>
    <!-- Permisos necesarios -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <application ...>
        ...
    </application>
</manifest>
```

---

## 🔗 URLs para Diferentes Entornos

| Entorno | URL |
|---------|-----|
| **Emulador Android Studio** | `http://10.0.2.2:8080/api/` |
| **Dispositivo físico (misma red)** | `http://192.168.X.X:8080/api/` |
| **Localhost (solo backend)** | `http://localhost:8080/api/` |

**Nota:** Para obtener tu IP local en macOS:
```bash
ipconfig getifaddr en0
```

---

## 📚 Endpoints Disponibles para Móvil

### Autenticación
```
POST /api/auth/login
{
  "correoInstitucional": "jazminrogel@utez.edu.mx",
  "password": "password123"
}

Respuesta:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": { ... }
}
```

### Usuarios (Sin autenticación - GET)
```
GET /api/usuario
→ Lista todos los usuarios

GET /api/usuario/{id}
→ Obtiene un usuario específico (requiere token)

POST /api/usuario
→ Crear usuario (requiere token de admin)

PUT /api/usuario/{id}
→ Actualizar usuario (requiere token)

DELETE /api/usuario/{id}
→ Eliminar usuario (requiere token de admin)
```

### Reservaciones
```
GET /api/reservacion
→ Lista todas las reservaciones

GET /api/reservacion/{id}
→ Obtiene una reservación específica

GET /api/reservacion/usuario/{idUsuario}
→ Obtiene reservaciones del usuario (requiere token)

POST /api/reservacion
→ Crear nueva reservación (requiere token)

PUT /api/reservacion/{id}
→ Actualizar reservación (requiere token)

PUT /api/reservacion/{id}/cancelar
→ Cancelar reservación (requiere token)

DELETE /api/reservacion/{id}
→ Eliminar reservación (requiere token)
```

### Instalaciones
```
GET /api/instalacion
→ Lista todas las instalaciones
```

### Horarios
```
GET /api/horario
→ Lista todos los horarios
```

### Roles
```
GET /api/rol
→ Lista todos los roles
```

---

## 🚀 Implementación Rápida en Kotlin

### Paso 1: Crear DTOs

```kotlin
// LoginRequest.kt
data class LoginRequest(
    val correoInstitucional: String,
    val password: String
)

// LoginResponse.kt
data class LoginResponse(
    val token: String,
    val usuario: UsuarioDTO
)

// UsuarioDTO.kt
data class UsuarioDTO(
    val idUsuario: Int,
    val nombre: String,
    val correoInstitucional: String,
    val idRol: Int,
    val rolNombre: String
)
```

### Paso 2: Crear ApiService (Retrofit Interface)

```kotlin
interface ApiService {
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): LoginResponse
    
    @GET("usuario")
    suspend fun getAllUsuarios(): List<UsuarioDTO>
    
    @GET("usuario/{id}")
    suspend fun getUsuarioById(@Path("id") id: Int): UsuarioDTO
}
```

### Paso 3: Crear RetrofitClient

```kotlin
object RetrofitClient {
    private const val BASE_URL = "http://10.0.2.2:8080/api/"
    
    fun getApiService(context: Context): ApiService {
        return Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(createOkHttpClient(context))
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
    
    private fun createOkHttpClient(context: Context): OkHttpClient {
        return OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .addInterceptor { chain ->
                val token = TokenManager.getToken(context)
                val newRequest = chain.request().newBuilder()
                token?.let {
                    newRequest.addHeader("Authorization", "Bearer $it")
                }
                chain.proceed(newRequest.build())
            }
            .build()
    }
}
```

### Paso 4: Usar en Fragment/Activity

```kotlin
class UsuariosFragment : Fragment() {
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        val apiService = RetrofitClient.getApiService(requireContext())
        
        lifecycleScope.launch {
            try {
                val usuarios = apiService.getAllUsuarios()
                usuarios.forEach { usuario ->
                    Log.d("USUARIOS", "${usuario.nombre} - ${usuario.correoInstitucional}")
                }
                // Actualizar UI con datos
            } catch (e: Exception) {
                Log.e("ERROR", "Error al obtener usuarios: ${e.message}")
            }
        }
    }
}
```

---

## 🧪 Pruebas desde Terminal (macOS)

### Test 1: Conectar al Backend
```bash
curl http://localhost:8080/api/rol
```

### Test 2: Listar Usuarios
```bash
curl http://localhost:8080/api/usuario
```

### Test 3: Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "correoInstitucional": "jazminrogel@utez.edu.mx",
    "password": "password123"
  }'
```

### Test 4: Crear Reservación (con token)
```bash
curl -X POST http://localhost:8080/api/reservacion \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "descripcion": "Reservación de cancha",
    "idUsuario": 1,
    "idHorario": 1
  }'
```

---

## 📂 Estructura de Carpetas Recomendada (Android)

```
app/src/main/java/com/example/campusreserve/
├── data/
│   ├── api/
│   │   ├── ApiService.kt          ← Interfaz de Retrofit
│   │   └── RetrofitClient.kt      ← Cliente HTTP
│   ├── model/
│   │   ├── LoginRequest.kt
│   │   ├── LoginResponse.kt
│   │   ├── UsuarioDTO.kt
│   │   ├── ReservacionDTO.kt
│   │   ├── HorarioDTO.kt
│   │   ├── InstalacionDTO.kt
│   │   └── RolDTO.kt
│   ├── repository/
│   │   ├── AuthRepository.kt      ← Lógica de auth
│   │   ├── UsuarioRepository.kt   ← Lógica de usuarios
│   │   └── ReservacionRepository.kt ← Lógica de reservaciones
│   └── TokenManager.kt            ← Gestor de tokens
│
├── ui/
│   ├── auth/
│   │   ├── LoginFragment.kt
│   │   └── LoginViewModel.kt
│   ├── usuarios/
│   │   ├── UsuariosFragment.kt
│   │   └── UsuariosViewModel.kt
│   └── reservaciones/
│       ├── ReservacionesFragment.kt
│       └── ReservacionesViewModel.kt
│
└── MainActivity.kt

app/src/main/AndroidManifest.xml   ← Permisos
```

---

## ⚠️ Problemas Comunes y Soluciones

| Problema | Causa | Solución |
|----------|-------|----------|
| "Unable to resolve host" | URL incorrecta | Usar `10.0.2.2` en emulador |
| "Connection refused" | Backend no corre | Ejecutar `java -jar target/...jar` |
| "401 Unauthorized" | Token expirado | Hacer login nuevamente |
| "403 Forbidden" | Endpoint requiere auth | Incluir token en headers |
| "Timeout" | Conexión lenta | Aumentar timeout en OkHttpClient |
| "JSON parsing error" | Respuesta malformada | Verificar DTOs coincidan con JSON |

---

## 📱 Flujo de Login en Android

```
┌─────────────────────────┐
│  1. Usuario abre app    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ 2. ¿Tiene token guardado?│
└────────────┬────────────┘
             │
        ┌────┴────┐
        │         │
       SÍ         NO
        │         │
        ▼         ▼
   Dashboard   LoginScreen
        │         │
        │    ┌────┴────┐
        │    │ 3. Ingresar │
        │    │ credenciales│
        │    └────┬────┘
        │         │
        │         ▼
        │   ┌──────────────┐
        │   │ POST /login  │
        │   └────┬─────────┘
        │        │
        │        ▼
        │   ┌──────────────────┐
        │   │ Guardar token    │
        │   │ + usuario data   │
        │   └────┬─────────────┘
        │        │
        └────┬───┘
             ▼
        Dashboard
```

---

## 🎯 Checklist Final

### Backend
- [x] SecurityConfig.java actualizado
- [x] Backend recompilado
- [x] Backend corriendo en puerto 8080
- [x] Base de datos conectada
- [x] Endpoints accesibles sin 403
- [x] CORS habilitado

### Android Studio  
- [ ] Dependencias Retrofit agregadas
- [ ] Permisos INTERNET en manifest
- [ ] DTOs creados
- [ ] ApiService creado
- [ ] RetrofitClient configurado
- [ ] TokenManager implementado
- [ ] Repositorios implementados
- [ ] ViewModels implementados
- [ ] Fragmentos conectados
- [ ] Tests de conectividad pasando

### Integración
- [ ] App conecta sin errores
- [ ] Login funciona
- [ ] Usuarios se cargan
- [ ] Reservaciones se cargan
- [ ] Crear/modificar reservaciones funciona

---

## 📖 Documentos Adicionales

- **CONEXION_ANDROID.md** - Guía completa de conexión
- **CODIGO_KOTLIN_EJEMPLOS.kt** - Ejemplos de código listos para usar
- **CONFIG_MOVIL.md** - Configuración detallada

---

## 💡 Tips Importantes

1. **URL del Backend:** 
   - Emulador: `10.0.2.2:8080`
   - Dispositivo: Tu IP local (ej: 192.168.1.100)

2. **Token JWT:**
   - Se obtiene en login
   - Guardarlo en DataStore/SharedPreferences
   - Incluirlo en header `Authorization: Bearer {token}` para requests autenticadas

3. **Errores 403:**
   - Significa que el endpoint requiere autenticación
   - Solución: Incluir token válido en headers

4. **Coroutines:**
   - Usar `lifecycleScope.launch` en Fragments
   - Usar `viewModelScope.launch` en ViewModels
   - Las funciones de API son `suspend` (usan Coroutines)

5. **Debug:**
   - Habilitar `HttpLoggingInterceptor` para ver requests/responses
   - Usar `Log.d()` para debug
   - Ver logs en Android Studio Logcat

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:

1. Verifica que el backend esté corriendo: `lsof -i :8080`
2. Prueba el endpoint desde terminal: `curl http://localhost:8080/api/usuario`
3. Revisa los logs del backend en la terminal
4. En Android, activa HttpLoggingInterceptor para ver las solicitudes
5. Verifica la URL base en RetrofitClient coincida con tu entorno

¡Listo para integrar tu app móvil! 🚀

