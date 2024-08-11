const db = require('../config/dbconfig.js');

// Función para crear una categoría
const createCategory = (name, fk_categories, callback) => {
  const query = 'INSERT INTO categories (name, fk_categories) VALUES (?, ?)';
  db.query(query, [name, fk_categories], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { id: results.insertId });
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
const updateCategory = (id, name, fk_categories, callback) => {
  const query = 'UPDATE categories SET name = ?, fk_categories = ? WHERE category_id = ?';
  db.query(query, [name, fk_categories, id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { affectedRows: results.affectedRows });
  });
};

// Función para eliminar una categoría
const deleteCategory = (id, callback) => {
  const query = 'DELETE FROM categories WHERE category_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, { affectedRows: results.affectedRows });
  });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};