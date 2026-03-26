# GUÍA COMPLETA - Sistema Campus Reserve

## 📋 Estado del Sistema

✅ **Backend**: Funcionando en puerto 8080
✅ **Frontend**: Funcionando en puerto 5173  
✅ **Base de Datos**: Conectada
✅ **Integración**: Completamente operativa

---

## 🚀 INSTRUCCIONES PARA EJECUTAR

### Opción 1: PRIMERA VEZ o DESPUÉS DE CAMBIOS EN EL CÓDIGO

```bash
# Paso 1: Ir a la carpeta del proyecto
cd /Users/neardominguez/Desktop/Integradora

# Paso 2: Verificar/limpiar puertos
lsof -i :8080
lsof -i :5173

# Si algo está usando los puertos
killall java 2>/dev/null
killall -9 node npm 2>/dev/null

# Paso 3: Compilar backend (necesario después de cambios en Java)
cd backend
mvn clean package -DskipTests
# Esperar a que termine (BUILD SUCCESS)

# Paso 4: TERMINAL 1 - Ejecutar backend
java -jar target/campus-reserve-api-1.0.0.jar
# Esperar hasta ver: "Started CampusReserveApplication"

# Paso 5: TERMINAL 2 - Ejecutar frontend
cd ../frontend
npm run dev
# Esperar hasta ver: "VITE ready in XXX ms"
# Local: http://localhost:5173/
```

### Opción 2: CUANDO SÓ LO HAY CAMBIOS EN FRONTEND (sin cambios en Backend)

```bash
# TERMINAL 1 (el backend sigue corriendo)
# Solo reiniciar npm si cambió el código frontend
cd /Users/neardominguez/Desktop/Integradora/frontend

# Matar el npm anterior (Ctrl+C o)
killall -9 node npm 2>/dev/null
sleep 2

# Reiniciar frontend
npm run dev
```

### Opción 3: ARRANQUE RÁPIDO (si todo está compilado)

```bash
# TERMINAL 1
cd /Users/neardominguez/Desktop/Integradora/backend
java -jar target/campus-reserve-api-1.0.0.jar &

# TERMINAL 2
sleep 3
cd /Users/neardominguez/Desktop/Integradora/frontend
npm run dev
```

---

## 📍 ACCESO AL SISTEMA

| Componente | URL | Puerto |
|-----------|-----|--------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:8080/api | 8080 |
| Base de Datos | MySQL | configurada |

---

## 🔧 VERIFICACIÓN RÁPIDA

```bash
# Verificar que todo está corriendo
lsof -i :8080 && echo "✓ Backend OK"
lsof -i :5173 && echo "✓ Frontend OK"

# Probar API
curl http://localhost:8080/api/rol | head -3
```

---

## 📦 ARCHIVOS PRINCIPALES MODIFICADOS

### Backend
- `CampusReserveApplication.java` - CORS configurado para puerto 5173

### Frontend
- `src/services/apiService.js` - Cliente HTTP para todos los endpoints
- `src/services/authService.js` - Gestión de autenticación y tokens
- `src/Components/LoginForm.jsx` - Login conectado al backend
- `src/Components/Canchas.jsx` - Carga canchas de BD
- `src/Components/Users.jsx` - Carga usuarios de BD
- `src/Components/CanchaCard.jsx` - Mapea campos del backend

---

## ⚠️ PROBLEMAS COMUNES

### Error: "Port 8080 already in use"
```bash
killall java 2>/dev/null
sleep 2
# Intentar de nuevo
```

### Error: "Port 5173 already in use"
```bash
killall -9 node npm 2>/dev/null
sleep 2
# Intentar de nuevo
```

### Backend no responde (403 Forbidden)
- Verificar que el token se está enviando en header `Authorization`
- CORS está habilitado para `http://localhost:5173`

### Frontend no conecta con Backend
- Verificar que Backend está corriendo: `curl http://localhost:8080/api/rol`
- Verificar que Frontend está en puerto 5173
- Revisar consola del navegador para errores

---

## 🔄 RECUPERAR CAMBIOS DE GIT

Si necesitas recuperar la versión funcional actual:

```bash
# Frontend
cd /Users/neardominguez/Desktop/Integradora/frontend
git log --oneline
# Verás el commit: "8811b1c Integración completa con backend"
git checkout 8811b1c

# Backend
cd /Users/neardominguez/Desktop/Integradora/backend
git log --oneline
# Verás el commit: "60c3d8d Actualización CORS para puerto 5173"
git checkout 60c3d8d
```

---

## ✅ FUNCIONALIDADES IMPLEMENTADAS

✅ Autenticación con JWT en el backend  
✅ Login conectado a BD de usuarios  
✅ Gestión de canchas (crear, leer, actualizar, eliminar)  
✅ Gestión de usuarios (crear, leer, actualizar, eliminar)  
✅ Validación de archivos (solo .jpg, .jpeg, .png)  
✅ Estado de carga en componentes  
✅ Manejo de errores con alertas SweetAlert  
✅ Paginación de resultados  
✅ CORS habilitado para desarrollo  

---

**Última actualización**: 25 de marzo de 2026  
**Estado**: ✅ FUNCIONANDO CORRECTAMENTE  
**Git Commit**: 8811b1c (Frontend) / 60c3d8d (Backend)
