#!/bin/bash

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Campus Reserve - Iniciando Sistema Completo${NC}"
echo -e "${BLUE}================================================${NC}\n"

# 1. Verificar MySQL
echo -e "${YELLOW}[1/3] Verificando MySQL...${NC}"
if mysql -u root -prootroot -e "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ MySQL está corriendo${NC}\n"
else
    echo -e "${RED}✗ MySQL no está corriendo${NC}"
    echo -e "${YELLOW}Iniciando MySQL...${NC}"
    brew services start mysql > /dev/null 2>&1
    sleep 2
    echo -e "${GREEN}✓ MySQL iniciado${NC}\n"
fi

# 2. Limpiar y asegurar que el backend no está corriendo
echo -e "${YELLOW}[2/3] Limpiando procesos previos...${NC}"
pkill -f "campus-reserve-api" > /dev/null 2>&1
pkill -f "node" > /dev/null 2>&1
sleep 2

# 3. Iniciar Backend
echo -e "${YELLOW}[3/3] Iniciando Backend (Puerto 8080)...${NC}"
cd /Users/neardominguez/Desktop/Integradora/backend
java -jar target/campus-reserve-api-1.0.0.jar > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend iniciando (PID: $BACKEND_PID)${NC}"

# Esperar a que el backend esté listo
sleep 6
if curl -s http://localhost:8080/api/rol > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend respondiendo${NC}\n"
else
    echo -e "${RED}✗ Backend no responde${NC}"
    echo -e "${YELLOW}Revisa los logs: tail -f /tmp/backend.log${NC}"
    exit 1
fi

# 4. Iniciar Frontend
echo -e "${YELLOW}Iniciando Frontend (Puerto 5173)...${NC}"
cd /Users/neardominguez/Desktop/Integradora/frontend
npm install --silent > /dev/null 2>&1
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend iniciando (PID: $FRONTEND_PID)${NC}"

sleep 3

# Resumen
echo -e "\n${BLUE}================================================${NC}"
echo -e "${GREEN}✓ Sistema iniciado exitosamente${NC}"
echo -e "${BLUE}================================================${NC}\n"

echo -e "${YELLOW}URLs:${NC}"
echo -e "  Frontend:  ${BLUE}http://localhost:5173${NC}"
echo -e "  Backend:   ${BLUE}http://localhost:8080/api${NC}\n"

echo -e "${YELLOW}Credenciales:${NC}"
echo -e "  Email:     ${BLUE}admin@campus.com${NC}"
echo -e "  Password:  ${BLUE}password123${NC}\n"

echo -e "${YELLOW}Acciones:${NC}"
echo -e "  • Abre: http://localhost:5173"
echo -e "  • Ingresa con las credenciales arriba"
echo -e "  • Ver backend logs:   tail -f /tmp/backend.log"
echo -e "  • Ver frontend logs:  tail -f /tmp/frontend.log"
echo -e "  • Detener: Presiona Ctrl+C\n"

# Mantener scripts corriendo
wait
