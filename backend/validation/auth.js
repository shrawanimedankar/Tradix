const Joi = require("joi");

const signupSchema = Joi.object({
  fullName: Joi.string().trim().min(3).required().messages({
    "string.empty": "Full Name is required",
    "any.required": "Full Name is required",
  }),

  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Enter a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .min(6)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.pattern.base":"Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character",
      "any.required": "Password is required",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Enter a valid email",
    "any.required": "Email.required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

module.exports = {
  signupSchema,
  loginSchema,
};
