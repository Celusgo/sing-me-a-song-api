import pg from 'pg'

const { Pool } = pg;

const connection = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE
})

export default connection;