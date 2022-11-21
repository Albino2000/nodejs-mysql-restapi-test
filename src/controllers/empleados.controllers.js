import { pool } from '../db.js';

export const obtenerEmpleados = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM empleados')
        res.json(rows);

    } catch (error) {
        res.status(500);
        return res.json({ message: 'Hubo algún error' });
    };
};

export const obtenerEmpleadosPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        };
        res.json(rows[0]);
    } catch (error) {
        res.status(500);
        return res.json({ message: 'Hubo algún error' });
    }
};

export const crearEmpleados = async (req, res) => {
    const { name, salary } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO empleados (name, salary) VALUES (?, ?)', [name, salary]);
        res.send({
            id: rows.insertId,
            name,
            salary
        });
    } catch (error) {
        res.status(500);
        return res.json({ message: 'Hubo algún error' });
    }
};

// Edita de manera completa todos los campos del registro.
export const editarEmpleados = async (req, res) => {

    try {
        const [result] = await pool.query('UPDATE empleados SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [req.body.name, req.body.salary, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no hallado' });
        };

        const [rows] = await pool.query('SELECT * FROM empleados WHERE id = ?', [req.params.id]);

        res.json('Empleado actualizado');
    } catch (error) {
        res.status(500);
        return res.json({ message: 'Hubo algún error' });
    }

}

// Editar de manera parcial los campos de un registro.
export const editarEmpleadosParcial = async (req, res) => {

    try {
        const [result] = await pool.query('UPDATE empleados SET salary = IFNULL(?, salary) WHERE id = ?', [req.body.salary, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no hallado' });
        };

        const [rows] = await pool.query('SELECT * FROM empleados WHERE id = ?', [req.params.id]);

        res.json('Empleado actualizado');
    } catch (error) {
        res.status(500);
        return res.json({ message: 'Hubo algún error' });
    }
}


export const eliminarEmpleados = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM empleados WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Empleado no hallado' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500);
        return res.json({ message: 'Hubo algún error' });
    }
} 
