import bcrypt from 'bcrypt';
import userRepositories from '../repositories/user.repositories.js'

async function create({name, email,password}){
    const {rowsCount}= await userRepositories.findByEmail(email);
    if (rowsCount) return 

    const hashPassword = await bcrypt.hash(password,10);
    await userRepositories.create({name, email, password:hashPassword});
}

export default{
    create,
}