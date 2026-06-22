package com.examenU3.Exa.controller;

import com.examenU3.Exa.Dto.PrestamoDTO;
import com.examenU3.Exa.entity.Prestamo;
import com.examenU3.Exa.service.PrestamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/prestamos")
@CrossOrigin(origins = "*")
public class PrestamoController {

    @Autowired
    private PrestamoService service;

    @GetMapping
    public List<Prestamo> obtenerTodos() {

        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Prestamo obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PostMapping("/solicitar")
    public Prestamo solicitarPrestamo(@RequestBody PrestamoDTO dto) {

        return service.solicitarPrestamo(dto);
    }

    @PutMapping("/{id}/aprobar")
    public Prestamo aprobarPrestamo(@PathVariable Long id) {

        return service.aprobarPrestamo(id);
    }

    @PutMapping("/{id}/devolver")
    public Prestamo registrarDevolucion(@PathVariable Long id) {

        return service.registrarDevolucion(id);
    }

    @PutMapping("/{id}/rechazar")
    public Prestamo rechazarPrestamo(@PathVariable Long id) {

        return service.rechazarPrestamo(id);
    }
}
