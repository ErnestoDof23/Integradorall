package com.integradora.campusreserve.service;

import com.integradora.campusreserve.dto.HorarioDTO;
import com.integradora.campusreserve.entity.Horario;
import com.integradora.campusreserve.entity.Instalacion;
import com.integradora.campusreserve.exception.ResourceNotFoundException;
import com.integradora.campusreserve.repository.HorarioRepository;
import com.integradora.campusreserve.repository.InstalacionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Servicio para Horario
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class HorarioService {
    
    private final HorarioRepository horarioRepository;
    private final InstalacionRepository instalacionRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm:ss");
    
    /**
     * Obtiene todos los horarios disponibles
     */
    public List<HorarioDTO> getAll() {
        log.info("Obteniendo todos los horarios");
        return horarioRepository.findAll()
                .stream()
                .map(this::entityToDTO)
                .toList();
    }
    
    /**
     * Obtiene un horario por su ID
     */
    public HorarioDTO getById(Integer id) {
        log.info("Obteniendo horario con ID: {}", id);
        Horario horario = horarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado con ID: " + id));
        return entityToDTO(horario);
    }
    
    /**
     * Obtiene todos los horarios de una instalación específica
     */
    public List<HorarioDTO> getByInstalacion(Integer idInstalacion) {
        log.info("Obteniendo horarios de instalación: {}", idInstalacion);
        return horarioRepository.findByInstalacionIdInstalacion(idInstalacion)
                .stream()
                .map(this::entityToDTO)
                .toList();
    }
    
    /**
     * Obtiene horarios disponibles de una instalación en una fecha específica
     */
    public List<HorarioDTO> getAvailableByInstalacionAndFecha(Integer idInstalacion, String fecha) {
        log.info("Obteniendo horarios disponibles - Instalación: {}, Fecha: {}", idInstalacion, fecha);
        LocalDate fechaLocalDate = LocalDate.parse(fecha, DATE_FORMATTER);
        return horarioRepository.findByInstalacionIdInstalacionAndFecha(idInstalacion, fechaLocalDate)
                .stream()
                .map(this::entityToDTO)
                .toList();
    }
    
    /**
     * Crea un nuevo horario
     */
    public HorarioDTO create(HorarioDTO dto) {
        log.info("Creando nuevo horario para instalación: {}", dto.getIdInstalacion());
        Instalacion instalacion = instalacionRepository.findById(dto.getIdInstalacion())
                .orElseThrow(() -> new ResourceNotFoundException("Instalación no encontrada con ID: " + dto.getIdInstalacion()));
        
        LocalDate fecha = LocalDate.parse(dto.getFecha(), DATE_FORMATTER);
        LocalTime horaInicio = LocalTime.parse(dto.getHoraInicio(), TIME_FORMATTER);
        LocalTime horaFin = LocalTime.parse(dto.getHoraFin(), TIME_FORMATTER);
        
        Horario horario = Horario.builder()
                .fecha(fecha)
                .horaInicio(horaInicio)
                .horaFin(horaFin)
                .instalacion(instalacion)
                .build();
        
        Horario horarioGuardado = horarioRepository.save(horario);
        log.info("Horario creado con ID: {}", horarioGuardado.getIdHorario());
        return entityToDTO(horarioGuardado);
    }
    
    /**
     * Actualiza un horario existente
     */
    public HorarioDTO update(Integer id, HorarioDTO dto) {
        log.info("Actualizando horario con ID: {}", id);
        Horario horario = horarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado con ID: " + id));
        
        LocalDate fecha = LocalDate.parse(dto.getFecha(), DATE_FORMATTER);
        LocalTime horaInicio = LocalTime.parse(dto.getHoraInicio(), TIME_FORMATTER);
        LocalTime horaFin = LocalTime.parse(dto.getHoraFin(), TIME_FORMATTER);
        
        horario.setFecha(fecha);
        horario.setHoraInicio(horaInicio);
        horario.setHoraFin(horaFin);
        
        if (dto.getIdInstalacion() != null && !dto.getIdInstalacion().equals(horario.getInstalacion().getIdInstalacion())) {
            Instalacion instalacion = instalacionRepository.findById(dto.getIdInstalacion())
                    .orElseThrow(() -> new ResourceNotFoundException("Instalación no encontrada con ID: " + dto.getIdInstalacion()));
            horario.setInstalacion(instalacion);
        }
        
        Horario horarioActualizado = horarioRepository.save(horario);
        log.info("Horario actualizado con ID: {}", id);
        return entityToDTO(horarioActualizado);
    }
    
    /**
     * Elimina un horario
     */
    public void delete(Integer id) {
        log.info("Eliminando horario con ID: {}", id);
        Horario horario = horarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado con ID: " + id));
        horarioRepository.delete(horario);
        log.info("Horario eliminado con ID: {}", id);
    }
    
    /**
     * Convierte una entidad Horario a DTO
     */
    private HorarioDTO entityToDTO(Horario horario) {
        return HorarioDTO.builder()
                .idHorario(horario.getIdHorario())
                .fecha(horario.getFecha().format(DATE_FORMATTER))
                .horaInicio(horario.getHoraInicio().format(TIME_FORMATTER))
                .horaFin(horario.getHoraFin().format(TIME_FORMATTER))
                .idInstalacion(horario.getInstalacion().getIdInstalacion())
                .build();
    }
}
