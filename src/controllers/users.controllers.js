import usersServices from '../services/users.services.js'

async function enter(req, res) {
    try {

    } catch (error) {
        return res.status(500).send(err.message);
    }
}
async function create(req, res) {
    const {name, email, password} = req.body;
    try {
        await usersServices.create({name,email,password})
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(err.message);
    }
}

export default {
    enter,
    create,
}