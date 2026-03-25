# 📱 Guía de Conexión - Android Studio (Kotlin) ↔ Backend Campus Reserve

## ✅ Estado del Backend

- **Puerto:** 8080
- **Context Path:** /api
- **Base URL:** `http://localhost:8080/api`
- **Base URL (Android Emulator):** `http://10.0.2.2:8080/api`
- **CORS:** ✅ Habilitado para todas las solicitudes
- **JWT:** ✅ Configurado
- **Base de Datos:** ✅ MySQL en localhost:3306

---

## 🔌 Configuración de Conexión en Android

### Para Dispositivo Físico en la Red Local
```kotlin
// Si tu máquina local está en la red, obtén tu IP
// En terminal: ipconfig getifaddr en0  (macOS)
// O en Android Studio, usa: 10.0.2.2 para emulador

const val BASE_URL = "http://10.0.2.2:8080/api/"  // Emulador
// const val BASE_URL = "http://192.168.X.X:8080/api/"  // Dispositivo real
```

---

## 📚 Endpoints Disponibles

### 1. **Autenticación**

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "correoInstitucional": "usuario@campus.edu",
  "password": "password123"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "idUsuario": 1,
    "nombre": "Juan Pérez",
    "correoInstitucional": "juan@campus.edu",
    "telefono": "1234567890",
    "rol": {
      "idRol": 2,
      "nombre": "Usuario",
      "descripcion": "Usuario que realiza reservaciones"
    }
  }
}
```

---

### 2. **Gestión de Usuarios**

#### Obtener todos los usuarios
```http
GET /api/usuario

Response (200 OK):
[
  {
    "idUsuario": 1,
    "nombre": "Juan Pérez",
    "correoInstitucional": "juan@campus.edu",
    "telefono": "1234567890",
    "rol": {
      "idRol": 2,
      "nombre": "Usuario"
    }
  }
]
```

#### Obtener usuario por ID
```http
GET /api/usuario/{id}
Authorization: Bearer {token}

Response (200 OK):
{
  "idUsuario": 1,
  "nombre": "Juan Pérez",
  "correoInstitucional": "juan@campus.edu",
  "telefono": "1234567890",
  "rol": { ... }
}
```

#### Crear nuevo usuario
```http
POST /api/usuario
Content-Type: application/json
Authorization: Bearer {token}

{
  "nombre": "María García",
  "correoInstitucional": "maria@campus.edu",
  "password": "password123",
  "telefono": "9876543210",
  "idRol": 2
}

Response (201 Created):
{
  "idUsuario": 3,
  "nombre": "María García",
  "correoInstitucional": "maria@campus.edu",
  "telefono": "9876543210",
  "rol": { ... }
}
```

#### Actualizar usuario
```http
PUT /api/usuario/{id}
Content-Type: application/json
Authorization: Bearer {token}

{
  "nombre": "Juan Pérez Actualizado",
  "telefono": "5555555555"
}

Response (200 OK):
{ ... datos actualizados ... }
```

#### Eliminar usuario
```http
DELETE /api/usuario/{id}
Authorization: Bearer {token}

Response (204 No Content)
```

---

### 3. **Gestión de Reservaciones**

#### Obtener todas las reservaciones
```http
GET /api/reservacion

Response (200 OK):
[
  {
    "idReservacion": 1,
    "descripcion": "Reservación de cancha para futbol",
    "estado": "Confirmada",
    "fechaReservacion": "2024-03-25T10:30:00",
    "usuario": { ... },
    "horario": { ... }
  }
]
```

#### Obtener reservaciones por usuario
```http
GET /api/reservacion/usuario/{idUsuario}
Authorization: Bearer {token}
```

#### Obtener reservaciones por estado
```http
GET /api/reservacion/estado/{estado}

Estados válidos: Pendiente, Confirmada, Cancelada, Completada
```

#### Crear nueva reservación
```http
POST /api/reservacion
Content-Type: application/json
Authorization: Bearer {token}

{
  "descripcion": "Reservación de cancha para futbol",
  "idUsuario": 1,
  "idHorario": 1
}

Response (201 Created):
{
  "idReservacion": 5,
  "descripcion": "Reservación de cancha para futbol",
  "estado": "Pendiente",
  "fechaReservacion": "2024-03-25T14:30:00",
  "usuario": { ... },
  "horario": { ... }
}
```

#### Actualizar reservación
```http
PUT /api/reservacion/{id}
Content-Type: application/json
Authorization: Bearer {token}

{
  "descripcion": "Nueva descripción",
  "estado": "Confirmada"
}
```

#### Cancelar reservación
```http
PUT /api/reservacion/{id}/cancelar
Authorization: Bearer {token}

Response (200 OK):
{ "estado": "Cancelada", ... }
```

#### Eliminar reservación
```http
DELETE /api/reservacion/{id}
Authorization: Bearer {token}

Response (204 No Content)
```

---

### 4. **Gestión de Instalaciones**

#### Obtener todas las instalaciones
```http
GET /api/instalacion

Response (200 OK):
[
  {
    "idInstalacion": 1,
    "nombre": "Cancha 1",
    "descripcion": "Cancha de futbol",
    "ubicacion": "Bloque A",
    "capacidad": 50,
    "estado": true
  }
]
```

---

### 5. **Gestión de Horarios**

#### Obtener todos los horarios
```http
GET /api/horario

Response (200 OK):
[
  {
    "idHorario": 1,
    "horaInicio": "08:00:00",
    "horaFin": "09:00:00",
    "estado": true,
    "instalacion": { ... }
  }
]
```

---

### 6. **Gestión de Roles**

#### Obtener todos los roles
```http
GET /api/rol

Response (200 OK):
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

## 🔐 Autenticación y Autorización

### Headers Requeridos

```kotlin
// Para solicitudes autenticadas, incluir:
headers: {
  "Authorization": "Bearer $token",
  "Content-Type": "application/json"
}
```

### Flujo de Autenticación

1. **Login:** POST `/auth/login` con credenciales
2. **Recibir:** Token JWT en la respuesta
3. **Guardar:** Token en SharedPreferences o DataStore
4. **Usar:** Incluir token en header `Authorization: Bearer {token}` para todas las solicitudes protegidas
5. **Renovar:** Si el token expira (86400000 ms = 24 horas), el usuario debe hacer login nuevamente

---

## 🛠️ Configuración de Retrofit en Kotlin

### 1. build.gradle (Module: app)

```gradle
dependencies {
    // Retrofit
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:4.11.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.11.0'
    
    // JSON parsing
    implementation 'com.google.code.gson:gson:2.10.1'
    
    // Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.2'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.2'
    
    // LiveData & ViewModel
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.2'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.6.2'
}
```

### 2. ApiService.kt

```kotlin
import retrofit2.http.*
import kotlinx.coroutines.flow.Flow

interface ApiService {
    
    // ============ Auth ============
    @POST("auth/login")
    suspend fun login(@Body loginRequest: LoginRequest): LoginResponse
    
    // ============ Usuarios ============
    @GET("usuario")
    suspend fun getAllUsuarios(): List<UsuarioDTO>
    
    @GET("usuario/{id}")
    suspend fun getUsuarioById(@Path("id") id: Int): UsuarioDTO
    
    @POST("usuario")
    suspend fun createUsuario(@Body usuario: UsuarioDTO): UsuarioDTO
    
    @PUT("usuario/{id}")
    suspend fun updateUsuario(@Path("id") id: Int, @Body usuario: UsuarioDTO): UsuarioDTO
    
    @DELETE("usuario/{id}")
    suspend fun deleteUsuario(@Path("id") id: Int)
    
    // ============ Reservaciones ============
    @GET("reservacion")
    suspend fun getAllReservaciones(): List<ReservacionDTO>
    
    @GET("reservacion/{id}")
    suspend fun getReservacionById(@Path("id") id: Int): ReservacionDTO
    
    @GET("reservacion/usuario/{idUsuario}")
    suspend fun getReservacionesByUsuario(@Path("idUsuario") idUsuario: Int): List<ReservacionDTO>
    
    @GET("reservacion/estado/{estado}")
    suspend fun getReservacionesByEstado(@Path("estado") estado: String): List<ReservacionDTO>
    
    @POST("reservacion")
    suspend fun createReservacion(@Body reservacion: ReservacionDTO): ReservacionDTO
    
    @PUT("reservacion/{id}")
    suspend fun updateReservacion(@Path("id") id: Int, @Body reservacion: ReservacionDTO): ReservacionDTO
    
    @PUT("reservacion/{id}/cancelar")
    suspend fun cancelarReservacion(@Path("id") id: Int): ReservacionDTO
    
    @DELETE("reservacion/{id}")
    suspend fun deleteReservacion(@Path("id") id: Int)
    
    // ============ Instalaciones ============
    @GET("instalacion")
    suspend fun getAllInstalaciones(): List<InstalacionDTO>
    
    // ============ Horarios ============
    @GET("horario")
    suspend fun getAllHorarios(): List<HorarioDTO>
    
    // ============ Roles ============
    @GET("rol")
    suspend fun getAllRoles(): List<RolDTO>
}
```

### 3. RetrofitClient.kt

```kotlin
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import android.content.Context
import androidx.datastore.preferences.preferencesDataStore
import java.util.concurrent.TimeUnit

private val Context.dataStore by preferencesDataStore(name = "settings")

object RetrofitClient {
    
    private const val BASE_URL = "http://10.0.2.2:8080/api/" // Emulador
    // private const val BASE_URL = "http://192.168.X.X:8080/api/" // Dispositivo real
    
    private var apiService: ApiService? = null
    
    fun getApiService(context: Context): ApiService {
        if (apiService == null) {
            apiService = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(createOkHttpClient(context))
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(ApiService::class.java)
        }
        return apiService!!
    }
    
    private fun createOkHttpClient(context: Context): OkHttpClient {
        return OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .addInterceptor(createAuthInterceptor(context))
            .addInterceptor(HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BODY
            })
            .build()
    }
    
    private fun createAuthInterceptor(context: Context): okhttp3.Interceptor {
        return okhttp3.Interceptor { chain ->
            val token = TokenManager.getToken(context)
            val originalRequest = chain.request()
            
            val requestBuilder = originalRequest.newBuilder()
            token?.let {
                requestBuilder.addHeader("Authorization", "Bearer $it")
            }
            
            val newRequest = requestBuilder.build()
            chain.proceed(newRequest)
        }
    }
}
```

### 4. TokenManager.kt

```kotlin
import android.content.Context
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first

private val Context.dataStore by preferencesDataStore(name = "app_prefs")

object TokenManager {
    private val TOKEN_KEY = stringPreferencesKey("auth_token")
    private val USER_ID_KEY = stringPreferencesKey("user_id")
    
    suspend fun saveToken(context: Context, token: String) {
        context.dataStore.edit { preferences ->
            preferences[TOKEN_KEY] = token
        }
    }
    
    fun getToken(context: Context): String? {
        return try {
            val preferences = context.dataStore.data.runBlocking {
                first()
            }
            preferences[TOKEN_KEY]
        } catch (e: Exception) {
            null
        }
    }
    
    suspend fun clearToken(context: Context) {
        context.dataStore.edit { preferences ->
            preferences.remove(TOKEN_KEY)
            preferences.remove(USER_ID_KEY)
        }
    }
}
```

### 5. Modelos de Datos (DTOs)

```kotlin
import com.google.gson.annotations.SerializedName

data class LoginRequest(
    @SerializedName("correoInstitucional")
    val correoInstitucional: String,
    val password: String
)

data class LoginResponse(
    val token: String,
    val usuario: UsuarioDTO
)

data class UsuarioDTO(
    val idUsuario: Int? = null,
    val nombre: String,
    val correoInstitucional: String,
    val password: String? = null,
    val telefono: String,
    val rol: RolDTO? = null
)

data class RolDTO(
    val idRol: Int,
    val nombre: String,
    val descripcion: String? = null
)

data class ReservacionDTO(
    val idReservacion: Int? = null,
    val descripcion: String,
    val estado: String = "Pendiente",
    val fechaReservacion: String? = null,
    val idUsuario: Int,
    val idHorario: Int,
    val usuario: UsuarioDTO? = null,
    val horario: HorarioDTO? = null
)

data class HorarioDTO(
    val idHorario: Int,
    val horaInicio: String,
    val horaFin: String,
    val estado: Boolean,
    val instalacion: InstalacionDTO? = null
)

data class InstalacionDTO(
    val idInstalacion: Int,
    val nombre: String,
    val descripcion: String,
    val ubicacion: String,
    val capacidad: Int,
    val estado: Boolean
)
```

---

## 📡 Ejemplo de Uso en ViewModel

```kotlin
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import android.content.Context

class AuthViewModel(private val context: Context) : ViewModel() {
    
    private val apiService = RetrofitClient.getApiService(context)
    
    fun login(correo: String, password: String) {
        viewModelScope.launch {
            try {
                val response = apiService.login(
                    LoginRequest(correo, password)
                )
                TokenManager.saveToken(context, response.token)
                // Actualizar UI con datos del usuario
                _uiState.value = UiState.Success(response.usuario)
            } catch (e: Exception) {
                _uiState.value = UiState.Error(e.message ?: "Error desconocido")
            }
        }
    }
    
    fun getUsuarios() {
        viewModelScope.launch {
            try {
                val usuarios = apiService.getAllUsuarios()
                _usuariosList.value = usuarios
            } catch (e: Exception) {
                _errorMessage.value = e.message ?: "Error al obtener usuarios"
            }
        }
    }
    
    fun getReservacionesByUsuario(idUsuario: Int) {
        viewModelScope.launch {
            try {
                val reservaciones = apiService.getReservacionesByUsuario(idUsuario)
                _reservacionesList.value = reservaciones
            } catch (e: Exception) {
                _errorMessage.value = e.message ?: "Error al obtener reservaciones"
            }
        }
    }
}
```

---

## 🧪 Pruebas de Conectividad

### Desde Android Studio (Emulador)

```kotlin
// En un Activity o Fragment
private fun testBackendConnection() {
    viewModelScope.launch {
        try {
            val roles = apiService.getAllRoles()
            Log.d("CONEXION", "Roles obtenidos: $roles")
            // Backend funciona correctamente ✅
        } catch (e: Exception) {
            Log.e("CONEXION", "Error: ${e.message}")
            // Verificar que el backend esté corriendo
            // Verificar que usas 10.0.2.2 en emulador
        }
    }
}
```

---

## 🚀 Checklist de Implementación

- [ ] Backend corriendo en puerto 8080
- [ ] MySQL conectada correctamente
- [ ] CORS configurado (ya está)
- [ ] JWT configurado (ya está)
- [ ] Dependencias Retrofit agregadas en gradle
- [ ] ApiService creado con todos los endpoints
- [ ] RetrofitClient configurado
- [ ] TokenManager para guardar JWT
- [ ] Modelos de datos (DTOs) creados
- [ ] Login implementado
- [ ] Pantalla de usuarios conectada
- [ ] Pantalla de reservaciones conectada
- [ ] Manejo de errores implementado
- [ ] Tests de conectividad pasando

---

## ❓ Solución de Problemas

| Problema | Solución |
|----------|----------|
| "Unable to resolve host" | Usar `10.0.2.2` en emulador, IP real en dispositivo físico |
| "Connection refused" | Verificar que backend esté corriendo en puerto 8080 |
| "401 Unauthorized" | Token expirado o no incluido en headers |
| "CORS error" | Ya está configurado en backend |
| "Connection timeout" | Aumentar timeout en OkHttpClient |

---

## 📞 Soporte

¿Problemas de conexión? Verifica:
1. Backend corriendo: `lsof -i :8080`
2. Base de datos conectada: Revisa logs del backend
3. Token válido: Verificar expiración (24 horas)
4. URL correcta: `10.0.2.2:8080` (emulador) vs IP real (dispositivo)

