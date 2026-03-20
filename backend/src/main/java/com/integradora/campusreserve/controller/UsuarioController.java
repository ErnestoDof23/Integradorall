package com.integradora.campusreserve.controller;

import com.integradora.campusreserve.dto.UsuarioDTO;
import com.integradora.campusreserve.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador de Usuario
 */
@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:3000", "http://localhost:5173", "http://192.168.1.74:5173"})
public class UsuarioController {

    private final UsuarioService usuarioService;

    /**
     * Obtener todos los usuarios
     */
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> getAll() {
        log.info("GET /usuarios - Obteniendo todos los usuarios");
        List<UsuarioDTO> usuarios = usuarioService.getAll();
        return ResponseEntity.ok(usuarios);
    }

    /**
     * Obtener usuario por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> getById(@PathVariable Integer id) {
        log.info("GET /usuarios/{} - Obteniendo usuario", id);
        UsuarioDTO usuario = usuarioService.getById(id);
        return ResponseEntity.ok(usuario);
    }

    /**
     * Crear nuevo usuario
     */
    @PostMapping
    public ResponseEntity<UsuarioDTO> create(@RequestBody UsuarioDTO dto) {
        log.info("POST /usuarios - Creando nuevo usuario: {}", dto.getCorreoInstitucional());
        UsuarioDTO created = usuarioService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Actualizar usuario
     */
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> update(@PathVariable Integer id, @RequestBody UsuarioDTO dto) {
        log.info("PUT /usuarios/{} - Actualizando usuario", id);
        UsuarioDTO updated = usuarioService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Eliminar usuario
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        log.info("DELETE /usuarios/{} - Eliminando usuario", id);
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
