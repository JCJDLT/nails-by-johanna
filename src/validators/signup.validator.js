import { body } from "express-validator";

export const signupSchema = [
    body("fullname").isLength({ min: 3 }).withMessage("El nombre debe ser minimo de 3 caracteres"),
    body("email").isEmail().withMessage("El email no es valido"),
    body("phone").isLength({min:10 , max:10}).withMessage("El telefono debe ser de 10 digitos"),
    body("password1").notEmpty().withMessage("La contraseña no puede estar vacia"),
]