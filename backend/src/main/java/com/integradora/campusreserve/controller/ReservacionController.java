package com.integradora.campusreserve.controller;

import com.integradora.campusreserve.dto.ReservacionDTO;
import com.integradora.campusreserve.service.ReservacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador REST para Reservaciones
 * Endpoints: GET, POST, PUT, DELETE /api/reservaciones
 */
@RestController
@RequestMapping("/reservacion")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173", "http://192.168.1.74:5173"})
public class ReservacionController {
    
    private final ReservacionService reservacionService;
    
    /**
     * GET /api/reservaciones
     * Obtiene todas las reservaciones
     */
    @GetMapping
    public ResponseEntity<List<ReservacionDTO>> getAll() {
        List<ReservacionDTO> reservaciones = reservacionService.getAll();
        return ResponseEntity.ok(reservaciones);
    }
    
    /**
     * GET /api/reservaciones/{id}
     * Obtiene una reservación por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReservacionDTO> getById(@PathVariable Integer id) {
        ReservacionDTO reservacion = reservacionService.getById(id);
        return ResponseEntity.ok(reservacion);
    }
    
    /**
     * GET /api/reservaciones/usuario/{idUsuario}
     * Obtiene todas las reservaciones de un usuario
     */
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<ReservacionDTO>> getByUsuario(@PathVariable Integer idUsuario) {
        List<ReservacionDTO> reservaciones = reservacionService.getByUsuario(idUsuario);
        return ResponseEntity.ok(reservaciones);
    }
    
    /**
     * GET /api/reservaciones/horario/{idHorario}
     * Obtiene todas las reservaciones de un horario
     */
    @GetMapping("/horario/{idHorario}")
    public ResponseEntity<List<ReservacionDTO>> getByHorario(@PathVariable Integer idHorario) {
        List<ReservacionDTO> reservaciones = reservacionService.getByHorario(idHorario);
        return ResponseEntity.ok(reservaciones);
    }
    
    /**
     * GET /api/reservaciones/estado/{estado}
     * Obtiene reservaciones por estado (Pendiente, Confirmada, Cancelada, Completada)
     */
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<ReservacionDTO>> getByEstado(@PathVariable String estado) {
        List<ReservacionDTO> reservaciones = reservacionService.getByEstado(estado);
        return ResponseEntity.ok(reservaciones);
    }
    
    /**
     * POST /api/reservaciones
     * Crea una nueva reservación
     * Body:
     * {
     *   "descripcion": "Reservación de cancha para futbol",
     *   "idUsuario": 1,
     *   "idHorario": 1
     * }
     */
    @PostMapping
    public ResponseEntity<ReservacionDTO> create(@RequestBody ReservacionDTO dto) {
        ReservacionDTO nuevaReservacion = reservacionService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaReservacion);
    }
    
    /**
     * PUT /api/reservaciones/{id}
     * Actualiza una reservación existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<ReservacionDTO> update(
            @PathVariable Integer id,
            @RequestBody ReservacionDTO dto) {
        ReservacionDTO reservacionActualizada = reservacionService.update(id, dto);
        return ResponseEntity.ok(reservacionActualizada);
    }
    
    /**
     * PUT /api/reservaciones/{id}/cancelar
     * Cancela una reservación
     */
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<ReservacionDTO> cancelar(@PathVariable Integer id) {
        ReservacionDTO reservacionCancelada = reservacionService.cancelar(id);
        return ResponseEntity.ok(reservacionCancelada);
    }
    
    /**
     * DELETE /api/reservaciones/{id}
     * Elimina una reservación
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        reservacionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
