const db = require('../config/dbconfig.js');

// Función para agregar una relación entre zapatos y tienda
const createStoreShoes = (fk_shoes, fk_store, price, callback) => {
  const query = 'INSERT INTO storeShoes (fk_shoes, fk_store, price) VALUES (?, ?, ?)';
  db.query(query, [fk_shoes, fk_store, price], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { id: results.insertId });
  });
};

// Función para obtener todas las relaciones entre zapatos y tienda
const getAllStoreShoes = (callback) => {
  const query = 'SELECT * FROM storeShoes';
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Función para obtener una relación entre zapatos y tienda por IDs
const getStoreShoesByIds = (fk_shoes, fk_store, callback) => {
  const query = 'SELECT * FROM storeShoes WHERE fk_shoes = ? AND fk_store = ?';
  db.query(query, [fk_shoes, fk_store], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

// Función para actualizar el precio en una relación entre zapatos y tienda
const updateStoreShoes = (fk_shoes, fk_store, price, callback) => {
  const query = 'UPDATE storeShoes SET price = ? WHERE fk_shoes = ? AND fk_store = ?';
  db.query(query, [price, fk_shoes, fk_store], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { affectedRows: results.affectedRows });
  });
};

// Función para eliminar una relación entre zapatos y tienda
const deleteStoreShoes = (fk_shoes, fk_store, callback) => {
  const query = 'DELETE FROM storeShoes WHERE fk_shoes = ? AND fk_store = ?';
  db.query(query, [fk_shoes, fk_store], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { affectedRows: results.affectedRows });
  });
};

module.exports = {
  createStoreShoes,
  getAllStoreShoes,
  getStoreShoesByIds,
  updateStoreShoes,
  deleteStoreShoes
};