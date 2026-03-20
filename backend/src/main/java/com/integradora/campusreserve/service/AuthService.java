package com.integradora.campusreserve.service;

import com.integradora.campusreserve.dto.AuthResponseDTO;
import com.integradora.campusreserve.dto.LoginDTO;
import com.integradora.campusreserve.dto.UsuarioDTO;
import com.integradora.campusreserve.entity.Usuario;
import com.integradora.campusreserve.repository.UsuarioRepository;
import com.integradora.campusreserve.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Servicio de Autenticación
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UsuarioService usuarioService;

    /**
     * Autenticar usuario y retornar token JWT
     */
    public AuthResponseDTO login(LoginDTO loginDTO) {
        log.info("Intentando autenticar usuario: {}", loginDTO.getCorreoInstitucional());

        // 1. Verificar que el usuario existe
        Usuario usuario = usuarioRepository.findByCorreoInstitucional(loginDTO.getCorreoInstitucional())
                .orElseThrow(() -> {
                    log.warn("Usuario no encontrado: {}", loginDTO.getCorreoInstitucional());
                    return new RuntimeException("Usuario o contraseña incorrectos");
                });

        // 2. Verificar contraseña PRIMERO (antes de cualquier otra validación)
        if (!passwordEncoder.matches(loginDTO.getPassword(), usuario.getPassword())) {
            log.warn("Contraseña incorrecta para usuario: {}", loginDTO.getCorreoInstitucional());
            throw new RuntimeException("Contraseña incorrecta");
        }

        // 3. Verificar si el usuario está bloqueado
        if (usuario.getBloqueado() != null && usuario.getBloqueado()) {
            log.warn("Usuario bloqueado: {}", loginDTO.getCorreoInstitucional());
            throw new RuntimeException("Tu cuenta ha sido bloqueada. Contacta al administrador.");
        }

        // 4. Verificar que sea admin (rol 1)
        if (usuario.getRol() == null || usuario.getRol().getIdRol() != 1) {
            log.warn("Intento de login de usuario no admin: {}", loginDTO.getCorreoInstitucional());
            throw new RuntimeException("Solo los administradores pueden acceder a este sistema");
        }

        String token = jwtTokenProvider.generateToken(usuario.getIdUsuario(), usuario.getCorreoInstitucional());
        UsuarioDTO usuarioDTO = usuarioService.entityToDTO(usuario);

        log.info("Usuario autenticado exitosamente: {}", usuario.getIdUsuario());

        return AuthResponseDTO.builder()
                .token(token)
                .tipo("Bearer")
                .usuario(usuarioDTO)
                .build();
    }
}
