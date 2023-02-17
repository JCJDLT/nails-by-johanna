import { Router } from "express";
import { isLoggedIn} from "../lib/auth.js";
import { renderAppointments,renderAppointmentsAdd, addAppointments} from "../controllers/appointment.controller.js";
import { signupSchema } from "../validators/appointmentadd.validator.js";
import { validatorApointment } from "../middlewares/validator.middleware.js";
const router = Router();

// Authorization
router.use(isLoggedIn);

// Routes appoiment/
router.get("/",renderAppointments);
router.get("/add",renderAppointmentsAdd);

router.post("/add",signupSchema,validatorApointment,addAppointments);

export default router;