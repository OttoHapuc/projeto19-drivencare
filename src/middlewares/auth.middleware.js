import userRepositories from "../repositories/user.repositories.js";
import errors from "../errors/http.errors.js";

async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) throw errors.unauthorizedError();
    try {
        const {
            rows: [session],
        } = await userRepositories.findSessionByToken(token);
        if (!session) throw errors.unauthorizedError();
        const {
            rows: [user],
        } = await userRepositories.findById(session.userId);
        if (!user) throw errors.notFoundError();
        res.locals.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

export default { authValidation };