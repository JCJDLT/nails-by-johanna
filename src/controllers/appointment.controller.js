export const renderAppointments = (req, res, next) => {
    res.render("appointment/list");
};

export const renderAppointmentsAdd = (req, res, next) => {
    res.render("appointment/add");
};
