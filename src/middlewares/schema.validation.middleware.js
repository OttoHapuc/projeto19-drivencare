export function validationSchema(schema) {
    return (req, res, next) => {
        const { error } = shema.validate(req.body, { abortEarly: false });
        if (error) return res.send(error.details.map((detail) => detail.message));
        next();
    }
}