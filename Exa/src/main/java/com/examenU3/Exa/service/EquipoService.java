package com.examenU3.Exa.service;

import com.examenU3.Exa.entity.Equipo;
import com.examenU3.Exa.repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class EquipoService {

    @Autowired
    private EquipoRepository repo;

    public List<Equipo> obtenerTodos() {

        return repo.findAll();
    }

    public Equipo obtenerPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Equipo crear(Equipo equipo) {
        return repo.save(equipo);
    }

    public Equipo actualizar(Long id, Equipo equipo) {
        Equipo existente = repo.findById(id).orElse(null);
        if (existente != null) {
            existente.setNombre(equipo.getNombre());
            existente.setTipo(equipo.getTipo());
            existente.setDisponible(equipo.getDisponible());
            return repo.save(existente);
        }
        return null;
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    public List<Equipo> buscarEquipoDisponiblePorNombre(String nombre) {
        return repo.findByNombreContainsIgnoreCaseAndDisponibleTrue(nombre);
    }
}
