export const renderAppointments = (req, res, next) => {
    res.render("citas/list");
};

export const renderAppointmentsAdd = (req, res, next) => {
    res.render("citas/add");
};
