# 🔧 COMANDOS RÁPIDOS - Verificación y Troubleshooting

## ✅ Verificación Rápida del Backend

### 1. ¿Backend está corriendo?
```bash
lsof -i :8080
```

**Respuesta esperada:**
```
COMMAND   PID          USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java    70007 neardominguez   21u  IPv6 ...               0t0  TCP *:8080 (LISTEN)
```

**Si NO está corriendo:**
```bash
cd /Users/neardominguez/Desktop/Integradora/backend
java -jar "target/campus-reserve-api-1.0.0.jar"
```

---

### 2. Probar conexión básica
```bash
curl http://localhost:8080/api/rol
```

**Respuesta esperada:**
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

### 3. Probar endpoint de usuarios
```bash
curl http://localhost:8080/api/usuario
```

**Respuesta esperada:**
```json
[
  {
    "idUsuario": 1,
    "nombre": "Jazmin Rogel Arizmendi",
    "correoInstitucional": "jazminrogel@utez.edu.mx",
    "idRol": 1,
    "rolNombre": "Administrador"
  }
]
```

---

### 4. Probar login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "correoInstitucional": "jazminrogel@utez.edu.mx",
    "password": "password123"
  }'
```

**Respuesta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "idUsuario": 1,
    "nombre": "Jazmin Rogel Arizmendi",
    "correoInstitucional": "jazminrogel@utez.edu.mx",
    "idRol": 1,
    "rolNombre": "Administrador"
  }
}
```

---

## 🚨 Troubleshooting

### Problema: "Connection refused"

**Causas posibles:**
1. Backend no está corriendo
2. Port 8080 está en uso por otro programa
3. Firewall bloqueando conexión

**Soluciones:**

```bash
# Verificar si está corriendo
lsof -i :8080

# Si NO está corriendo, iniciar:
cd /Users/neardominguez/Desktop/Integradora/backend
java -jar "target/campus-reserve-api-1.0.0.jar"

# Si puerto está en uso:
killall java  # Matar todos los procesos Java
sleep 2
java -jar "target/campus-reserve-api-1.0.0.jar"  # Reiniciar
```

---

### Problema: "403 Forbidden"

**Causa:** Falta token JWT

**Solución:** Incluir token en header

```bash
# Primero hacer login para obtener token
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"correoInstitucional":"jazminrogel@utez.edu.mx","password":"password123"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Luego usar el token
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/usuario/1
```

---

### Problema: "401 Unauthorized"

**Causas:**
1. Token expirado
2. Token inválido
3. Credenciales incorrectas

**Soluciones:**
```bash
# Hacer login nuevamente
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"correoInstitucional":"jazminrogel@utez.edu.mx","password":"password123"}'

# Verificar credenciales:
# Email: jazminrogel@utez.edu.mx
# Password: password123
```

---

### Problema: "Timeout"

**Causa:** Conexión muy lenta o backend no responde

**Soluciones:**
```bash
# Con timeout explícito
curl --connect-timeout 5 --max-time 10 http://localhost:8080/api/rol

# Si funciona lentamente, puede ser problema de:
# - Base de datos
# - Red
# - Servidor saturado

# Ver si hay errores en el backend
# Los logs están en la terminal donde ejecutaste java -jar
```

---

## 🔍 Comandos de Debug

### Ver logs del backend (si está en background)

```bash
# Mostrar procesos Java activos
ps aux | grep java

# Ver logs en tiempo real (si está en terminal)
# Solo visible si ejecutaste en terminal sin &
```

---

### Probar con verbose

```bash
# Ver headers y respuesta completa
curl -v http://localhost:8080/api/rol

# Con información de timing
curl -w "\nTiempo total: %{time_total}s\n" http://localhost:8080/api/rol
```

---

### Probar con JSON formateado

```bash
# Instalar jq si no lo tienes
# brew install jq

# Probar con formato bonito
curl http://localhost:8080/api/usuario | jq '.'

# Filtrar datos
curl http://localhost:8080/api/usuario | jq '.[].nombre'

# Contar elementos
curl http://localhost:8080/api/usuario | jq 'length'
```

---

## 📋 Checklist de Verificación Completa

### 1. Sistema Operativo
```bash
# Ver sistema
system_profiler SPSoftwareDataType | grep System

# Ver procesadores
sysctl -n hw.ncpu

# Ver memoria
vm_stat | grep "Pages free"
```

### 2. Java
```bash
# Ver versión
java -version

# Ver variables de entorno
echo $JAVA_HOME
```

### 3. Maven
```bash
# Ver versión
mvn --version

# Listar dependencias
cd /Users/neardominguez/Desktop/Integradora/backend
mvn dependency:tree
```

### 4. MySQL
```bash
# Conectar a BD
mysql -u root -p

# En MySQL:
USE campusReserve;
SHOW TABLES;
SELECT COUNT(*) FROM usuario;
```

### 5. Backend
```bash
# Compilar
cd /Users/neardominguez/Desktop/Integradora/backend
mvn clean package -DskipTests

# Ejecutar
java -jar "target/campus-reserve-api-1.0.0.jar"

# Verificar puerto
lsof -i :8080
```

---

## 🧪 Script de Test Completo

Copia este script en un archivo `.sh` y ejecútalo:

```bash
#!/bin/bash

echo "================================"
echo "  VERIFICACIÓN DE BACKEND       "
echo "================================"
echo ""

# 1. Verificar si Java está instalado
echo "✓ Verificando Java..."
java -version 2>&1 | head -1

# 2. Verificar si Maven está instalado
echo ""
echo "✓ Verificando Maven..."
mvn --version 2>&1 | head -1

# 3. Verificar si backend está corriendo
echo ""
echo "✓ Verificando puerto 8080..."
if lsof -i :8080 > /dev/null 2>&1; then
    echo "  ✅ Backend está corriendo"
else
    echo "  ❌ Backend NO está corriendo"
fi

# 4. Probar conexión
echo ""
echo "✓ Probando conexión..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/rol)
if [ "$RESPONSE" = "200" ]; then
    echo "  ✅ Conexión exitosa (HTTP $RESPONSE)"
else
    echo "  ❌ Error de conexión (HTTP $RESPONSE)"
fi

# 5. Probar endpoint de roles
echo ""
echo "✓ Obteniendo roles..."
ROLES=$(curl -s http://localhost:8080/api/rol | grep -o "nombre" | wc -l)
echo "  ✅ $ROLES roles encontrados"

# 6. Probar endpoint de usuarios
echo ""
echo "✓ Obteniendo usuarios..."
USERS=$(curl -s http://localhost:8080/api/usuario | grep -o "idUsuario" | wc -l)
echo "  ✅ $USERS usuarios encontrados"

# 7. Resumen
echo ""
echo "================================"
echo "       VERIFICACIÓN COMPLETA    "
echo "================================"
```

---

## 🚀 Script de Reinicio Rápido

```bash
#!/bin/bash

echo "Reiniciando backend..."

# Matar procesos Java
echo "1. Matando procesos antiguos..."
killall java 2>/dev/null

# Esperar
echo "2. Esperando 2 segundos..."
sleep 2

# Compilar
echo "3. Recompilando..."
cd /Users/neardominguez/Desktop/Integradora/backend
mvn clean package -DskipTests 2>&1 | tail -3

# Iniciar
echo "4. Iniciando backend..."
java -jar "target/campus-reserve-api-1.0.0.jar" &

# Esperar a que inicie
echo "5. Esperando inicio..."
sleep 5

# Verificar
echo "6. Verificando..."
curl -s http://localhost:8080/api/rol > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Backend reiniciado correctamente!"
else
    echo "❌ Error al reiniciar backend"
fi
```

---

## 📱 Verificación desde Android Studio

### Test en Logcat

```kotlin
// En MainActivity.onCreate()
lifecycleScope.launch {
    try {
        val apiService = RetrofitClient.getApiService(this@MainActivity)
        val roles = apiService.getAllRoles()
        Log.d("VERIFICACION", "✅ Backend conectado: ${roles.size} roles")
    } catch (e: Exception) {
        Log.e("VERIFICACION", "❌ Error: ${e.message}")
    }
}
```

---

## 🎯 Comandos por Escenario

### Escenario 1: Backend no arranca

```bash
# 1. Ver qué hay en el puerto 8080
lsof -i :8080

# 2. Matar lo que esté usando ese puerto
kill -9 <PID>

# 3. Recompilar desde cero
cd /Users/neardominguez/Desktop/Integradora/backend
mvn clean
mvn compile
mvn package -DskipTests

# 4. Intentar arrancar
java -jar "target/campus-reserve-api-1.0.0.jar"

# 5. Si falla, ver logs de error
mvn clean package  # Sin -DskipTests para ver todos los errores
```

---

### Escenario 2: Endpoints no responden

```bash
# 1. Verificar backend está corriendo
lsof -i :8080

# 2. Probar endpoint simple
curl http://localhost:8080/api/rol

# 3. Con más detalles
curl -v http://localhost:8080/api/rol

# 4. Si recibe 403, el SecurityConfig puede estar mal
# Verificar: /backend/src/main/java/com/integradora/campusreserve/config/SecurityConfig.java

# 5. Si recibe 500, hay error en el servidor
# Ver logs en la terminal donde corre java
```

---

### Escenario 3: Base de datos no conecta

```bash
# 1. Verificar MySQL está corriendo
ps aux | grep mysql

# 2. Conectarse a MySQL
mysql -u root -p
# Contraseña: rootroot

# 3. En MySQL, verificar BD
USE campusReserve;
SHOW TABLES;

# 4. Ver datos
SELECT * FROM usuario;
SELECT * FROM rol;
SELECT * FROM reservacion;

# 5. Si falla, ver logs del backend
# Los logs mencionarán errores de conexión
```

---

## 📊 Resumen de URLs

```bash
# URLs de prueba rápida
BASE_URL="http://localhost:8080/api"

# Roles
curl $BASE_URL/rol

# Usuarios
curl $BASE_URL/usuario

# Reservaciones
curl $BASE_URL/reservacion

# Horarios
curl $BASE_URL/horario

# Instalaciones
curl $BASE_URL/instalacion

# Auth
curl -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"correoInstitucional":"jazminrogel@utez.edu.mx","password":"password123"}'
```

---

¡Con estos comandos puedes diagnosticar cualquier problema! 🔧

