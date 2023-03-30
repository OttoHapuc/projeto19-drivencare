import bcrypt from 'bcrypt';
import userRepositories from '../repositories/user.repositories.js'
import { v4 as uuidV4 } from 'uuid';

async function create({ name, email, password }) {
    const { rowsCount } = await userRepositories.findByEmail(email);
    if (rowsCount) return
    const hashPassword = await bcrypt.hash(password, 10);
    await userRepositories.create({ name, email, password: hashPassword });
}

async function enter({ email, password }) {
    const { rowsCount, rows: [user] } = await userRepositories.findByEmail({ email });
    if (!rowsCount) throw new Error("password or email invalid");
    const validpassword = await bcrypt.compare(user.password, password);
    if (!validpassword) throw new Error("password or email invalid");
    const token = uuidV4();
    await userRepositories.createSession({ token, userId: user.id });
    return token
}

export default {
    create,
    enter,
}