require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "@chinmaya123",
    database: "Redstores",
    port: "3306"
});

module.exports = pool.promise();