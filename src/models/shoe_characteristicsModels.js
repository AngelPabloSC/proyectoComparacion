const db = require('../config/dbconfig.js');

// Función para crear una relación zapato-característica
const createShoeCharacteristic = (shoe_id, characteristic_id, value, callback) => {
  if (value < 1 || value > 10) return callback(new Error('Value must be between 1 and 10'), null);
  const query = 'INSERT INTO shoe_characteristics (shoe_id, characteristic_id, value) VALUES (?, ?, ?)';
  db.query(query, [shoe_id, characteristic_id, value], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.insertId);
  });
};

// Función para obtener todas las relaciones zapato-característica
const getAllShoeCharacteristics = (callback) => {
  const query = 'SELECT * FROM shoe_characteristics';
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Función para obtener una relación zapato-característica por ID de zapato y característica
const getShoeCharacteristicById = (shoe_id, characteristic_id, callback) => {
  const query = 'SELECT * FROM shoe_characteristics WHERE shoe_id = ? AND characteristic_id = ?';
  db.query(query, [shoe_id, characteristic_id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

// Función para actualizar una relación zapato-característica
const updateShoeCharacteristic = (shoe_id, characteristic_id, value, callback) => {
  if (value < 1 || value > 10) return callback(new Error('Value must be between 1 and 10'), null);
  const query = 'UPDATE shoe_characteristics SET value = ? WHERE shoe_id = ? AND characteristic_id = ?';
  db.query(query, [value, shoe_id, characteristic_id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.affectedRows);
  });
};

// Función para eliminar una relación zapato-característica
const deleteShoeCharacteristic = (shoe_id, characteristic_id, callback) => {
  const query = 'DELETE FROM shoe_characteristics WHERE shoe_id = ? AND characteristic_id = ?';
  db.query(query, [shoe_id, characteristic_id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.affectedRows);
  });
};

module.exports = {
  createShoeCharacteristic,
  getAllShoeCharacteristics,
  getShoeCharacteristicById,
  updateShoeCharacteristic,
  deleteShoeCharacteristic
};