import { pool } from "../database.js";

export const renderUserProfile = async (req, res, next) => {
  const [rows] = await pool.query("SELECT a.id,u.fullname,a.date,a.start_time,n.name,n.price,ap.state FROM appointment a JOIN users u ON a.id_user = u.id JOIN nails n ON a.id_nails = n.id JOIN appointment_state ap ON a.id_state = ap.id WHERE ap.state = 'pendiente' AND a.id_user ="+req.user.id);
  res.render("profile", { links: rows });
};