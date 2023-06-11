import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

const dbPool = mysql.createPool({
    host: "34.101.230.214",
    user: "root",
    password: 'password',
    database: 'farmgenius-db'
});

export default dbPool.promise()