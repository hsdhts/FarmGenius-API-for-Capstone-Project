import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

const dbPool = mysql.createPool({
    host: process.env.HOST_DB,
    user: "root",
    password: process.env.PASSWORD_DB,
    database: process.env.DB_NAME,
});

export default dbPool.promise()