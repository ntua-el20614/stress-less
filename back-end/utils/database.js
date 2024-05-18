const mysql = require('mysql2/promise');

/* create connection and export it */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'password',
    database: 'stress_less',
    connectionLimit: 100 // Adjust the limit as per your requirements
  });
  
module.exports = { pool };