import { Router } from "express";
import { isNotLoggedIn} from "../lib/auth.js";

const router = Router();

import {
  renderSignUp,
  signUp,
  renderSignIn,
  signIn,
  logout,
} from "../controllers/auth.controller.js";

import { validator } from "../middlewares/validator.middleware.js";
import { signupSchema } from "../validators/signup.validator.js";


// SIGNUP
router.get("/signup",isNotLoggedIn, renderSignUp);
router.post("/signup", signupSchema, validator, signUp);

// SINGIN
router.get("/signin",isNotLoggedIn,renderSignIn);
router.post("/signin", signIn);

router.get("/logout", logout);

export default router;