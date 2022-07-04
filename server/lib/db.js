const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'mysql_db', 
    user: 'MYSQL_USER',
    password: 'MYSQL_PASSWORD', 
    database: 'books'
});


connection.connect();
module.exports = connection;
