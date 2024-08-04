require('dotenv').config();
const mysql = require('mysql2');
const url = require('url');

const params = url.parse(process.env.JAWSDB_URL);
const [user, password] = params.auth.split(':');

const connection = mysql.createConnection({
  host: params.hostname,
  user: user,
  password: password,
  database: params.pathname.split('/')[1]
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

module.exports = connection;