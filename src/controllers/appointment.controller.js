import { pool } from "../database.js";
import moment from "moment/moment.js";

export const renderAppointments = (req, res, next) => {
    res.render("appointment/list");
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
        const [result] = await pool.query("SELECT * FROM nails WHERE name = ?", [selectedItem]);
        const resultado = result[0].price;
        res.json({ resultado });
    }
};

export const addAppointments = async (req, res, next) => {

    const { date, start_time, nails } = req.body;

    console.log(start_time);
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

    newAppointment.end_time = sumTime(start_time, result[0].duration);

    console.log(newAppointment);
    //await pool.query("INSERT INTO appointment SET ? ", newAppointment);
    res.redirect(req.originalUrl + "?getFechaActual=" + getFechaActual());
};

export const sumTime = (start_time, end_time) => {
    const momentTime1 = moment(start_time, 'hh:mm');
    const sum = momentTime1.add(end_time);
    const resultT = sum.format('HH:mm');
    return resultT;
}

export const getFechaActual = () => {
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() - 1);
    const fechaMenosUnDia = fechaActual.toISOString().split('T')[0];
    return fechaMenosUnDia;
}

export const getHoraActual = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    const horaActualMenosUnMinuto = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    console.log(horaActualMenosUnMinuto);
    return horaActualMenosUnMinuto;
}