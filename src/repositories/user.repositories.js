import db from '../config/db.js';

async function findByEmail(email) {
    return await db.query(`
    SELECT * FROM users WHERE email = $1
    `
    [email]
    )
}
async function create({name, email, password}){
    await db.query(`
    INSERT INTO users (name,email,password)
    VALUES ($1,$2,$3)
    `
    [name, email, password]
    );
}

export default {
    findByEmail,
    create,
}