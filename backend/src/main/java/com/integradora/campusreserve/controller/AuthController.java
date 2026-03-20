package com.integradora.campusreserve.controller;

import com.integradora.campusreserve.dto.AuthResponseDTO;
import com.integradora.campusreserve.dto.LoginDTO;
import com.integradora.campusreserve.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador de Autenticación
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:3000", "http://localhost:5173", "http://192.168.1.74:5173"})
public class AuthController {

    private final AuthService authService;

    /**
     * Login de usuario
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        log.info("Recibido solicitud de login para: {}", loginDTO.getCorreoInstitucional());
        AuthResponseDTO response = authService.login(loginDTO);
        return ResponseEntity.ok(response);
    }
}
