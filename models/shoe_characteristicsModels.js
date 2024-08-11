const db = require('../config/dbconfig.js');

// Crear una relación zapato-característica
const createShoeCharacteristic = (fk_shoes, fk_characteristics, value) => {
  return new Promise((resolve, reject) => {
    if (value < 1 || value > 10) return reject(new Error('Value must be between 1 and 10'));
    const query = 'INSERT INTO shoescharacteris (fk_shoes, fk_characteristics, value) VALUES (?, ?, ?)';
    db.query(query, [fk_shoes, fk_characteristics, value], (err, results) => {
      if (err) return reject(new Error(err.message));
      resolve(results.insertId);
    });
  });
};

// Obtener todas las relaciones zapato-característica
const getAllShoeCharacteristics = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM shoescharacteris';
    db.query(query, (err, results) => {
      if (err) return reject(new Error(err.message));
      resolve(results);
    });
  });
};

// Obtener una relación zapato-característica por ID de zapato y característica
const getShoeCharacteristicById = (fk_shoes, fk_characteristics) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM shoescharacteris WHERE fk_shoes = ? AND fk_characteristics = ?';
    db.query(query, [fk_shoes, fk_characteristics], (err, results) => {
      if (err) return reject(new Error(err.message));
      resolve(results.length > 0 ? results[0] : null);
    });
  });
};

// Actualizar una relación zapato-característica
const updateShoeCharacteristic = (fk_shoes, fk_characteristics, value) => {
  return new Promise((resolve, reject) => {
    if (value < 1 || value > 10) return reject(new Error('Value must be between 1 and 10'));
    const query = 'UPDATE shoescharacteris SET value = ? WHERE fk_shoes = ? AND fk_characteristics = ?';
    db.query(query, [value, fk_shoes, fk_characteristics], (err, results) => {
      if (err) return reject(new Error(err.message));
      resolve(results.affectedRows);
    });
  });
};

// Eliminar una relación zapato-característica
const deleteShoeCharacteristic = (fk_shoes, fk_characteristics) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM shoescharacteris WHERE fk_shoes = ? AND fk_characteristics = ?';
    db.query(query, [fk_shoes, fk_characteristics], (err, results) => {
      if (err) return reject(new Error(err.message));
      resolve(results.affectedRows);
    });
  });
};

module.exports = {
  createShoeCharacteristic,
  getAllShoeCharacteristics,
  getShoeCharacteristicById,
  updateShoeCharacteristic,
  deleteShoeCharacteristic
};