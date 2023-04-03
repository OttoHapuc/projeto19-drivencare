import usersServices from '../services/users.services.js'

async function enter(req, res, next) {
    const { email, password } = req.body;
    try {
        const token = await usersServices.enter({ email, password });
        return res.send({ token })
    } catch (error) {
        next(error);
    }
}
async function create(req, res, next) {
    const { name, email, password, user_is, specialty } = req.body;
    try {
        await usersServices.create({ name, email, password, user_is, specialty });
        return res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}

export default {
    enter,
    create,
}