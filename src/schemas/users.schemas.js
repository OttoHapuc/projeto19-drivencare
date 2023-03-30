import joi from 'joi';

const singinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

const singupSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required()
})

export default {
    singinSchema,
    singupSchema,
}