import { Router } from "express";
import { isLoggedIn} from "../lib/auth.js";
import { renderUserProfile, renderUserAdmin} from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", isLoggedIn, renderUserProfile);
router.get("/admin",isLoggedIn,renderUserAdmin);

export default router;