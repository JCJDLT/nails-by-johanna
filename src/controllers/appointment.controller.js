import { pool } from "../database.js";
import { sumTime, getFechaActual, getHoraActual } from "../lib/helpers.js";

export const renderAppointments = async (req, res, next) => {
    const [rows] = await pool.query("SELECT a.id,u.fullname,a.date,a.start_time,n.name,n.price,ap.state FROM appointment a JOIN users u ON a.id_user = u.id JOIN nails n ON a.id_nails = n.id JOIN appointment_state ap ON a.id_state = ap.id WHERE ap.state = 'pendiente'");
    res.render("appointment/list", { links: rows });
};

export const renderAppointmentsAdd = async (req, res, next) => {
    const selectedItem = req.query.selectedItem;
    if (selectedItem == null) {
        const { date } = req.query;
        res.render("appointment/add", {
            date,
            getFechaActual,
        });
    } else {
        validationPriceNails(selectedItem, res);
    }
};

export const addAppointments = async (req, res, next) => {

    const { date, start_time, nails } = req.body;
    //Validations

    if (start_time < getHoraActual() && date == getFechaActual()) {
        req.flash("message", "Debes agendar la cita minimo 30 minutos despues de la hora actual");
        return res.redirect("/appointment/add?date=" + date);
    }

    // Code for is registry of appointment
    const newAppointment = {
        date,
        start_time,
    };

    newAppointment.id_user = req.user.id;
    newAppointment.id_state = 1;

    const [result] = await pool.query("SELECT * FROM nails WHERE name = ?", [nails]);
    newAppointment.id_nails = result[0].id;

    const end_time = sumTime(start_time, result[0].duration);
    newAppointment.end_time = end_time;

    console.log(newAppointment);
    const [resultApp] = await pool.query("SELECT * FROM appointment WHERE start_time < ? AND end_time > ? AND date = ?", [end_time, start_time, date]);
    console.log(resultApp);

    if (resultApp.length > 0) {
        req.flash("message", "El horario escogido no esta disponible");
        res.redirect(req.originalUrl + "?date=" + date);
    } else {
        //await pool.query("INSERT INTO appointment SET ? ", newAppointment);
        req.flash("message", "Melo Pai");
        res.redirect(req.originalUrl);
    }
};

// CODIGO NUEVO
export const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    await pool.query("DELETE FROM appointment WHERE ID = ?", [id]);
    req.flash("success", "La cita se ha cancelado correctamente");
    if (req.user.id_rol == 1) {
        res.redirect("/appointment");
    } else {
        res.redirect("/profile");
    }
};

export const renderEditAppointment = async (req, res) => {
    const { id } = req.params;
    const selectedItem = req.query.selectedItem;
    const [rows] = await pool.query("SELECT * FROM appointment WHERE id = ?", [id]);

    if (selectedItem == null) {
        res.render("appointment/edit", {
            appointment: rows[0],
            getFechaActual
        });
    } else {
        validationPriceNails(selectedItem, res);
    }
};

export const validationPriceNails = async (selectedItem, res) => {
    const [result] = await pool.query("SELECT * FROM nails WHERE name = ?", [selectedItem]);
    var resultado;
    if (result.length > 0) {
        resultado = result[0].price;
    } else {
        resultado = null;
    }
    res.json({ resultado })
}

export const editAppointment = async (req, res) => {
    const { id } = req.params;
    const { date, start_time, nails } = req.body;

    if (start_time < getHoraActual() && date == getFechaActual()) {
        req.flash("message", "Debes agendar la cita minimo 30 minutos despues de la hora actual");
        return res.redirect("/appointment/edit/" + id);
    }
    const newAppointment = {
        date,
        start_time,
    };

    const [result] = await pool.query("SELECT * FROM nails WHERE name = ?", [nails]);
    newAppointment.id_nails = result[0].id;

    const end_time = sumTime(start_time, result[0].duration);
    newAppointment.end_time = end_time;

    const [resultApp] = await pool.query("SELECT * FROM appointment WHERE start_time < ? AND end_time > ? AND date = ?", [end_time, start_time, date]);
    console.log(resultApp);

    if (resultApp.length > 0) {
        req.flash("message", "El horario escogido no esta disponible");
        res.redirect(req.originalUrl);
    } else {
        await pool.query("UPDATE appointment set ? WHERE id = ?", [newAppointment, id]);
        req.flash("success", "Link Updated Successfully");
        res.redirect("/profile");
    }
};