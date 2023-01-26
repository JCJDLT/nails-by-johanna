import { pool } from "../database.js";

export const renderIndex = (req, res) => res.render("index");

export const ping = async (req, res) => {
    const [result] = await pool.query('SELECT * from users')
    res.json(result[1]);
}

export const renderCatalogo = (req, res) => res.render("catalogo");