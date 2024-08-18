const db = require('../config/dbconfig.js');

// Función para crear un usuario
const createUser = (name, lastname, birthday_date, email, fk_category_user, callback) => {
  const query = 'INSERT INTO user (name, lastname, birthday_date, email, fk_category_user) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, lastname, birthday_date, email, fk_category_user], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { id_user: results.insertId });
  });
};

// Función para obtener todos los usuarios
const getAllUsers = (callback) => {
  const query = 'SELECT * FROM user';
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Función para obtener un usuario por ID
const getUserById = (id_user, callback) => {
  const query = 'SELECT * FROM user WHERE id_user = ?';
  db.query(query, [id_user], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(new Error('User not found'), null);
    callback(null, results[0]);
  });
};

// Función para actualizar un usuario
const updateUser = (id_user, name, lastname, birthday_date, email, fk_category_user, callback) => {
  const query = 'UPDATE user SET name = ?, lastname = ?, birthday_date = ?, email = ?, fk_category_user = ? WHERE id_user = ?';
  db.query(query, [name, lastname, birthday_date, email, fk_category_user, id_user], (err, results) => {
    if (err) return callback(err, null);
    if (results.affectedRows === 0) return callback(new Error('User not found'), null);
    callback(null, { message: 'User updated successfully' });
  });
};

// Función para eliminar un usuario
const deleteUser = (id_user, callback) => {
  const query = 'DELETE FROM user WHERE id_user = ?';
  db.query(query, [id_user], (err, results) => {
    if (err) return callback(err, null);
    if (results.affectedRows === 0) return callback(new Error('User not found'), null);
    callback(null, { message: 'User deleted successfully' });
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};