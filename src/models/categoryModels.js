const db = require('../config/dbconfig.js');

// Función para crear una categoría
const createCategory = (category_id, name, callback) => {
  const query = 'INSERT INTO categories (category_id, name) VALUES (?, ?)';
  db.query(query, [category_id, name], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.insertId);
  });
};

// Función para obtener todas las categorías
const getAllCategories = (callback) => {
  const query = 'SELECT * FROM categories';
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Función para obtener una categoría por ID
const getCategoryById = (id, callback) => {
  const query = 'SELECT * FROM categories WHERE category_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

// Función para actualizar una categoría
const updateCategory = (id, name, callback) => {
  const query = 'UPDATE categories SET category_id = ?, name = ? WHERE category_id = ?';
  db.query(query, [, name, id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.affectedRows);
  });
};

// Función para eliminar una categoría
const deleteCategory = (id, callback) => {
  const query = 'DELETE FROM categories WHERE category_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.affectedRows);
  });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};