import { Router } from "express";
import { isLoggedIn} from "../lib/auth.js";
import { renderAppointments,renderAppointmentsAdd, addAppointments} from "../controllers/appointment.controller.js";

const router = Router();

// Authorization
router.use(isLoggedIn);

// Routes appoiment/
router.get("/",renderAppointments);
router.get("/add",renderAppointmentsAdd);

router.post("/add",addAppointments);

export default router;