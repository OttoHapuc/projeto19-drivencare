import bcrypt from 'bcrypt';
import userRepositories from '../repositories/user.repositories.js'
import { v4 as uuidV4 } from 'uuid';
import errors from '../errors/http.errors.js'

async function create({ name, email, password, user_is, specialty }) {
    const { rowsCount } = await userRepositories.findByEmail(email);
    if (rowsCount) throw errors.duplicatedEmailError();
    const hashPassword = await bcrypt.hash(password, 10);
    await userRepositories.create({ 
        name, 
        email, 
        password: hashPassword, 
        user_is: user_is? true:false,
        specialty: user_is? specialty:""
    });
}

async function enter({ email, password }) {
    const { rowsCount, rows: [user] } = await userRepositories.findByEmail({ email });
    if (!rowsCount) throw errors.invalidCredentialsError(); 
    const validpassword = await bcrypt.compare(user.password, password);
    if (!validpassword) throw errors.invalidCredentialsError();
    const token = uuidV4();
    await userRepositories.createSession({ token, userId: user.id });
    return token
}

export default {
    create,
    enter,
}