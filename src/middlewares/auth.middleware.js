import userRepositories from "../repositories/user.repositories";

async function authValidation(req, res, next) {
    const {autorization} = req.headers;
    const token = autorization?.replace("Bearer ", '');
    if(!token) return res.status(401).send("No token");
    try {
        const { rows:[session] } = await userRepositories.findSessionByToken(token);
        if(!session) return res.status(401).send("Session not found");
        const {rows: [user]} = await userRepositories.findById(session.userId);
        if(!user) return res.status(401).send("user not found");
        res.locals.user = user;
        next();
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export default {
    authValidation,
}