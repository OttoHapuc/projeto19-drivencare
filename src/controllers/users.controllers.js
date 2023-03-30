import usersServices from '../services/users.services.js'

async function enter(req, res) {
    const { email, password } = req.body;
    try {
        const token = await usersServices.enter({ email, password });
        return res.send({ token })
    } catch (error) {
        return res.status(500).send(err.message);
    }
}
async function create(req, res) {
    const { name, email, password } = req.body;
    try {
        await usersServices.create({ name, email, password })
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(err.message);
    }
}

export default {
    enter,
    create,
}