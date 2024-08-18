const db = require('../config/dbconfig.js');
const bcrypt = require('bcrypt');
// Función para crear una credencial
const createCredential = (username, password, fk_user, callback) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return callback(err, null);

    const query = 'INSERT INTO credential (username, password, fk_user) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, fk_user], (err, results) => {
      if (err) return callback(err, null);
      callback(null, { id_credential: results.insertId });
    });
  });
};

// Función para verificar credenciales
const verifyCredentials = (username, password, callback) => {
  const query = 'SELECT * FROM credential WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, false); // Usuario no encontrado

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return callback(err, null);
      callback(null, match ? user : false); // Retorna el usuario si las credenciales coinciden
    });
  });
};


// Función para obtener todas las credenciales
const getAllCredentials = (callback) => {
  const query = 'SELECT * FROM credential';
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Función para obtener una credencial por ID
const getCredentialById = (id_credential, callback) => {
  const query = 'SELECT * FROM credential WHERE id_credential = ?';
  db.query(query, [id_credential], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

// Función para actualizar una credencial
const updateCredential = (id_credential, username, password, fk_user, callback) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return callback(err, null);

    const query = 'UPDATE credential SET username = ?, password = ?, fk_user = ? WHERE id_credential = ?';
    db.query(query, [username, hashedPassword, fk_user, id_credential], (err, results) => {
      if (err) return callback(err, null);
      callback(null, { affectedRows: results.affectedRows });
    });
  });
};

// Función para eliminar una credencial
const deleteCredential = (id_credential, callback) => {
  const query = 'DELETE FROM credential WHERE id_credential = ?';
  db.query(query, [id_credential], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { affectedRows: results.affectedRows });
  });
};

module.exports = {
  createCredential,
  verifyCredentials,
  getAllCredentials,
  getCredentialById,
  updateCredential,
  deleteCredential
};