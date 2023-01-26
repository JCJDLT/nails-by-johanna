import { Router } from "express";
import index from "./index.routes.js";
import auth from "./auth.routes.js";
import user from "./user.routes.js";

const router = Router();

router.use(index);
router.use(auth);
router.use(user);

export default router;