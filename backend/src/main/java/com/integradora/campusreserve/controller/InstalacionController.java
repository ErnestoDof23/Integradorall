package com.integradora.campusreserve.controller;

import com.integradora.campusreserve.dto.InstalacionDTO;
import com.integradora.campusreserve.service.InstalacionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador de Instalacion
 */
@RestController
@RequestMapping("/instalacion")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:3000", "http://localhost:5173", "http://192.168.1.74:5173"})
public class InstalacionController {

    private final InstalacionService instalacionService;

    /**
     * Obtener todas las instalaciones
     */
    @GetMapping
    public ResponseEntity<List<InstalacionDTO>> getAll() {
        log.info("GET /instalaciones - Obteniendo todas las instalaciones");
        List<InstalacionDTO> instalaciones = instalacionService.getAll();
        return ResponseEntity.ok(instalaciones);
    }

    /**
     * Obtener instalación por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<InstalacionDTO> getById(@PathVariable Integer id) {
        log.info("GET /instalaciones/{} - Obteniendo instalación", id);
        InstalacionDTO instalacion = instalacionService.getById(id);
        return ResponseEntity.ok(instalacion);
    }

    /**
     * Crear nueva instalación
     */
    @PostMapping
    public ResponseEntity<InstalacionDTO> create(@RequestBody InstalacionDTO dto) {
        log.info("POST /instalaciones - Creando nueva instalación: {}", dto.getNombre());
        InstalacionDTO created = instalacionService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Actualizar instalación
     */
    @PutMapping("/{id}")
    public ResponseEntity<InstalacionDTO> update(@PathVariable Integer id, @RequestBody InstalacionDTO dto) {
        log.info("PUT /instalaciones/{} - Actualizando instalación", id);
        InstalacionDTO updated = instalacionService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Eliminar instalación
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        log.info("DELETE /instalaciones/{} - Eliminando instalación", id);
        instalacionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
