# Pruebas de Regresion - Semana 5

**Fecha:** 22 de junio de 2026  
**Version:** v1.0.0-semana5-frontend-proy1

---

## Bugs Corregidos

### BUG-001: Progreso se pierde al recargar
- **Causa:** DiagnosisContext no persistia diagnostico_id
- **Solucion:** Persistir diagnostico_id, proyecto_id y categorias en localStorage
- **Prueba:** Responder preguntas > Recargar pagina > Verificar respuestas restauradas
- **Estado:** CORREGIDO

### BUG-002: PDF no genera en Safari
- **Causa:** html2canvas sin configuracion Safari
- **Solucion:** Agregar allowTaint, imageTimeout, dimensiones explicitas para Safari
- **Prueba:** Abrir en Safari > Descargar PDF > Verificar se genera
- **Estado:** CORREGIDO

### BUG-003: Boton Compartir no funciona en movil
- **Causa:** Web Share API sin fallback completo
- **Solucion:** Fallback a clipboard, boton "Copiar" separado, execCommand fallback
- **Prueba:** En movil > Clic Compartir > Verificar opciones
- **Estado:** CORREGIDO

---

## Pruebas de Regresion

### TC-001: Flujo completo Login -> Resultado
- **Pasos:** Login > Crear proyecto > Diagnostico > Completar > Resultado
- **Esperado:** Todo funciona, progreso persiste al recargar
- **Estado:** PASADO

### TC-002: Recarga de pagina mantiene progreso
- **Pasos:** Responder 2 preguntas > Recargar > Volver al diagnostico
- **Esperado:** Respuestas anteriores restauradas
- **Estado:** PASADO

### TC-003: PDF genera en todos los navegadores
- **Pasos:** Descargar PDF en Chrome, Firefox, Safari
- **Esperado:** PDF se genera correctamente
- **Estado:** PASADO

### TC-004: Compartir funciona en movil
- **Pasos:** En dispositivo movil > Clic Compartir
- **Esperado:** Web Share API activa o fallback a clipboard
- **Estado:** PASADO

### TC-005: Boton Copiar funciona
- **Pasos:** Clic "Copiar" en ShareButtons
- **Esperado:** Enlace copiado al portapapeles, toast confirmacion
- **Estado:** PASADO

### TC-006: Tiempo estimado restante visible
- **Pasos:** Ir a diagnostico > Ver indicador de tiempo
- **Esperado:** Muestra "~X min restantes" basado en preguntas pendientes
- **Estado:** PASADO

### TC-007: Se puede saltar preguntas
- **Pasos:** No responder todas > Clic "Completar Seccion"
- **Esperado:** Permite completar con preguntas pendientes
- **Estado:** PASADO

### TC-008: Landing page carga rapido
- **Pasos:** Medir tiempo de carga de /
- **Esperado:** < 2 segundos
- **Estado:** PASADO

### TC-009: Feedback funciona
- **Pasos:** Clic boton flotante > Puntuar > Enviar
- **Esperado:** Feedback guardado en backend
- **Estado:** PASADO

### TC-010: Onboarding tour se ejecuta
- **Pasos:** Primera visita al Dashboard
- **Esperado:** Tour guiado inicia automaticamente
- **Estado:** PASADO

---

## Resumen

| Metrica | Valor |
|---|---|
| Bugs corregidos | 3 |
| Pruebas ejecutadas | 10 |
| Pruebas pasadas | 10 |
| Pruebas fallidas | 0 |
| Features nuevas | 3 (tiempo estimado, saltar preguntas, boton copiar) |
