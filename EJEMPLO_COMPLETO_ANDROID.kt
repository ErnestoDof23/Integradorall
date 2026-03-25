// ============================================================
// EJEMPLO COMPLETO - FRAGMENT DE LOGIN
// Copia y pega en tu proyecto Android
// ============================================================

package com.example.campusreserve.ui.auth

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.example.campusreserve.R
import com.example.campusreserve.data.TokenManager
import com.example.campusreserve.data.api.ApiService
import com.example.campusreserve.data.api.RetrofitClient
import com.example.campusreserve.data.model.LoginRequest
import com.example.campusreserve.data.repository.AuthRepository
import kotlinx.coroutines.launch

class LoginFragment : Fragment() {
    
    private lateinit var emailInput: EditText
    private lateinit var passwordInput: EditText
    private lateinit var loginButton: Button
    private lateinit var progressBar: ProgressBar
    private lateinit var errorText: TextView
    
    private lateinit var authRepository: AuthRepository
    private lateinit var apiService: ApiService
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_login, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        // Inicializar vistas
        emailInput = view.findViewById(R.id.email_input)
        passwordInput = view.findViewById(R.id.password_input)
        loginButton = view.findViewById(R.id.login_button)
        progressBar = view.findViewById(R.id.progress_bar)
        errorText = view.findViewById(R.id.error_text)
        
        // Inicializar API
        apiService = RetrofitClient.getApiService(requireContext())
        authRepository = AuthRepository(apiService, requireContext())
        
        // Configurar botón de login
        loginButton.setOnClickListener {
            performLogin()
        }
        
        // Prueba de conexión al cargar fragment
        testConnection()
    }
    
    private fun performLogin() {
        val email = emailInput.text.toString().trim()
        val password = passwordInput.text.toString().trim()
        
        // Validar campos
        if (email.isEmpty()) {
            errorText.text = "Por favor ingresa tu email"
            errorText.visibility = View.VISIBLE
            return
        }
        
        if (password.isEmpty()) {
            errorText.text = "Por favor ingresa tu contraseña"
            errorText.visibility = View.VISIBLE
            return
        }
        
        // Limpiar error anterior
        errorText.visibility = View.GONE
        
        // Mostrar progreso
        progressBar.visibility = View.VISIBLE
        loginButton.isEnabled = false
        
        // Hacer login en coroutine
        lifecycleScope.launch {
            try {
                val result = authRepository.login(email, password)
                
                result.onSuccess { response ->
                    // Login exitoso
                    progressBar.visibility = View.GONE
                    loginButton.isEnabled = true
                    
                    Toast.makeText(
                        requireContext(),
                        "¡Bienvenido ${response.usuario.nombre}!",
                        Toast.LENGTH_SHORT
                    ).show()
                    
                    // TODO: Navegar al Dashboard
                    // findNavController().navigate(R.id.action_login_to_dashboard)
                }
                
                result.onFailure { exception ->
                    // Login falló
                    progressBar.visibility = View.GONE
                    loginButton.isEnabled = true
                    
                    val errorMessage = when {
                        exception.message?.contains("401", ignoreCase = true) == true ->
                            "Email o contraseña incorrectos"
                        exception.message?.contains("Connection", ignoreCase = true) == true ->
                            "No se puede conectar al servidor"
                        exception.message?.contains("timeout", ignoreCase = true) == true ->
                            "Conexión lenta. Intenta de nuevo"
                        else -> exception.message ?: "Error desconocido"
                    }
                    
                    errorText.text = errorMessage
                    errorText.visibility = View.VISIBLE
                }
                
            } catch (e: Exception) {
                // Excepción no esperada
                progressBar.visibility = View.GONE
                loginButton.isEnabled = true
                errorText.text = "Error: ${e.localizedMessage}"
                errorText.visibility = View.VISIBLE
            }
        }
    }
    
    private fun testConnection() {
        lifecycleScope.launch {
            try {
                val roles = apiService.getAllRoles()
                // Conexión exitosa
                android.util.Log.d("CONEXION", "✅ Backend conectado. Roles: ${roles.size}")
            } catch (e: Exception) {
                // Error de conexión
                android.util.Log.e("CONEXION", "❌ Error: ${e.message}")
                Toast.makeText(
                    requireContext(),
                    "Advertencia: No se puede conectar al servidor",
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }
}


// ============================================================
// LAYOUT XML - fragment_login.xml
// ============================================================

<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="24dp"
    android:gravity="center">
    
    <!-- Logo o Título -->
    <TextView
        android:id="@+id/title_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Campus Reserve"
        android:textSize="32sp"
        android:textStyle="bold"
        android:layout_marginBottom="48dp" />
    
    <!-- Campo de Email -->
    <EditText
        android:id="@+id/email_input"
        android:layout_width="match_parent"
        android:layout_height="48dp"
        android:hint="Email Institucional"
        android:inputType="textEmailAddress"
        android:padding="12dp"
        android:layout_marginBottom="16dp"
        android:background="@drawable/rounded_background"
        android:textColorHint="#999999" />
    
    <!-- Campo de Contraseña -->
    <EditText
        android:id="@+id/password_input"
        android:layout_width="match_parent"
        android:layout_height="48dp"
        android:hint="Contraseña"
        android:inputType="textPassword"
        android:padding="12dp"
        android:layout_marginBottom="24dp"
        android:background="@drawable/rounded_background"
        android:textColorHint="#999999" />
    
    <!-- Texto de Error -->
    <TextView
        android:id="@+id/error_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textColor="#FF0000"
        android:textSize="14sp"
        android:layout_marginBottom="16dp"
        android:visibility="gone" />
    
    <!-- Botón de Login -->
    <Button
        android:id="@+id/login_button"
        android:layout_width="match_parent"
        android:layout_height="48dp"
        android:text="Iniciar Sesión"
        android:textSize="16sp"
        android:layout_marginBottom="16dp"
        android:background="@drawable/button_background"
        android:textColor="@android:color/white" />
    
    <!-- ProgressBar -->
    <ProgressBar
        android:id="@+id/progress_bar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:visibility="gone" />
    
</LinearLayout>


// ============================================================
// EJEMPLO COMPLETO - FRAGMENT DE USUARIOS
// ============================================================

package com.example.campusreserve.ui.usuarios

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ProgressBar
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.campusreserve.R
import com.example.campusreserve.data.api.RetrofitClient
import com.example.campusreserve.data.model.UsuarioDTO
import kotlinx.coroutines.launch

class UsuariosFragment : Fragment() {
    
    private lateinit var recyclerView: RecyclerView
    private lateinit var progressBar: ProgressBar
    private lateinit var emptyText: TextView
    private lateinit var usuariosAdapter: UsuariosAdapter
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_usuarios, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        // Inicializar vistas
        recyclerView = view.findViewById(R.id.usuarios_recycler)
        progressBar = view.findViewById(R.id.progress_bar)
        emptyText = view.findViewById(R.id.empty_text)
        
        // Configurar RecyclerView
        usuariosAdapter = UsuariosAdapter(emptyList())
        recyclerView.adapter = usuariosAdapter
        recyclerView.layoutManager = LinearLayoutManager(requireContext())
        
        // Cargar usuarios
        loadUsuarios()
    }
    
    private fun loadUsuarios() {
        progressBar.visibility = View.VISIBLE
        emptyText.visibility = View.GONE
        
        lifecycleScope.launch {
            try {
                val apiService = RetrofitClient.getApiService(requireContext())
                val usuarios = apiService.getAllUsuarios()
                
                progressBar.visibility = View.GONE
                
                if (usuarios.isEmpty()) {
                    emptyText.visibility = View.VISIBLE
                    emptyText.text = "No hay usuarios registrados"
                } else {
                    emptyText.visibility = View.GONE
                    usuariosAdapter.actualizarUsuarios(usuarios)
                }
                
            } catch (e: Exception) {
                progressBar.visibility = View.GONE
                emptyText.visibility = View.VISIBLE
                emptyText.text = "Error: ${e.message}"
            }
        }
    }
}

// Adapter para RecyclerView
class UsuariosAdapter(private var usuarios: List<UsuarioDTO>) :
    RecyclerView.Adapter<UsuariosAdapter.UsuarioViewHolder>() {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UsuarioViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_usuario, parent, false)
        return UsuarioViewHolder(view)
    }
    
    override fun onBindViewHolder(holder: UsuarioViewHolder, position: Int) {
        holder.bind(usuarios[position])
    }
    
    override fun getItemCount() = usuarios.size
    
    fun actualizarUsuarios(nuevosUsuarios: List<UsuarioDTO>) {
        usuarios = nuevosUsuarios
        notifyDataSetChanged()
    }
    
    class UsuarioViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val nameText: TextView = itemView.findViewById(R.id.usuario_nombre)
        private val emailText: TextView = itemView.findViewById(R.id.usuario_email)
        private val rolText: TextView = itemView.findViewById(R.id.usuario_rol)
        
        fun bind(usuario: UsuarioDTO) {
            nameText.text = usuario.nombre
            emailText.text = usuario.correoInstitucional
            rolText.text = usuario.rolNombre
        }
    }
}

// Layout XML - fragment_usuarios.xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">
    
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Usuarios del Sistema"
        android:textSize="24sp"
        android:textStyle="bold"
        android:layout_marginBottom="16dp" />
    
    <ProgressBar
        android:id="@+id/progress_bar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:visibility="gone" />
    
    <TextView
        android:id="@+id/empty_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Cargando usuarios..."
        android:gravity="center"
        android:layout_marginTop="32dp"
        android:visibility="gone" />
    
    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/usuarios_recycler"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
    
</LinearLayout>

// Layout XML - item_usuario.xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="80dp"
    android:orientation="vertical"
    android:padding="16dp"
    android:layout_marginBottom="8dp"
    android:background="@drawable/card_background">
    
    <TextView
        android:id="@+id/usuario_nombre"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Nombre Usuario"
        android:textSize="16sp"
        android:textStyle="bold" />
    
    <TextView
        android:id="@+id/usuario_email"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="email@utez.edu.mx"
        android:textSize="14sp"
        android:textColor="#666666"
        android:layout_marginTop="4dp" />
    
    <TextView
        android:id="@+id/usuario_rol"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Rol: Administrador"
        android:textSize="12sp"
        android:textColor="#999999"
        android:layout_marginTop="4dp" />
    
</LinearLayout>


// ============================================================
// AUTENTICACIÓN - CONSERVAR TOKEN
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
    
    // Guardar token después de login
    suspend fun saveToken(context: Context, token: String) {
        context.dataStore.edit { preferences ->
            preferences[TOKEN_KEY] = token
        }
    }
    
    // Obtener token guardado
    fun getToken(context: Context): String? {
        return try {
            runBlocking {
                context.dataStore.data.first()[TOKEN_KEY]
            }
        } catch (e: Exception) {
            null
        }
    }
    
    // Guardar información del usuario
    suspend fun saveUserInfo(context: Context, userId: Int, userName: String) {
        context.dataStore.edit { preferences ->
            preferences[USER_ID_KEY] = userId.toString()
            preferences[USER_NAME_KEY] = userName
        }
    }
    
    // Obtener ID del usuario
    fun getUserId(context: Context): Int? {
        return try {
            runBlocking {
                context.dataStore.data.first()[USER_ID_KEY]?.toIntOrNull()
            }
        } catch (e: Exception) {
            null
        }
    }
    
    // Obtener nombre del usuario
    fun getUserName(context: Context): String? {
        return try {
            runBlocking {
                context.dataStore.data.first()[USER_NAME_KEY]
            }
        } catch (e: Exception) {
            null
        }
    }
    
    // Limpiar todo (logout)
    suspend fun clearAll(context: Context) {
        context.dataStore.edit { preferences ->
            preferences.clear()
        }
    }
}


// ============================================================
// INTERCEPTOR - AGREGAR TOKEN AUTOMÁTICAMENTE
// ============================================================

package com.example.campusreserve.data.api

import android.content.Context
import com.example.campusreserve.data.TokenManager
import okhttp3.Interceptor
import okhttp3.Request
import okhttp3.Response

class AuthInterceptor(private val context: Context) : Interceptor {
    
    override fun intercept(chain: Interceptor.Chain): Response {
        val originalRequest = chain.request()
        
        // Obtener token
        val token = TokenManager.getToken(context)
        
        // Si hay token, agregarlo al request
        val newRequest = if (token != null) {
            originalRequest.newBuilder()
                .addHeader("Authorization", "Bearer $token")
                .build()
        } else {
            originalRequest
        }
        
        return chain.proceed(newRequest)
    }
}

