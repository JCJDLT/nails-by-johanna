import { pool } from "../database.js";
import moment from "moment/moment.js";

export const renderAppointments = (req, res, next) => {
    res.render("appointment/list");
};

export const renderAppointmentsAdd = async (req, res, next) => {
    const selectedItem = req.query.selectedItem;
    if (selectedItem == null) {
        //res.render('appointment/add');
        const { date, time, nails } = req.query;
        res.render('appointment/add', {
            date,
            time,
            nails,
        });
    } else {
        const [result] = await pool.query("SELECT * FROM nails WHERE name = ?", [selectedItem]);
        const resultado = result[0].price;
        res.json({ resultado });
    }
};

export const addAppointments = async (req, res, next) => {

    const { date, start_time, nails } = req.body;

    const newAppointment = {
        date,
        start_time,
    };

    newAppointment.id_user = req.user.id;
    newAppointment.id_state = 1;

    const [result] = await pool.query("SELECT * FROM nails WHERE name = ?", [nails]);
    newAppointment.id_nails = result[0].id;

    const finalTime = sumTime(start_time, result[0].duration);
    newAppointment.end_time = finalTime;

    console.log(newAppointment);

    res.render('appointment/add');
};

export const sumTime = (start_time, end_time) => {

    const momentTime1 = moment(start_time, 'hh:mm');
    const sum = momentTime1.add(end_time);
    const resultT = sum.format('HH:mm');
    return resultT;

}