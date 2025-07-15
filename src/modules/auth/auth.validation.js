import Joi from "joi";

// Common email validation configuration
const emailConfig = {
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
};

// Common password pattern for validation
const passwordPattern = new RegExp("^[a-zA-Z0-9]{3,30}$");

// Schema for user registration
export const registerSchema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 3 characters',
            'string.max': 'Username cannot exceed 30 characters'
        }),
    password: Joi.string()
        .pattern(passwordPattern)
        .required(),
    email: Joi.string()
        .email(emailConfig)
        .required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            'any.only': 'Passwords must match'
        })
}).required();

// Schema for account activation
export const activateSchema = Joi.object({
    activationCode: Joi.string().required()
}).required();

// Schema for user login
export const loginSchema = Joi.object({
    password: Joi.string()
        .pattern(passwordPattern)
        .required(),
    email: Joi.string()
        .email(emailConfig)
        .required()
}).required();

// Schema for forget password request
export const forgetPasswordSchema = Joi.object({
    email: Joi.string()
        .email(emailConfig)
        .required()
}).required();

// Schema for password reset
export const resetPasswordSchema = Joi.object({
    email: Joi.string()
        .email(emailConfig)
        .required(),
    forgetCode: Joi.string()
        .required(),
    password: Joi.string()
        .pattern(passwordPattern)
        .required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords must match'
        })
}).required();
