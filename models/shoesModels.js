const db = require('../config/dbconfig.js');

// Crear un zapato
const createShoe = (name, brand_id, fk_categoryshoes, image_url) => {
  const query = 'INSERT INTO shoes (name, brand_id, fk_categoryshoes, image_url) VALUES (?, ?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.query(query, [name, brand_id, fk_categoryshoes, image_url], (err, results) => {
      if (err) return reject(err);
      resolve({ id: results.insertId });
    });
  });
};

// Obtener todos los zapatos
const getAllShoes = () => {
  const query = 'SELECT * FROM shoes';
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Obtener un zapato por ID
const getShoeById = (id) => {
  const query = 'SELECT * FROM shoes WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results.length > 0 ? results[0] : null);
    });
  });
};

// Actualizar un zapato
const updateShoe = (id, name, brand_id, fk_categoryshoes, image_url) => {
  const query = 'UPDATE shoes SET name = ?, brand_id = ?, fk_categoryshoes = ?, image_url = ? WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [name, brand_id, fk_categoryshoes, image_url, id], (err, results) => {
      if (err) return reject(err);
      resolve({ affectedRows: results.affectedRows });
    });
  });
};

// Eliminar un zapato
const deleteShoe = (id) => {
  const query = 'DELETE FROM shoes WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve({ affectedRows: results.affectedRows });
    });
  });
};

module.exports = {
  createShoe,
  getAllShoes,
  getShoeById,
  updateShoe,
  deleteShoe
};