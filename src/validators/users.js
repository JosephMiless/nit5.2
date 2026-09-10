const joi = require("joi");

const registerUserSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required().min(6).max(8)
}).strict();

const loginUserSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required()
}).strict();

module.exports = {registerUserSchema, loginUserSchema};