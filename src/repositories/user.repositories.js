import db from '../config/db.js';

async function findByEmail(email) {
    return await db.query(`
    SELECT * FROM users WHERE email = $1
    `,
    [email]
    )
}
async function create({ name, email, password }) {
    return await db.query(`
        INSERT INTO users (name,email,password)
        VALUES ($1,$2,$3)
        `,
            [name, email, password]
    );
}
async function createSession({ token, userId }) {
    return await db.query(`
        INSERT INTO sessions (token,"userId")
        VALUES ($1,$2)
        `,
            [token, userId]
    );
}
async function findSessionByToken(token) {
    return await connectionDb.query(`
          SELECT * FROM sessions WHERE token = $1
        `,
            [token]
    );
}

async function findById(id) {
    return await connectionDb.query(`    
        SELECT * FROM users WHERE id=$1
        `,
            [id]
    );
}
export default {
    findByEmail,
    create,
    createSession,
    findSessionByToken,
    findById,
}