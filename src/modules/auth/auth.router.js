/**
 * Authentication Router Module
 * Handles all authentication related routes including registration, login,
 * account activation, and password management
 */

import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware.js";
import { 
    activateSchema, 
    forgetPasswordSchema, 
    loginSchema, 
    registerSchema, 
    resetPasswordSchema 
} from "./auth.validation.js";
import { 
    activatedAccount, 
    login, 
    register, 
    resetPassword, 
    sendForgetPassword 
} from "./auth.controller.js";

const router = Router();

/**
 * User Registration Route
 * POST /auth/register
 * Validates registration data and creates new user account
 */
router.post("/register", isValid(registerSchema), register);

/**
 * Account Activation Route
 * GET /auth/confirmEmail/:activationCode
 * Validates and activates user account using email confirmation code
 */
router.get('/confirmEmail/:activationCode', isValid(activateSchema), activatedAccount);

/**
 * User Login Route
 * POST /auth/login
 * Authenticates user credentials and generates access token
 */
router.post("/login", isValid(loginSchema), login);

/**
 * Forgot Password Route
 * PATCH /auth/forgetPassword
 * Initiates password reset process by sending reset link to user's email
 */
router.patch("/forgetPassword", isValid(forgetPasswordSchema), sendForgetPassword);

/**
 * Reset Password Route
 * PATCH /auth/resetPassword
 * Allows user to set new password after verification
 */
router.patch("/resetPassword", isValid(resetPasswordSchema), resetPassword);

export default router;