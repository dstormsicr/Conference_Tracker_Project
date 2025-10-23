const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    options: {
        trustServerCertificate: true, // Trust self-signed certificate if needed
        enableArithAbort: true,
    }
};

let pool = null;

async function connectDB() {
    try {
        if (pool) {
            return pool;
        }
        pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.log('Database connection failed:', error);
        throw error;
    }
}

module.exports = { connectDB, sql };