import {pool} from '../db.js' // Se ponen con la extensión del archivo js porque es nuestr módulo, si fuese módulo externo no es necesario poner la extensión.

export const ping = async (req, res) => {
    const [result] = await pool.query('SELECT 1 + 1 AS result')
    res.json(result[0]);
}