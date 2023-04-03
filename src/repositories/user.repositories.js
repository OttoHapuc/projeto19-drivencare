import db from '../config/db.js';

async function findByEmail(email) {
    return await db.query(`
    SELECT * FROM users WHERE email = $1
    `,
        [email]
    )
}
async function create({ name, email, password, user_is, specialty, address }) {
    return await db.query(`
        INSERT INTO users (name,email,password,user_is,specialty,address)
        VALUES ($1,$2,$3,$4,$5,$6)
        `,
        [name, email, password, user_is, specialty, address]
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

async function searchMedics({ name, specialty, address }) {
    return await connectionDb.query(`
        SELECT
            users.id,
            users.name,
            users.specialty,
            users.email,
            users.address,
            array_to_json(hours.availability) as "dias-e-horários"
        FROM users
        LEFT JOIN hours
            ON users.id = hours.user_id
        WHERE
            ($1 IS NULL OR users.name ILIKE $1) AND
            ($2 IS NULL OR users.address ILIKE $2) AND
            ($3 IS NULL OR users.specialty ILIKE $3);
    `,
        [name, address, specialty]
    );
}
export default {
    findByEmail,
    create,
    createSession,
    findSessionByToken,
    findById,
}