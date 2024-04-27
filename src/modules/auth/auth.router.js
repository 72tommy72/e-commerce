import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware.js";
import { activateSchema, forgetPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "./auth.validation.js";
import { activatedAccount, login, register, resetPassword, sendForgetPassword } from "./auth.controller.js";

const router = Router();
//register
router.post("/register", isValid(registerSchema), register)

//activation account
router.get('/confirmEmail/:activationCode', isValid(activateSchema), activatedAccount)

//login
router.post("/login", isValid(loginSchema), login)

//forgetPassword
router.patch("/forgetPassword", isValid(forgetPasswordSchema), sendForgetPassword)

//reset password
router.patch("/resetPassword", isValid(resetPasswordSchema), resetPassword)
export default router;