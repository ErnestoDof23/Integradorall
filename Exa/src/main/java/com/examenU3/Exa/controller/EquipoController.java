package com.examenU3.Exa.controller;

import com.examenU3.Exa.entity.Equipo;
import com.examenU3.Exa.service.EquipoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/equipos")
@CrossOrigin(origins = "*")
public class EquipoController {


    private EquipoService service;

    @GetMapping
    public List<Equipo> obtenerTodos() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Equipo obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PostMapping
    public Equipo crear(@RequestBody Equipo equipo) {
        return service.crear(equipo);
    }

    @PutMapping("/{id}")
    public Equipo actualizar(@PathVariable Long id, @RequestBody Equipo equipo) {
        return service.actualizar(id, equipo);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

    @GetMapping("/buscar-disponible")
    public List<Equipo> buscarEquipoDisponiblePorNombre(@RequestParam String nombre) {
        return service.buscarEquipoDisponiblePorNombre(nombre);
    }
}
