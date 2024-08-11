const db = require('../config/dbconfig.js');

// Función para crear un registro de historial de usuario
const createHistoryUser = (fk_shoes, fk_user, date, callback) => {
  const query = 'INSERT INTO history_user (fk_shoes, fk_user, date) VALUES (?, ?, ?)';
  db.query(query, [fk_shoes, fk_user, date], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { id_history: results.insertId });
  });
};

// Función para obtener todos los registros de historial de usuario
const getAllHistoryUsers = (callback) => {
  const query = 'SELECT * FROM history_user';
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Función para obtener un registro de historial de usuario por ID
const getHistoryUserById = (id_history, callback) => {
  const query = 'SELECT * FROM history_user WHERE id_history = ?';
  db.query(query, [id_history], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

// Función para obtener un registro de historial de usuario por claves foráneas
const getHistoryUserByKeys = (fk_shoes, fk_user, callback) => {
  const query = 'SELECT * FROM history_user WHERE fk_shoes = ? AND fk_user = ?';
  db.query(query, [fk_shoes, fk_user], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

// Función para actualizar un registro de historial de usuario
const updateHistoryUser = (id_history, fk_shoes, fk_user, date, callback) => {
  const query = 'UPDATE history_user SET fk_shoes = ?, fk_user = ?, date = ? WHERE id_history = ?';
  db.query(query, [fk_shoes, fk_user, date, id_history], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { affectedRows: results.affectedRows });
  });
};

// Función para eliminar un registro de historial de usuario
const deleteHistoryUser = (id_history, callback) => {
  const query = 'DELETE FROM history_user WHERE id_history = ?';
  db.query(query, [id_history], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { affectedRows: results.affectedRows });
  });
};

module.exports = {
  createHistoryUser,
  getAllHistoryUsers,
  getHistoryUserById,
  getHistoryUserByKeys,
  updateHistoryUser,
  deleteHistoryUser
};