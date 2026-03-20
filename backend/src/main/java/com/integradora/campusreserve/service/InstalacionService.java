package com.integradora.campusreserve.service;

import com.integradora.campusreserve.dto.InstalacionDTO;
import com.integradora.campusreserve.entity.Instalacion;
import com.integradora.campusreserve.exception.ResourceNotFoundException;
import com.integradora.campusreserve.repository.InstalacionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Base64;

/**
 * Servicio para Instalacion
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class InstalacionService {

    private final InstalacionRepository instalacionRepository;

    /**
     * Obtener todas las instalaciones
     */
    public List<InstalacionDTO> getAll() {
        log.info("Obteniendo todas las instalaciones");
        return instalacionRepository.findAll()
                .stream()
                .map(this::entityToDTO)
                .toList();
    }

    /**
     * Obtener instalación por ID
     */
    public InstalacionDTO getById(Integer id) {
        log.info("Obteniendo instalación con ID: {}", id);
        Instalacion instalacion = instalacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instalación no encontrada"));
        return entityToDTO(instalacion);
    }

    /**
     * Crear instalación
     */
    public InstalacionDTO create(InstalacionDTO dto) {
        log.info("Creando nueva instalación: {}", dto.getNombre());
        Instalacion instalacion = Instalacion.builder()
                .nombre(dto.getNombre())
                .tipo(Instalacion.TipoInstalacion.valueOf(dto.getTipo()))
                .descripcion(dto.getDescripcion())
                .foto(decodeFoto(dto.getFoto()))
                .estado(Instalacion.EstadoInstalacion.valueOf(dto.getEstado() != null ? dto.getEstado() : "Disponible"))
                .build();
        Instalacion saved = instalacionRepository.save(instalacion);
        log.info("Instalación creada con ID: {}", saved.getIdInstalacion());
        return entityToDTO(saved);
    }

    /**
     * Actualizar instalación
     */
    public InstalacionDTO update(Integer id, InstalacionDTO dto) {
        log.info("Actualizando instalación con ID: {}", id);
        Instalacion instalacion = instalacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instalación no encontrada"));
        
        instalacion.setNombre(dto.getNombre());
        instalacion.setTipo(Instalacion.TipoInstalacion.valueOf(dto.getTipo()));
        instalacion.setDescripcion(dto.getDescripcion());
        if (dto.getFoto() != null && !dto.getFoto().isEmpty()) {
            instalacion.setFoto(decodeFoto(dto.getFoto()));
        }
        if (dto.getEstado() != null) {
            instalacion.setEstado(Instalacion.EstadoInstalacion.valueOf(dto.getEstado()));
        }
        
        Instalacion updated = instalacionRepository.save(instalacion);
        log.info("Instalación actualizada con ID: {}", id);
        return entityToDTO(updated);
    }

    /**
     * Eliminar instalación
     */
    public void delete(Integer id) {
        log.info("Eliminando instalación con ID: {}", id);
        Instalacion instalacion = instalacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instalación no encontrada"));
        instalacionRepository.delete(instalacion);
        log.info("Instalación eliminada con ID: {}", id);
    }

    /**
     * Convertir entidad a DTO
     */
    private InstalacionDTO entityToDTO(Instalacion instalacion) {
        return InstalacionDTO.builder()
                .idInstalacion(instalacion.getIdInstalacion())
                .nombre(instalacion.getNombre())
                .tipo(instalacion.getTipo().toString())
                .descripcion(instalacion.getDescripcion())
                .foto(encodeFoto(instalacion.getFoto()))
                .estado(instalacion.getEstado().toString())
                .build();
    }

    /**
     * Codificar foto a Base64
     */
    private String encodeFoto(byte[] foto) {
        if (foto == null) return null;
        return Base64.getEncoder().encodeToString(foto);
    }

    /**
     * Decodificar foto de Base64
     */
    private byte[] decodeFoto(String foto) {
        if (foto == null || foto.isEmpty()) return null;
        try {
            // Si es data URL, extraer la parte base64
            if (foto.contains(",")) {
                foto = foto.split(",")[1];
            }
            return Base64.getDecoder().decode(foto);
        } catch (IllegalArgumentException e) {
            log.warn("Error decodificando foto: {}", e.getMessage());
            return null;
        }
    }
}
