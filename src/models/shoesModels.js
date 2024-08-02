const db = require('../config/dbconfig.js');

// Función para crear un zapato
const createShoe = (name, brand_id, category_id, price, size, color, image_url, callback) => {
  const query = 'INSERT INTO shoes (name, brand_id, category_id, price, size, color, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, brand_id, category_id, price, size, color, image_url], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.insertId);
  });
};

// Función para obtener todos los zapatos
const getAllShoes = (callback) => {
  const query = 'SELECT * FROM shoes';
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Función para obtener un zapato por ID
const getShoeById = (id, callback) => {
  const query = 'SELECT * FROM shoes WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

// Función para actualizar un zapato
const updateShoe = (id, name, brand_id, category_id, price, size, color, image_url, callback) => {
  const query = 'UPDATE shoes SET name = ?, brand_id = ?, category_id = ?, price = ?, size = ?, color = ?, image_url = ? WHERE id = ?';
  db.query(query, [name, brand_id, category_id, price, size, color, image_url, id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.affectedRows);
  });
};

// Función para eliminar un zapato
const deleteShoe = (id, callback) => {
  const query = 'DELETE FROM shoes WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.affectedRows);
  });
};

module.exports = {
  createShoe,
  getAllShoes,
  getShoeById,
  updateShoe,
  deleteShoe
};