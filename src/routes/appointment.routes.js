import { Router } from "express";
import { isLoggedIn} from "../lib/auth.js";
import { renderAppointments,renderAppointmentsAdd} from "../controllers/appointment.controller.js";

const router = Router();

// Authorization
router.use(isLoggedIn);

// Routes
router.get("/",renderAppointments);
router.get("/add",renderAppointmentsAdd);

export default router;