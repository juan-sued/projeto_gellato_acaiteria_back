import Joi from "joi";
export var signUpSchema = Joi.object({
    name: Joi.string().trim().required().min(1),
    email: Joi.string().email().trim().required().min(1),
    password: Joi.string().trim().required().min(1),
    confirmPassword: Joi.ref('password')
});
export var signInSchema = Joi.object({
    email: Joi.string().email().trim().required().min(1),
    password: Joi.string().trim().required().min(1)
});
