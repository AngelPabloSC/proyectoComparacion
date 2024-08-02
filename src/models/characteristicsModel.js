const db = require('../config/dbconfig.js');

// Función para crear una característica
const createCharacteristic = (name, description,characteristics_characteristic_id, callback) => {
  const query = 'INSERT INTO characteristics (name, description) VALUES (?, ?)';
  db.query(query, [name, description,characteristics_characteristic_id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.insertId);
  });
};

// Función para obtener todas las características
const getAllCharacteristics = (callback) => {
  const query = 'SELECT * FROM characteristics';
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Función para obtener una característica por ID
const getCharacteristicById = (id, callback) => {
  const query = 'SELECT * FROM characteristics WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

// Función para actualizar una característica
const updateCharacteristic = (id, name, description, callback) => {
  const query = 'UPDATE characteristics SET name = ?, description = ? WHERE id = ?';
  db.query(query, [name, description, id,characteristics_characteristic_id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.affectedRows);
  });
};

// Función para eliminar una característica
const deleteCharacteristic = (id, callback) => {
  const query = 'DELETE FROM characteristics WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.affectedRows);
  });
};

module.exports = {
  createCharacteristic,
  getAllCharacteristics,
  getCharacteristicById,
  updateCharacteristic,
  deleteCharacteristic
};