# 📋 CHECKLIST DE IMPLEMENTACIÓN - Backend ↔ Android Kotlin

## ✅ PARTE 1: CONFIGURAR BACKEND (YA HECHO ✓)

- [x] SecurityConfig.java actualizado (permite endpoints públicos)
- [x] Backend recompilado con `mvn clean package`
- [x] Backend ejecutando en puerto 8080
- [x] Base de datos MySQL conectada
- [x] CORS habilitado para todas las solicitudes
- [x] JWT configurado para autenticación
- [x] Endpoints probados y funcionando

**Estado:** ✅ **LISTO PARA USAR**

```bash
# Verificar que todo funciona
curl http://localhost:8080/api/rol
curl http://localhost:8080/api/usuario
curl http://localhost:8080/api/reservacion
```

---

## 📱 PARTE 2: CONFIGURAR ANDROID STUDIO

### PASO 1: Agregar Dependencias (5 min)

Archivo: `build.gradle` (Module: app)

```gradle
dependencies {
    // Retrofit
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    
    // OkHttp
    implementation 'com.squareup.okhttp3:okhttp:4.11.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.11.0'
    
    // Gson
    implementation 'com.google.code.gson:gson:2.10.1'
    
    // Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.2'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.2'
    
    // Lifecycle
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.2'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.6.2'
    
    // DataStore
    implementation 'androidx.datastore:datastore-preferences:1.0.0'
}
```

**Checklist:**
- [ ] Copiar las dependencias
- [ ] Pegar en `build.gradle` (Module: app)
- [ ] Sync Now en Android Studio
- [ ] Sin errores

---

### PASO 2: Agregar Permisos (2 min)

Archivo: `AndroidManifest.xml`

```xml
<manifest ...>
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <application ...>
        ...
    </application>
</manifest>
```

**Checklist:**
- [ ] Permisos agregados
- [ ] Sin errores de compilación

---

### PASO 3: Crear Carpeta de Estructura (1 min)

En `app/src/main/java/com/example/campusreserve/` crear:

```
data/
  ├── api/
  ├── model/
  ├── repository/
  └── TokenManager.kt

ui/
  ├── auth/
  ├── usuarios/
  └── reservaciones/
```

**Checklist:**
- [ ] Carpetas creadas

---

### PASO 4: Crear DTOs (5 min)

Archivo: `data/model/DTOs.kt`

```kotlin
package com.example.campusreserve.data.model

data class LoginRequest(
    val correoInstitucional: String,
    val password: String
)

data class LoginResponse(
    val token: String,
    val usuario: UsuarioDTO
)

data class UsuarioDTO(
    val idUsuario: Int,
    val nombre: String,
    val correoInstitucional: String,
    val idRol: Int,
    val rolNombre: String
)

data class RolDTO(
    val idRol: Int,
    val nombre: String,
    val descripcion: String? = null
)

data class ReservacionDTO(
    val idReservacion: Int? = null,
    val descripcion: String = "",
    val estado: String = "Pendiente",
    val fechaReservacion: String? = null,
    val idUsuario: Int = 0,
    val idHorario: Int = 0
)

data class HorarioDTO(
    val idHorario: Int,
    val horaInicio: String,
    val horaFin: String,
    val estado: Boolean
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

**Checklist:**
- [ ] Archivo creado
- [ ] DTOs copiados
- [ ] Sin errores

---

### PASO 5: Crear ApiService (3 min)

Archivo: `data/api/ApiService.kt`

```kotlin
package com.example.campusreserve.data.api

import retrofit2.http.*
import com.example.campusreserve.data.model.*

interface ApiService {
    
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): LoginResponse
    
    @GET("usuario")
    suspend fun getAllUsuarios(): List<UsuarioDTO>
    
    @GET("usuario/{id}")
    suspend fun getUsuarioById(@Path("id") id: Int): UsuarioDTO
    
    @GET("reservacion")
    suspend fun getAllReservaciones(): List<ReservacionDTO>
    
    @GET("reservacion/usuario/{idUsuario}")
    suspend fun getReservacionesByUsuario(@Path("idUsuario") id: Int): List<ReservacionDTO>
    
    @POST("reservacion")
    suspend fun createReservacion(@Body reservacion: ReservacionDTO): ReservacionDTO
    
    @GET("horario")
    suspend fun getAllHorarios(): List<HorarioDTO>
    
    @GET("instalacion")
    suspend fun getAllInstalaciones(): List<InstalacionDTO>
    
    @GET("rol")
    suspend fun getAllRoles(): List<RolDTO>
}
```

**Checklist:**
- [ ] Archivo creado
- [ ] Interfaz copiada
- [ ] Sin errores

---

### PASO 6: Crear RetrofitClient (3 min)

Archivo: `data/api/RetrofitClient.kt`

```kotlin
package com.example.campusreserve.data.api

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import android.content.Context
import android.util.Log
import java.util.concurrent.TimeUnit

object RetrofitClient {
    
    // ⚠️ IMPORTANTE: Cambiar según tu entorno
    // Emulador: 10.0.2.2
    // Dispositivo real: Tu IP local (ej: 192.168.1.100)
    private const val BASE_URL = "http://10.0.2.2:8080/api/"
    
    private var apiService: ApiService? = null
    
    fun getApiService(context: Context): ApiService {
        if (apiService == null) {
            val okHttpClient = OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .addInterceptor(createAuthInterceptor(context))
                .addInterceptor(HttpLoggingInterceptor { message ->
                    Log.d("OkHttp", message)
                }.apply {
                    level = HttpLoggingInterceptor.Level.BODY
                })
                .build()
            
            apiService = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(okHttpClient)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(ApiService::class.java)
        }
        return apiService!!
    }
    
    private fun createAuthInterceptor(context: Context): okhttp3.Interceptor {
        return okhttp3.Interceptor { chain ->
            val token = TokenManager.getToken(context)
            val newRequest = chain.request().newBuilder()
            token?.let {
                newRequest.addHeader("Authorization", "Bearer $it")
            }
            chain.proceed(newRequest.build())
        }
    }
}
```

**Checklist:**
- [ ] Archivo creado
- [ ] URL configurada correctamente
- [ ] Sin errores

---

### PASO 7: Crear TokenManager (3 min)

Archivo: `data/TokenManager.kt`

```kotlin
package com.example.campusreserve.data

import android.content.Context
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking

private val Context.dataStore by preferencesDataStore(name = "campus_reserve")

object TokenManager {
    private val TOKEN_KEY = stringPreferencesKey("token")
    private val USER_ID_KEY = stringPreferencesKey("user_id")
    private val USER_NAME_KEY = stringPreferencesKey("user_name")
    
    suspend fun saveToken(context: Context, token: String) {
        context.dataStore.edit { it[TOKEN_KEY] = token }
    }
    
    fun getToken(context: Context): String? {
        return try {
            runBlocking {
                context.dataStore.data.first()[TOKEN_KEY]
            }
        } catch (e: Exception) {
            null
        }
    }
    
    suspend fun saveUserInfo(context: Context, id: Int, name: String) {
        context.dataStore.edit { 
            it[USER_ID_KEY] = id.toString()
            it[USER_NAME_KEY] = name
        }
    }
    
    fun getUserId(context: Context): Int? {
        return runBlocking {
            context.dataStore.data.first()[USER_ID_KEY]?.toIntOrNull()
        }
    }
    
    suspend fun clearAll(context: Context) {
        context.dataStore.edit { it.clear() }
    }
}
```

**Checklist:**
- [ ] Archivo creado
- [ ] Código copiado
- [ ] Sin errores

---

### PASO 8: Crear Repository (Opcional pero recomendado) (5 min)

Archivo: `data/repository/AuthRepository.kt`

```kotlin
package com.example.campusreserve.data.repository

import com.example.campusreserve.data.TokenManager
import com.example.campusreserve.data.api.ApiService
import com.example.campusreserve.data.model.LoginRequest
import com.example.campusreserve.data.model.LoginResponse
import android.content.Context

class AuthRepository(
    private val apiService: ApiService,
    private val context: Context
) {
    suspend fun login(email: String, password: String): Result<LoginResponse> {
        return try {
            val response = apiService.login(LoginRequest(email, password))
            TokenManager.saveToken(context, response.token)
            TokenManager.saveUserInfo(context, response.usuario.idUsuario, response.usuario.nombre)
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun logout() {
        TokenManager.clearAll(context)
    }
}
```

**Checklist:**
- [ ] Archivo creado
- [ ] Código copiado
- [ ] Sin errores

---

### PASO 9: Crear LoginFragment (10 min)

Archivo: `ui/auth/LoginFragment.kt`

Ver archivo completo: `EJEMPLO_COMPLETO_ANDROID.kt`

**Checklist:**
- [ ] Fragment creado
- [ ] Layout creado (`fragment_login.xml`)
- [ ] Sin errores

---

### PASO 10: Crear UsuariosFragment (10 min)

Archivo: `ui/usuarios/UsuariosFragment.kt`

Ver archivo completo: `EJEMPLO_COMPLETO_ANDROID.kt`

**Checklist:**
- [ ] Fragment creado
- [ ] Adapter creado
- [ ] Layouts creados
- [ ] Sin errores

---

## 🧪 PARTE 3: PRUEBAS

### Test 1: Conectar al Backend (2 min)

```kotlin
// En MainActivity.onCreate() o Fragment.onViewCreated()
lifecycleScope.launch {
    try {
        val apiService = RetrofitClient.getApiService(context)
        val roles = apiService.getAllRoles()
        Log.d("TEST", "✅ Conectado. Roles: ${roles.size}")
    } catch (e: Exception) {
        Log.e("TEST", "❌ Error: ${e.message}")
    }
}
```

**Esperado:** Log mostrando ✅ Conectado con número de roles

**Checklist:**
- [ ] Test ejecutado
- [ ] Log muestra conexión exitosa

---

### Test 2: Listar Usuarios (2 min)

```kotlin
lifecycleScope.launch {
    try {
        val apiService = RetrofitClient.getApiService(context)
        val usuarios = apiService.getAllUsuarios()
        usuarios.forEach { 
            Log.d("USUARIOS", "${it.nombre} - ${it.correoInstitucional}")
        }
    } catch (e: Exception) {
        Log.e("USUARIOS", "Error: ${e.message}")
    }
}
```

**Esperado:** Log mostrando lista de usuarios

**Checklist:**
- [ ] Test ejecutado
- [ ] Usuarios mostrados en log

---

### Test 3: Login (3 min)

```kotlin
lifecycleScope.launch {
    try {
        val apiService = RetrofitClient.getApiService(context)
        val response = apiService.login(LoginRequest(
            "jazminrogel@utez.edu.mx",
            "password123"
        ))
        Log.d("LOGIN", "✅ Token: ${response.token}")
        Log.d("LOGIN", "✅ Usuario: ${response.usuario.nombre}")
    } catch (e: Exception) {
        Log.e("LOGIN", "Error: ${e.message}")
    }
}
```

**Esperado:** Log mostrando token y nombre de usuario

**Checklist:**
- [ ] Test ejecutado
- [ ] Token recibido
- [ ] Usuario mostrado

---

### Test 4: Listar Reservaciones (2 min)

```kotlin
lifecycleScope.launch {
    try {
        val apiService = RetrofitClient.getApiService(context)
        val reservaciones = apiService.getAllReservaciones()
        Log.d("RESERVACIONES", "Total: ${reservaciones.size}")
    } catch (e: Exception) {
        Log.e("RESERVACIONES", "Error: ${e.message}")
    }
}
```

**Esperado:** Log mostrando número de reservaciones

**Checklist:**
- [ ] Test ejecutado
- [ ] Número de reservaciones mostrado

---

## ✅ CHECKLIST FINAL

### Dependencias
- [ ] Retrofit agregado
- [ ] OkHttp agregado
- [ ] Gson agregado
- [ ] Coroutines agregadas
- [ ] Lifecycle agregado
- [ ] DataStore agregado

### Permisos
- [ ] INTERNET agregado en manifest
- [ ] ACCESS_NETWORK_STATE agregado

### Carpetas y Archivos
- [ ] `data/api/` creada
- [ ] `data/model/` creada
- [ ] `data/repository/` creada
- [ ] `ui/auth/` creada
- [ ] `ui/usuarios/` creada
- [ ] `ui/reservaciones/` creada

### Código Backend
- [ ] ApiService.kt creado
- [ ] RetrofitClient.kt creado
- [ ] TokenManager.kt creado
- [ ] DTOs.kt creado

### Código UI
- [ ] LoginFragment.kt creado
- [ ] LoginViewModel.kt creado
- [ ] UsuariosFragment.kt creado
- [ ] ReservacionesFragment.kt creado

### Pruebas
- [ ] Test de conexión pasó
- [ ] Test de login pasó
- [ ] Test de usuarios pasó
- [ ] Test de reservaciones pasó

### Integración
- [ ] App conecta sin errores
- [ ] Login funciona
- [ ] Usuarios se cargan
- [ ] Reservaciones se cargan
- [ ] Crear reservación funciona
- [ ] Cancelar reservación funciona

---

## 🚀 Próximos Pasos

1. **Implementar pantalla de reservaciones**
   - Listar mis reservaciones
   - Crear nueva reservación
   - Cancelar reservación

2. **Implementar dashboard**
   - Mostrar información del usuario
   - Estadísticas de reservaciones
   - Acceso rápido a funciones

3. **Agregar validaciones**
   - Validar campos de entrada
   - Mostrar errores claramente
   - Reintentos automáticos

4. **Testing**
   - Unit tests para repositories
   - Tests de UI
   - Tests de integración

5. **Deployment**
   - Generar APK/AAB
   - Publicar en Google Play Store

---

## 💡 Tips Finales

1. **URL del Backend:**
   ```
   Emulador: http://10.0.2.2:8080/api/
   Dispositivo: http://192.168.1.X:8080/api/
   ```

2. **Debug:**
   - Habilitar HttpLoggingInterceptor
   - Ver logs en Logcat
   - Usar breakpoints

3. **Errores comunes:**
   - 403: Token no incluido o inválido
   - 401: Credenciales incorrectas
   - Connection refused: Backend no corre
   - Timeout: Aumentar timeout

4. **Seguridad:**
   - No guardar contraseñas
   - Guardar solo el token
   - Limpiar token al logout

---

## 📞 Archivos de Referencia

- **CONEXION_ANDROID.md** - Guía completa
- **CODIGO_KOTLIN_EJEMPLOS.kt** - Ejemplos de código
- **EJEMPLO_COMPLETO_ANDROID.kt** - Código listo para copiar
- **CONFIG_MOVIL.md** - Configuración detallada
- **RESUMEN_CONEXION_MOVIL.md** - Resumen rápido

¡Listo para implementar! 🎉

