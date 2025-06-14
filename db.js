// Database connection using mysql2 with Promise support
const mysql = require('mysql2/promise');

// Create a connection pool for better performance and handling multiple connections
const pool = mysql.createPool({
  host: 'localhost',       // update if different
  user: 'root',            // update with your MySQL user
  password: '',            // update with your MySQL password
  database: 'myBookshop',  // ensure this database exists
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;