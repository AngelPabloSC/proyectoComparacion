const db = require('../config/dbconfig.js');

// Función para crear una tienda
const createStore = (name, callback) => {
  const query = 'INSERT INTO store (name) VALUES (?)';
  db.query(query, [name], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { id: results.insertId });
  });
};

// Función para obtener todas las tiendas
const getAllStores = (callback) => {
  const query = 'SELECT * FROM store';
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Función para obtener una tienda por ID
const getStoreById = (id, callback) => {
  const query = 'SELECT * FROM store WHERE store_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

// Función para actualizar una tienda
const updateStore = (id, name, callback) => {
  const query = 'UPDATE store SET name = ? WHERE store_id = ?';
  db.query(query, [name, id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { affectedRows: results.affectedRows });
  });
};

// Función para eliminar una tienda
const deleteStore = (id, callback) => {
  const query = 'DELETE FROM store WHERE store_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { affectedRows: results.affectedRows });
  });
};

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore
};