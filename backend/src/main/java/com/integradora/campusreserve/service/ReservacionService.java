package com.integradora.campusreserve.service;

import com.integradora.campusreserve.dto.ReservacionDTO;
import com.integradora.campusreserve.entity.Reservacion;
import com.integradora.campusreserve.entity.Usuario;
import com.integradora.campusreserve.entity.Horario;
import com.integradora.campusreserve.exception.ResourceNotFoundException;
import com.integradora.campusreserve.repository.ReservacionRepository;
import com.integradora.campusreserve.repository.UsuarioRepository;
import com.integradora.campusreserve.repository.HorarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

/**
 * Servicio para Reservacion
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ReservacionService {
    
    private final ReservacionRepository reservacionRepository;
    private final UsuarioRepository usuarioRepository;
    private final HorarioRepository horarioRepository;
    
    /**
     * Obtiene todas las reservaciones
     */
    public List<ReservacionDTO> getAll() {
        log.info("Obteniendo todas las reservaciones");
        return reservacionRepository.findAll()
                .stream()
                .map(this::entityToDTO)
                .toList();
    }
    
    /**
     * Obtiene una reservación por su ID
     */
    public ReservacionDTO getById(Integer id) {
        log.info("Obteniendo reservación con ID: {}", id);
        Reservacion reservacion = reservacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservación no encontrada con ID: " + id));
        return entityToDTO(reservacion);
    }
    
    /**
     * Obtiene todas las reservaciones de un usuario
     */
    public List<ReservacionDTO> getByUsuario(Integer idUsuario) {
        log.info("Obteniendo reservaciones del usuario: {}", idUsuario);
        return reservacionRepository.findByUsuarioIdUsuario(idUsuario)
                .stream()
                .map(this::entityToDTO)
                .toList();
    }
    
    /**
     * Obtiene todas las reservaciones de un horario
     */
    public List<ReservacionDTO> getByHorario(Integer idHorario) {
        log.info("Obteniendo reservaciones del horario: {}", idHorario);
        return reservacionRepository.findByHorarioIdHorario(idHorario)
                .stream()
                .map(this::entityToDTO)
                .toList();
    }
    
    /**
     * Obtiene reservaciones por estado
     */
    public List<ReservacionDTO> getByEstado(String estado) {
        log.info("Obteniendo reservaciones por estado: {}", estado);
        return reservacionRepository.findByEstado(estado)
                .stream()
                .map(this::entityToDTO)
                .toList();
    }
    
    /**
     * Crea una nueva reservación
     * Validaciones:
     * - Verifica que el usuario exista
     * - Verifica que el horario exista
     * - Valida que no exista reservación activa en ese horario
     */
    public ReservacionDTO create(ReservacionDTO dto) {
        log.info("Creando nueva reservación - Usuario: {}, Horario: {}", dto.getIdUsuario(), dto.getIdHorario());
        Usuario usuario = usuarioRepository.findById(dto.getIdUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + dto.getIdUsuario()));
        
        Horario horario = horarioRepository.findById(dto.getIdHorario())
                .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado con ID: " + dto.getIdHorario()));
        
        // Validar que no exista reservación activa en ese horario (trigger lo valida también)
        List<Reservacion> reservacionesActivas = reservacionRepository.findByHorarioIdHorario(dto.getIdHorario());
        boolean horarioOcupado = reservacionesActivas.stream()
                .anyMatch(r -> "Activa".equalsIgnoreCase(r.getEstado()));
        
        if (horarioOcupado) {
            throw new RuntimeException("El horario ya tiene una reservación activa");
        }
        
        Reservacion reservacion = Reservacion.builder()
                .fechaReserva(LocalDate.now())
                .estado("Activa")
                .usuario(usuario)
                .horario(horario)
                .build();
        
        Reservacion reservacionGuardada = reservacionRepository.save(reservacion);
        log.info("Reservación creada con ID: {}", reservacionGuardada.getIdReservacion());
        return entityToDTO(reservacionGuardada);
    }
    
    /**
     * Actualiza una reservación existente
     */
    public ReservacionDTO update(Integer id, ReservacionDTO dto) {
        log.info("Actualizando reservación con ID: {}", id);
        Reservacion reservacion = reservacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservación no encontrada con ID: " + id));
        
        if (dto.getEstado() != null) {
            reservacion.setEstado(dto.getEstado());
        }
        
        if (dto.getIdHorario() != null && !dto.getIdHorario().equals(reservacion.getHorario().getIdHorario())) {
            Horario horario = horarioRepository.findById(dto.getIdHorario())
                    .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado con ID: " + dto.getIdHorario()));
            reservacion.setHorario(horario);
        }
        
        Reservacion reservacionActualizada = reservacionRepository.save(reservacion);
        log.info("Reservación actualizada con ID: {}", id);
        return entityToDTO(reservacionActualizada);
    }
    
    /**
     * Cancela una reservación
     */
    public ReservacionDTO cancelar(Integer id) {
        log.info("Cancelando reservación con ID: {}", id);
        Reservacion reservacion = reservacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservación no encontrada con ID: " + id));
        
        reservacion.setEstado("Cancelada");
        Reservacion reservacionCancelada = reservacionRepository.save(reservacion);
        log.info("Reservación cancelada con ID: {}", id);
        return entityToDTO(reservacionCancelada);
    }
    
    /**
     * Elimina una reservación
     */
    public void delete(Integer id) {
        log.info("Eliminando reservación con ID: {}", id);
        Reservacion reservacion = reservacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservación no encontrada con ID: " + id));
        
        reservacionRepository.delete(reservacion);
        log.info("Reservación eliminada con ID: {}", id);
    }
    
    /**
     * Convierte una entidad Reservacion a DTO
     */
    private ReservacionDTO entityToDTO(Reservacion reservacion) {
        return ReservacionDTO.builder()
                .idReservacion(reservacion.getIdReservacion())
                .fechaReserva(reservacion.getFechaReserva() != null ? reservacion.getFechaReserva().toString() : null)
                .estado(reservacion.getEstado())
                .idUsuario(reservacion.getUsuario().getIdUsuario())
                .idHorario(reservacion.getHorario().getIdHorario())
                .build();
    }
}
