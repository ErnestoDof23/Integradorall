package com.examenU3.Exa.service;

import com.examenU3.Exa.Dto.PrestamoDTO;
import com.examenU3.Exa.entity.Equipo;
import com.examenU3.Exa.entity.Prestamo;
import com.examenU3.Exa.entity.Usuario;
import com.examenU3.Exa.repository.EquipoRepository;
import com.examenU3.Exa.repository.PrestamoRepository;
import com.examenU3.Exa.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.time.LocalDate;

@Service
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private EquipoRepository equipoRepo;

    // Solocitar pretamo
    public Prestamo solicitarPrestamo(PrestamoDTO dto) {
        Prestamo prestamo = new Prestamo();

        Usuario usuario = usuarioRepo.findById(dto.getUsuarioId()).orElse(null);
        Equipo equipo = equipoRepo.findById(dto.getEquipoId()).orElse(null);

        if (usuario == null) {
            prestamo.setEstado(Prestamo.Estado.RECHAZADO);
            return prestamo;
        }

        if (!usuario.getActivo()) {
            prestamo.setEstado(Prestamo.Estado.RECHAZADO);
            return prestamo;
        }

        if (equipo == null) {
            prestamo.setEstado(Prestamo.Estado.RECHAZADO);
            return prestamo;
        }

        if (!equipo.getDisponible()) {
            prestamo.setEstado(Prestamo.Estado.RECHAZADO);
            return prestamo;
        }

        List<Prestamo> prestamosActivos = prestamoRepo.findByUsuarioAndEstado(usuario, Prestamo.Estado.SOLICITADO);
        List<Prestamo> prestamosAprobados = prestamoRepo.findByUsuarioAndEstado(usuario, Prestamo.Estado.APROBADO);

        if (prestamosActivos.size() + prestamosAprobados.size() >= 2) {
            prestamo.setEstado(Prestamo.Estado.RECHAZADO);
            return prestamo;
        }

        // si todo se cumple se crear el prestamos con estado Solicitado
        prestamo.setUsuario(usuario);
        prestamo.setEquipo(equipo);
        prestamo.setFechaSolicitud(dto.getFechaSolicitud() != null ? dto.getFechaSolicitud() : LocalDate.now());
        prestamo.setFechaDevolucion(dto.getFechaDevolucion());
        prestamo.setEstado(Prestamo.Estado.SOLICITADO);

        return prestamoRepo.save(prestamo);
    }

    // Aprobar prestamo
    public Prestamo aprobarPrestamo(Long idPrestamo) {
        Prestamo prestamo = prestamoRepo.findById(idPrestamo).orElse(null);

        if (prestamo == null) {
            return null;
        }

        if (!prestamo.getEstado().equals(Prestamo.Estado.SOLICITADO)) {
            return prestamo;
        }

        prestamo.setEstado(Prestamo.Estado.APROBADO);

        Equipo equipo = prestamo.getEquipo();
        if (equipo != null) {
            equipo.setDisponible(false);
            equipoRepo.save(equipo);
        }

        return prestamoRepo.save(prestamo);
    }

    // Registar la devolucion
    public Prestamo registrarDevolucion(Long idPrestamo) {
        Prestamo prestamo = prestamoRepo.findById(idPrestamo).orElse(null);

        if (prestamo == null) {
            return null;
        }

        prestamo.setEstado(Prestamo.Estado.DEVUELTO);
        prestamo.setFechaDevolucion(LocalDate.now());

        Equipo equipo = prestamo.getEquipo();
        if (equipo != null) {
            equipo.setDisponible(true);
            equipoRepo.save(equipo);
        }

        return prestamoRepo.save(prestamo);
    }

    // Rechzr prestamo
    public Prestamo rechazarPrestamo(Long idPrestamo) {
        Prestamo prestamo = prestamoRepo.findById(idPrestamo).orElse(null);

        if (prestamo == null) {
            return null;
        }

        if (!prestamo.getEstado().equals(Prestamo.Estado.SOLICITADO)) {
            return prestamo;
        }

        prestamo.setEstado(Prestamo.Estado.RECHAZADO);

        return prestamoRepo.save(prestamo);
    }

    public List<Prestamo> obtenerTodos() {
        return prestamoRepo.findAll();
    }

    public Prestamo obtenerPorId(Long id) {
        return prestamoRepo.findById(id).orElse(null);
    }
}
