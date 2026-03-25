// ============================================================
// EJEMPLOS DE CÓDIGO KOTLIN PARA ANDROID
// Copia y pega directamente en tu proyecto Android Studio
// ============================================================

// ============================================================
// 1. MODELO DE DATOS (Data Classes)
// ============================================================

package com.example.campusreserve.data.model

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
    val nombre: String = "",
    val correoInstitucional: String = "",
    val password: String? = null,
    val telefono: String = "",
    val rol: RolDTO? = null
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
    val idHorario: Int = 0,
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


// ============================================================
// 2. SERVICIO API (Retrofit Interface)
// ============================================================

package com.example.campusreserve.data.api

import retrofit2.http.*
import com.example.campusreserve.data.model.*

interface ApiService {
    
    // ============ AUTENTICACIÓN ============
    @POST("auth/login")
    suspend fun login(@Body loginRequest: LoginRequest): LoginResponse
    
    
    // ============ USUARIOS ============
    @GET("usuario")
    suspend fun getAllUsuarios(): List<UsuarioDTO>
    
    @GET("usuario/{id}")
    suspend fun getUsuarioById(@Path("id") id: Int): UsuarioDTO
    
    @POST("usuario")
    suspend fun createUsuario(
        @Body usuario: UsuarioDTO
    ): UsuarioDTO
    
    @PUT("usuario/{id}")
    suspend fun updateUsuario(
        @Path("id") id: Int,
        @Body usuario: UsuarioDTO
    ): UsuarioDTO
    
    @DELETE("usuario/{id}")
    suspend fun deleteUsuario(@Path("id") id: Int)
    
    
    // ============ RESERVACIONES ============
    @GET("reservacion")
    suspend fun getAllReservaciones(): List<ReservacionDTO>
    
    @GET("reservacion/{id}")
    suspend fun getReservacionById(@Path("id") id: Int): ReservacionDTO
    
    @GET("reservacion/usuario/{idUsuario}")
    suspend fun getReservacionesByUsuario(
        @Path("idUsuario") idUsuario: Int
    ): List<ReservacionDTO>
    
    @GET("reservacion/estado/{estado}")
    suspend fun getReservacionesByEstado(
        @Path("estado") estado: String
    ): List<ReservacionDTO>
    
    @POST("reservacion")
    suspend fun createReservacion(
        @Body reservacion: ReservacionDTO
    ): ReservacionDTO
    
    @PUT("reservacion/{id}")
    suspend fun updateReservacion(
        @Path("id") id: Int,
        @Body reservacion: ReservacionDTO
    ): ReservacionDTO
    
    @PUT("reservacion/{id}/cancelar")
    suspend fun cancelarReservacion(@Path("id") id: Int): ReservacionDTO
    
    @DELETE("reservacion/{id}")
    suspend fun deleteReservacion(@Path("id") id: Int)
    
    
    // ============ INSTALACIONES ============
    @GET("instalacion")
    suspend fun getAllInstalaciones(): List<InstalacionDTO>
    
    
    // ============ HORARIOS ============
    @GET("horario")
    suspend fun getAllHorarios(): List<HorarioDTO>
    
    
    // ============ ROLES ============
    @GET("rol")
    suspend fun getAllRoles(): List<RolDTO>
}


// ============================================================
// 3. CLIENTE RETROFIT
// ============================================================

package com.example.campusreserve.data.api

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import android.content.Context
import android.util.Log
import java.util.concurrent.TimeUnit

object RetrofitClient {
    
    // IMPORTANTE: Cambiar según donde esté tu backend
    // Para emulador: http://10.0.2.2:8080/api/
    // Para dispositivo real: http://192.168.X.X:8080/api/
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
            val originalRequest = chain.request()
            
            val requestBuilder = originalRequest.newBuilder()
            
            // Agregar token JWT si existe
            token?.let {
                requestBuilder.addHeader("Authorization", "Bearer $it")
            }
            
            val newRequest = requestBuilder.build()
            chain.proceed(newRequest)
        }
    }
}


// ============================================================
// 4. GESTOR DE TOKENS
// ============================================================

package com.example.campusreserve.data

import android.content.Context
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking

private val Context.dataStore by preferencesDataStore(name = "campus_reserve_prefs")

object TokenManager {
    private val TOKEN_KEY = stringPreferencesKey("auth_token")
    private val USER_ID_KEY = stringPreferencesKey("user_id")
    private val USER_NAME_KEY = stringPreferencesKey("user_name")
    
    suspend fun saveToken(context: Context, token: String) {
        context.dataStore.edit { preferences ->
            preferences[TOKEN_KEY] = token
        }
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
    
    suspend fun saveUserInfo(context: Context, userId: Int, userName: String) {
        context.dataStore.edit { preferences ->
            preferences[USER_ID_KEY] = userId.toString()
            preferences[USER_NAME_KEY] = userName
        }
    }
    
    fun getUserId(context: Context): Int? {
        return try {
            runBlocking {
                context.dataStore.data.first()[USER_ID_KEY]?.toIntOrNull()
            }
        } catch (e: Exception) {
            null
        }
    }
    
    fun getUserName(context: Context): String? {
        return try {
            runBlocking {
                context.dataStore.data.first()[USER_NAME_KEY]
            }
        } catch (e: Exception) {
            null
        }
    }
    
    suspend fun clearAll(context: Context) {
        context.dataStore.edit { preferences ->
            preferences.clear()
        }
    }
}


// ============================================================
// 5. REPOSITORIO (Repository Pattern)
// ============================================================

package com.example.campusreserve.data.repository

import com.example.campusreserve.data.api.ApiService
import com.example.campusreserve.data.model.*
import android.content.Context
import com.example.campusreserve.data.TokenManager

class AuthRepository(
    private val apiService: ApiService,
    private val context: Context
) {
    
    suspend fun login(correo: String, password: String): Result<LoginResponse> {
        return try {
            val response = apiService.login(LoginRequest(correo, password))
            TokenManager.saveToken(context, response.token)
            TokenManager.saveUserInfo(
                context,
                response.usuario.idUsuario ?: 0,
                response.usuario.nombre
            )
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun logout() {
        TokenManager.clearAll(context)
    }
}

class UsuarioRepository(private val apiService: ApiService) {
    
    suspend fun getAllUsuarios(): Result<List<UsuarioDTO>> {
        return try {
            val usuarios = apiService.getAllUsuarios()
            Result.success(usuarios)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun getUsuarioById(id: Int): Result<UsuarioDTO> {
        return try {
            val usuario = apiService.getUsuarioById(id)
            Result.success(usuario)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun createUsuario(usuario: UsuarioDTO): Result<UsuarioDTO> {
        return try {
            val created = apiService.createUsuario(usuario)
            Result.success(created)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun updateUsuario(id: Int, usuario: UsuarioDTO): Result<UsuarioDTO> {
        return try {
            val updated = apiService.updateUsuario(id, usuario)
            Result.success(updated)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun deleteUsuario(id: Int): Result<Unit> {
        return try {
            apiService.deleteUsuario(id)
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}

class ReservacionRepository(private val apiService: ApiService) {
    
    suspend fun getAllReservaciones(): Result<List<ReservacionDTO>> {
        return try {
            val reservaciones = apiService.getAllReservaciones()
            Result.success(reservaciones)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun getReservacionesByUsuario(idUsuario: Int): Result<List<ReservacionDTO>> {
        return try {
            val reservaciones = apiService.getReservacionesByUsuario(idUsuario)
            Result.success(reservaciones)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun createReservacion(reservacion: ReservacionDTO): Result<ReservacionDTO> {
        return try {
            val created = apiService.createReservacion(reservacion)
            Result.success(created)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    suspend fun cancelarReservacion(id: Int): Result<ReservacionDTO> {
        return try {
            val cancelada = apiService.cancelarReservacion(id)
            Result.success(cancelada)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}


// ============================================================
// 6. VIEWMODEL - LOGIN
// ============================================================

package com.example.campusreserve.ui.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import kotlinx.coroutines.launch
import com.example.campusreserve.data.repository.AuthRepository
import com.example.campusreserve.data.model.LoginResponse

sealed class LoginUiState {
    object Idle : LoginUiState()
    object Loading : LoginUiState()
    data class Success(val response: LoginResponse) : LoginUiState()
    data class Error(val message: String) : LoginUiState()
}

class LoginViewModel(private val authRepository: AuthRepository) : ViewModel() {
    
    private val _uiState = MutableLiveData<LoginUiState>(LoginUiState.Idle)
    val uiState: LiveData<LoginUiState> = _uiState
    
    fun login(correo: String, password: String) {
        _uiState.value = LoginUiState.Loading
        viewModelScope.launch {
            val result = authRepository.login(correo, password)
            _uiState.value = result
                .onSuccess { LoginUiState.Success(it) }
                .onFailure { LoginUiState.Error(it.message ?: "Error desconocido") }
                .getOrNull()?.let { it } ?: LoginUiState.Error("Error")
        }
    }
}


// ============================================================
// 7. VIEWMODEL - USUARIOS
// ============================================================

package com.example.campusreserve.ui.usuarios

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import kotlinx.coroutines.launch
import com.example.campusreserve.data.repository.UsuarioRepository
import com.example.campusreserve.data.model.UsuarioDTO

sealed class UsuariosUiState {
    object Idle : UsuariosUiState()
    object Loading : UsuariosUiState()
    data class Success(val usuarios: List<UsuarioDTO>) : UsuariosUiState()
    data class Error(val message: String) : UsuariosUiState()
}

class UsuariosViewModel(private val usuarioRepository: UsuarioRepository) : ViewModel() {
    
    private val _uiState = MutableLiveData<UsuariosUiState>(UsuariosUiState.Idle)
    val uiState: LiveData<UsuariosUiState> = _uiState
    
    fun getAllUsuarios() {
        _uiState.value = UsuariosUiState.Loading
        viewModelScope.launch {
            usuarioRepository.getAllUsuarios()
                .onSuccess { usuarios ->
                    _uiState.value = UsuariosUiState.Success(usuarios)
                }
                .onFailure { error ->
                    _uiState.value = UsuariosUiState.Error(
                        error.message ?: "Error al obtener usuarios"
                    )
                }
        }
    }
}


// ============================================================
// 8. VIEWMODEL - RESERVACIONES
// ============================================================

package com.example.campusreserve.ui.reservaciones

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import kotlinx.coroutines.launch
import com.example.campusreserve.data.repository.ReservacionRepository
import com.example.campusreserve.data.model.ReservacionDTO
import android.content.Context
import com.example.campusreserve.data.TokenManager

sealed class ReservacionesUiState {
    object Idle : ReservacionesUiState()
    object Loading : ReservacionesUiState()
    data class Success(val reservaciones: List<ReservacionDTO>) : ReservacionesUiState()
    data class Error(val message: String) : ReservacionesUiState()
}

class ReservacionesViewModel(
    private val reservacionRepository: ReservacionRepository,
    private val context: Context
) : ViewModel() {
    
    private val _uiState = MutableLiveData<ReservacionesUiState>(ReservacionesUiState.Idle)
    val uiState: LiveData<ReservacionesUiState> = _uiState
    
    fun getReservacionesByUsuario() {
        val userId = TokenManager.getUserId(context) ?: return
        
        _uiState.value = ReservacionesUiState.Loading
        viewModelScope.launch {
            reservacionRepository.getReservacionesByUsuario(userId)
                .onSuccess { reservaciones ->
                    _uiState.value = ReservacionesUiState.Success(reservaciones)
                }
                .onFailure { error ->
                    _uiState.value = ReservacionesUiState.Error(
                        error.message ?: "Error al obtener reservaciones"
                    )
                }
        }
    }
    
    fun createReservacion(descripcion: String, idHorario: Int) {
        val userId = TokenManager.getUserId(context) ?: return
        
        val reservacion = ReservacionDTO(
            descripcion = descripcion,
            idUsuario = userId,
            idHorario = idHorario
        )
        
        viewModelScope.launch {
            reservacionRepository.createReservacion(reservacion)
                .onSuccess {
                    // Recargar lista
                    getReservacionesByUsuario()
                }
                .onFailure { error ->
                    _uiState.value = ReservacionesUiState.Error(
                        error.message ?: "Error al crear reservación"
                    )
                }
        }
    }
    
    fun cancelarReservacion(id: Int) {
        viewModelScope.launch {
            reservacionRepository.cancelarReservacion(id)
                .onSuccess {
                    // Recargar lista
                    getReservacionesByUsuario()
                }
                .onFailure { error ->
                    _uiState.value = ReservacionesUiState.Error(
                        error.message ?: "Error al cancelar reservación"
                    )
                }
        }
    }
}


// ============================================================
// 9. FRAGMENTO EJEMPLO - LOGIN
// ============================================================

package com.example.campusreserve.ui.auth

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.campusreserve.databinding.FragmentLoginBinding
import com.example.campusreserve.data.api.RetrofitClient
import com.example.campusreserve.data.repository.AuthRepository

class LoginFragment : Fragment() {
    
    private lateinit var binding: FragmentLoginBinding
    private lateinit var viewModel: LoginViewModel
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentLoginBinding.inflate(inflater, container, false)
        return binding.root
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        // Inicializar ViewModel
        val apiService = RetrofitClient.getApiService(requireContext())
        val authRepository = AuthRepository(apiService, requireContext())
        viewModel = ViewModelProvider(this, object : androidx.lifecycle.ViewModelProvider.Factory {
            override fun <T : androidx.lifecycle.ViewModel> create(modelClass: Class<T>): T {
                return LoginViewModel(authRepository) as T
            }
        }).get(LoginViewModel::class.java)
        
        // Observar estados
        viewModel.uiState.observe(viewLifecycleOwner) { state ->
            when (state) {
                is LoginUiState.Idle -> {
                    binding.loginButton.isEnabled = true
                    binding.progressBar.visibility = View.GONE
                }
                is LoginUiState.Loading -> {
                    binding.loginButton.isEnabled = false
                    binding.progressBar.visibility = View.VISIBLE
                }
                is LoginUiState.Success -> {
                    binding.progressBar.visibility = View.GONE
                    // Navegar a pantalla principal
                    requireActivity().runOnUiThread {
                        // Cambiar fragment o navegar
                    }
                }
                is LoginUiState.Error -> {
                    binding.loginButton.isEnabled = true
                    binding.progressBar.visibility = View.GONE
                    binding.errorText.text = state.message
                    binding.errorText.visibility = View.VISIBLE
                }
            }
        }
        
        // Botón de login
        binding.loginButton.setOnClickListener {
            val correo = binding.emailInput.text.toString()
            val password = binding.passwordInput.text.toString()
            
            if (correo.isNotEmpty() && password.isNotEmpty()) {
                viewModel.login(correo, password)
            } else {
                binding.errorText.text = "Por favor completa todos los campos"
                binding.errorText.visibility = View.VISIBLE
            }
        }
    }
}


// ============================================================
// 10. build.gradle - DEPENDENCIAS
// ============================================================

/*
dependencies {
    // Retrofit & OkHttp
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:4.11.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.11.0'
    
    // JSON Parsing
    implementation 'com.google.code.gson:gson:2.10.1'
    
    // Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.2'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.2'
    
    // LiveData & ViewModel
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.2'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.6.2'
    
    // DataStore
    implementation 'androidx.datastore:datastore-preferences:1.0.0'
    
    // AndroidX
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    
    // Material Design
    implementation 'com.google.android.material:material:1.10.0'
}
*/

