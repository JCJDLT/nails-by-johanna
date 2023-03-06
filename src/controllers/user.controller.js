import { pool } from "../database.js";
import { getFechaActual } from "../lib/helpers.js";

export const renderUserProfile = async (req, res, next) => {
  await pool.query("DELETE FROM appointment WHERE date < ? AND id_state = 1", [getFechaActual()]);
  const [rows] = await pool.query("SELECT a.id,u.fullname,a.date,a.start_time,n.name,n.price,ap.state FROM appointment a JOIN users u ON a.id_user = u.id JOIN nails n ON a.id_nails = n.id JOIN appointment_state ap ON a.id_state = ap.id WHERE ap.state = 'pendiente' AND a.id_user = ?", [req.user.id]);
  res.render("profile", {
    appointment: rows,
  });
};

export const renderUserAdmin = async (req, res, next) => {
  const [acounts] = await pool.query("SELECT count(id) count FROM appointment WHERE id_state = 2");
  const [prices] = await pool.query("SELECT sum(price) price FROM appointment a JOIN nails n ON a.id_nails = n.id WHERE a.id_state = 2");
  const [users] = await pool.query("SELECT count(u.id) nUsers FROM users u WHERE u.id_rol = 2");

  const [rows] = await pool.query("SELECT MONTHNAME(date) as name, COUNT(*) as cantidad FROM appointment a WHERE a.id_state = 2 AND YEAR(a.date) = YEAR(CURDATE()) GROUP BY MONTHNAME(a.date)");
  const [rows2] = await pool.query("SELECT MONTHNAME(date) as name,sum(n.price) as cantidad FROM appointment a join nails n on a.id_nails = n.id WHERE a.id_state = 2 AND YEAR(a.date) = YEAR(CURDATE()) GROUP BY MONTHNAME(a.date)");
  const [rows3] = await pool.query("SELECT n.name as name, COUNT(*) as cantidad FROM appointment a join nails n on a.id_nails = n.id WHERE a.id_state = 2 AND YEAR(a.date) = YEAR(CURDATE()) GROUP BY n.name");
  const [rows4] = await pool.query("SELECT n.name, sum(n.price) as cantidad FROM appointment a join nails n on a.id_nails = n.id WHERE a.id_state = 2 AND YEAR(a.date) = YEAR(CURDATE()) GROUP BY n.name");
  
  const data1 = convertJSON(rows);
  const data2 = convertJSON(rows2);
  const data3 = convertJSON(rows3);
  const data4 = convertJSON(rows4);

  res.render("admin", {
    count: acounts[0].count,
    price: prices[0].price,
    nUsers: users[0].nUsers,
    rows1: data1,
    rows2: data2,
    rows3: data3,
    rows4: data4,
  });
};

export const convertJSON = (rows) => {
  const data = JSON.stringify(rows);
  return data;
}