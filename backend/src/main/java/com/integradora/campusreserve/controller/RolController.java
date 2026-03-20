package com.integradora.campusreserve.controller;

import com.integradora.campusreserve.entity.Rol;
import com.integradora.campusreserve.repository.RolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador de Rol
 */
@RestController
@RequestMapping("/rol")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:3000", "http://localhost:5173", "http://192.168.1.74:5173"})
public class RolController {

    private final RolRepository rolRepository;

    /**
     * Obtener todos los roles
     */
    @GetMapping
    public ResponseEntity<List<Rol>> getAllRoles() {
        List<Rol> roles = rolRepository.findAll();
        return ResponseEntity.ok(roles);
    }

    /**
     * Obtener un rol por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Rol> getRolById(@PathVariable Integer id) {
        return rolRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
