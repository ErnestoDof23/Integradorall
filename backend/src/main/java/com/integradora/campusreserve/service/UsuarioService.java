package com.integradora.campusreserve.service;

import com.integradora.campusreserve.dto.UsuarioDTO;
import com.integradora.campusreserve.entity.Usuario;
import com.integradora.campusreserve.entity.Rol;
import com.integradora.campusreserve.exception.ResourceNotFoundException;
import com.integradora.campusreserve.repository.UsuarioRepository;
import com.integradora.campusreserve.repository.RolRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Servicio para Usuario
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Obtener todos los usuarios
     */
    public List<UsuarioDTO> getAll() {
        log.info("Obteniendo todos los usuarios");
        return usuarioRepository.findAll()
                .stream()
                .map(this::entityToDTO)
                .toList();
    }

    /**
     * Obtener usuario por ID
     */
    public UsuarioDTO getById(Integer id) {
        log.info("Obteniendo usuario con ID: {}", id);
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return entityToDTO(usuario);
    }

    /**
     * Obtener usuario por email
     */
    public UsuarioDTO getByEmail(String email) {
        log.info("Obteniendo usuario con email: {}", email);
        Usuario usuario = usuarioRepository.findByCorreoInstitucional(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return entityToDTO(usuario);
    }

    /**
     * Crear usuario
     */
    public UsuarioDTO create(UsuarioDTO dto) {
        log.info("Creando nuevo usuario: {}", dto.getCorreoInstitucional());
        
        if (usuarioRepository.existsByCorreoInstitucional(dto.getCorreoInstitucional())) {
            throw new RuntimeException("El correo ya está registrado");
        }

        Rol rol = rolRepository.findById(dto.getIdRol())
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado"));

        Usuario usuario = Usuario.builder()
                .nombre(dto.getNombre())
                .correoInstitucional(dto.getCorreoInstitucional())
                .password(passwordEncoder.encode("DefaultPassword123!"))
                .rol(rol)
                .build();

        Usuario saved = usuarioRepository.save(usuario);
        log.info("Usuario creado con ID: {}", saved.getIdUsuario());
        return entityToDTO(saved);
    }

    /**
     * Actualizar usuario
     */
    public UsuarioDTO update(Integer id, UsuarioDTO dto) {
        log.info("Actualizando usuario con ID: {}", id);
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        usuario.setNombre(dto.getNombre());

        if (dto.getIdRol() != null) {
            Rol rol = rolRepository.findById(dto.getIdRol())
                    .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado"));
            usuario.setRol(rol);
        }

        if (dto.getBloqueado() != null) {
            usuario.setBloqueado(dto.getBloqueado());
        }

        Usuario updated = usuarioRepository.save(usuario);
        log.info("Usuario actualizado con ID: {}", id);
        return entityToDTO(updated);
    }

    /**
     * Eliminar usuario
     */
    public void delete(Integer id) {
        log.info("Eliminando usuario con ID: {}", id);
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        usuarioRepository.delete(usuario);
        log.info("Usuario eliminado con ID: {}", id);
    }

    /**
     * Convertir entidad a DTO
     */
    public UsuarioDTO entityToDTO(Usuario usuario) {
        return UsuarioDTO.builder()
                .idUsuario(usuario.getIdUsuario())
                .nombre(usuario.getNombre())
                .correoInstitucional(usuario.getCorreoInstitucional())
                .bloqueado(usuario.getBloqueado())
                .idRol(usuario.getRol().getIdRol())
                .rolNombre(usuario.getRol().getNombre())
                .build();
    }
}
