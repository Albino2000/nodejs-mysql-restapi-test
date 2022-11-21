import { Router } from "express";
import { obtenerEmpleados, obtenerEmpleadosPorId, crearEmpleados, editarEmpleados, editarEmpleadosParcial, eliminarEmpleados } from '../controllers/empleados.controllers.js'

const router = Router();

router.get('/empleados', obtenerEmpleados);
router.get('/empleados/:id', obtenerEmpleadosPorId);

router.post('/empleados', crearEmpleados);

router.put('/empleados/:id', editarEmpleados); // Actualiza todos los campos del registro.
router.patch('/empleados/:id', editarEmpleadosParcial); // Actualiza parcialmente los campos del registro.

router.delete('/empleados/:id', eliminarEmpleados);


export default router;
