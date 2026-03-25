#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Campus Reserve - Sistema Completo${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Verificar que MySQL está corriendo
echo -e "${YELLOW}Verificando MySQL...${NC}"
if ! mysql -u root -prootroot -e "SELECT 1;" &> /dev/null; then
    echo -e "${RED}✗ MySQL no está corriendo${NC}"
    echo -e "${YELLOW}Iniciando MySQL...${NC}"
    brew services start mysql 2>/dev/null || echo -e "${RED}No se pudo iniciar MySQL automáticamente${NC}"
    sleep 2
fi
echo -e "${GREEN}✓ MySQL está disponible${NC}\n"

# Iniciar Backend
echo -e "${YELLOW}Iniciando Backend (puerto 8080)...${NC}"
cd /Users/neardominguez/Desktop/Integradora/backend

if [ ! -f "target/campus-reserve-api-1.0.0.jar" ]; then
    echo -e "${YELLOW}Compilando Backend...${NC}"
    mvn clean package -DskipTests -q
fi

nohup java -jar target/campus-reserve-api-1.0.0.jar > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend iniciado (PID: $BACKEND_PID)${NC}"

# Esperar a que el backend esté listo
echo -e "${YELLOW}Esperando que Backend esté listo...${NC}"
sleep 5

# Verificar que Backend está corriendo
if curl -s http://localhost:8080/api/rol &> /dev/null; then
    echo -e "${GREEN}✓ Backend respondiendo correctamente${NC}\n"
else
    echo -e "${RED}✗ Backend no responde (check /tmp/backend.log)${NC}"
fi

# Iniciar Frontend
echo -e "${YELLOW}Iniciando Frontend (puerto 5173)...${NC}"
cd /Users/neardominguez/Desktop/Integradora/frontend

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Instalando dependencias de Frontend...${NC}"
    npm install
fi

nohup npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend iniciado (PID: $FRONTEND_PID)${NC}\n"

# Información final
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✓ Sistema iniciado correctamente${NC}"
echo -e "${GREEN}========================================\n${NC}"
echo -e "${BLUE}📱 Acceso a la aplicación:${NC}"
echo -e "   ${GREEN}http://localhost:5173${NC}\n"
echo -e "${BLUE}🔑 Credenciales de acceso:${NC}"
echo -e "   Email: ${GREEN}admin@campus.com${NC}"
echo -e "   Contraseña: ${GREEN}password123${NC}\n"
echo -e "${BLUE}📊 API Backend:${NC}"
echo -e "   ${GREEN}http://localhost:8080/api${NC}\n"
echo -e "${BLUE}📝 Logs:${NC}"
echo -e "   Backend: ${GREEN}tail -f /tmp/backend.log${NC}"
echo -e "   Frontend: ${GREEN}tail -f /tmp/frontend.log${NC}\n"
echo -e "${BLUE}🛑 Para detener todo:${NC}"
echo -e "   ${GREEN}kill $BACKEND_PID $FRONTEND_PID${NC}\n"

# Mantener el script corriendo para mostrar logs
echo -e "${YELLOW}Mostrando logs del Backend (presiona Ctrl+C para salir):${NC}\n"
tail -f /tmp/backend.log
