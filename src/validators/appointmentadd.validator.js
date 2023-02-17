import { body } from "express-validator";

export const signupSchema = [
    body("date").notEmpty().withMessage("Selecciona una fecha"),
    body("start_time").notEmpty().withMessage("Selecciona la hora"),
    body("price").notEmpty().withMessage("Selecciona un tipo de uñas"),
]