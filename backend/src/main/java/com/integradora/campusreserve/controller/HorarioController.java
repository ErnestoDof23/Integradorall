package com.integradora.campusreserve.controller;

import com.integradora.campusreserve.dto.HorarioDTO;
import com.integradora.campusreserve.service.HorarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador REST para Horarios
 * Endpoints: GET, POST, PUT, DELETE /api/horarios
 */
@RestController
@RequestMapping("/horario")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173", "http://192.168.1.74:5173"})
public class HorarioController {
    
    private final HorarioService horarioService;
    
    /**
     * GET /api/horarios
     * Obtiene todos los horarios
     */
    @GetMapping
    public ResponseEntity<List<HorarioDTO>> getAll() {
        List<HorarioDTO> horarios = horarioService.getAll();
        return ResponseEntity.ok(horarios);
    }
    
    /**
     * GET /api/horarios/{id}
     * Obtiene un horario por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<HorarioDTO> getById(@PathVariable Integer id) {
        HorarioDTO horario = horarioService.getById(id);
        return ResponseEntity.ok(horario);
    }
    
    /**
     * GET /api/horarios/instalacion/{idInstalacion}
     * Obtiene todos los horarios de una instalación
     */
    @GetMapping("/instalacion/{idInstalacion}")
    public ResponseEntity<List<HorarioDTO>> getByInstalacion(@PathVariable Integer idInstalacion) {
        List<HorarioDTO> horarios = horarioService.getByInstalacion(idInstalacion);
        return ResponseEntity.ok(horarios);
    }
    
    /**
     * GET /api/horarios/instalacion/{idInstalacion}/fecha/{fecha}
     * Obtiene horarios disponibles de una instalación en una fecha específica
     * Formato fecha: yyyy-MM-dd
     */
    @GetMapping("/instalacion/{idInstalacion}/fecha/{fecha}")
    public ResponseEntity<List<HorarioDTO>> getAvailableByInstalacionAndFecha(
            @PathVariable Integer idInstalacion,
            @PathVariable String fecha) {
        List<HorarioDTO> horarios = horarioService.getAvailableByInstalacionAndFecha(idInstalacion, fecha);
        return ResponseEntity.ok(horarios);
    }
    
    /**
     * POST /api/horarios
     * Crea un nuevo horario
     * Body:
     * {
     *   "fecha": "2026-03-20",
     *   "horaInicio": "10:00:00",
     *   "horaFin": "11:00:00",
     *   "idInstalacion": 1
     * }
     */
    @PostMapping
    public ResponseEntity<HorarioDTO> create(@RequestBody HorarioDTO dto) {
        HorarioDTO nuevoHorario = horarioService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoHorario);
    }
    
    /**
     * PUT /api/horarios/{id}
     * Actualiza un horario existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<HorarioDTO> update(
            @PathVariable Integer id,
            @RequestBody HorarioDTO dto) {
        HorarioDTO horarioActualizado = horarioService.update(id, dto);
        return ResponseEntity.ok(horarioActualizado);
    }
    
    /**
     * DELETE /api/horarios/{id}
     * Elimina un horario
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        horarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
