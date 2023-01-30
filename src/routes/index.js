import { Router } from "express";
import index from "./index.routes.js";
import auth from "./auth.routes.js";
import user from "./user.routes.js";
import appointment from "./appointment.routes.js"

const router = Router();

router.use(index);
router.use(auth);
router.use(user);
router.use("/appointment",appointment)

export default router;