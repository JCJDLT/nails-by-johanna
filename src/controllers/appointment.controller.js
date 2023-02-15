import { pool } from "../database.js";

export const renderAppointments = (req, res, next) => {
    res.render("appointment/list");
};

export const renderAppointmentsAdd = async (req, res, next) => {
    res.render("appointment/add");
};

export const addAppointments = async (req, res, next) => {
    res.render("appointment/add");
};