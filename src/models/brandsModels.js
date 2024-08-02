const db = require('../config/dbconfig.js');

// Función para crear una marca
const createBrand = (name, callback) => {
  const query = 'INSERT INTO brands (name) VALUES (?)';
  db.query(query, [name], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.insertId);
  });
};

// Función para obtener todas las marcas
const getAllBrands = (callback) => {
  const query = 'SELECT * FROM brands';
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Función para obtener una marca por ID
const getBrandById = (id, callback) => {
  const query = 'SELECT * FROM brands WHERE brand_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

// Función para actualizar una marca
const updateBrand = (id, name, callback) => {
  const query = 'UPDATE brands SET name = ? WHERE brand_id = ?';
  db.query(query, [name, id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.affectedRows);
  });
};

// Función para eliminar una marca
const deleteBrand = (id, callback) => {
  const query = 'DELETE FROM brands WHERE brand_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.affectedRows);
  });
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand
};