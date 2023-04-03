import joi from 'joi';

const singinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

const singupSchema = joi.alternatives().conditional(joi.object({user_is: true}).unknown(), {
    then: joi.object({
        name: joi.string().min(2).required(),
        email: joi.string().email().required(),
        user_is: joi.boolean(),
        specialty: joi.string().min(3).required(),
        password: joi.string().required()
    }),
    otherwise: joi.object({
        name: joi.string().min(2).required(),
        email: joi.string().email().required(),
        user_is: joi.boolean(),
        specialty: joi.string(),
        password: joi.string().required()
    })
})

export default {
    singinSchema,
    singupSchema,
}