import bcrypt from 'bcrypt';
import userRepositories from '../repositories/user.repositories.js'
import { v4 as uuidV4 } from 'uuid';
import errors from '../errors/http.errors.js'

async function create({ name, email, password, user_is, specialty, address }) {
    const { rowsCount } = await userRepositories.findByEmail(email);
    if (rowsCount) throw errors.duplicatedEmailError();
    const hashPassword = await bcrypt.hash(password, 10);
    await userRepositories.create({ 
        name, 
        email, 
        password: hashPassword, 
        user_is: user_is? true:false,
        specialty: user_is? specialty:"",
        address
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
async function searchMedics({name, specialty, address}){
    const {rowsCount,rows:medics} = await userRepositories.search({name,specialty,address});
    if (!rowsCount) throw errors.invalidCredentialsError();
    return medics
}
async function schedule({date, time}){
    //validar se é uma date 
    const validDate = await userRepositories.date(date);
    if(!validDate) throw errors.conflictError("Date not avaliable");
    //validar se é um time habilitado
    const validtime =await userRepositories.time(time);
    if(!validtime) throw errors.conflictError("time not avaliable");
    //atualizar availability conectado ao médico
    await userRepositories.schedule({date, time});
}

export default {
    create,
    enter,
    searchMedics,
    schedule,
}