import bcrypt from "bcryptjs";
import moment from "moment/moment.js";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const matchPassword = async (password, savedPassword) =>
  await bcrypt.compare(password, savedPassword);

export const sumTime = (start_time, end_time) => {
  const momentTime1 = moment(start_time, 'hh:mm');
  const sum = momentTime1.add(end_time);
  const resultT = sum.format('HH:mm');
  return resultT;
}

export const getFechaActual = () => {
  const now = new Date();
  const fechaActual = new Date(now.toLocaleString("en-US", { timeZone: "America/Bogota" }));
  const fechaActualFormato = fechaActual.toISOString().split('T')[0];
  return fechaActualFormato;
}

export const getHoraActual = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  const horaNecesariaCita = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  return horaNecesariaCita;
}