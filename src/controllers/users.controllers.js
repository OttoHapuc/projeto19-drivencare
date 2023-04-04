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
    const { name, email, password, user_is, specialty, address } = req.body;
    try {
        await usersServices.create({ name, email, password, user_is, specialty, address });
        return res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}
async function searchMedics(req, res, next) {
    const { name, specialty, address } = req.body;
    try {
        const result = await usersServices.searchMedics({ name, specialty, address });
        return res.send(result);
    } catch (error) {
        next(error);
    }
}
async function schedule(req, res, next) {
    const { date, time } = req.body;
    try {
        await usersServices.schedule({date, time});
        return res.sendStatus(201)
    } catch (error) {
        next(error);
    }
}

export default {
    enter,
    create,
    searchMedics,
    schedule,
}