const brandsModel = require('../models/brandsModels.js');

// Controlador para crear una marca
exports.createBrand = (req, res) => {
  const { name } = req.body;
  brandsModel.createBrand(name, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id });
  });
};

// Controlador para obtener todas las marcas
exports.getAllBrands = (req, res) => {
  brandsModel.getAllBrands((err, brands) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(brands);
  });
};

// Controlador para obtener una marca por ID
exports.getBrandById = (req, res) => {
  const { id } = req.params;
  brandsModel.getBrandById(id, (err, brand) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.status(200).json(brand);
  });
};

// Controlador para actualizar una marca
exports.updateBrand = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  brandsModel.updateBrand(id, name, (err, affectedRows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (affectedRows === 0) return res.status(404).json({ message: 'Brand not found' });
    res.status(200).json({ message: 'Brand updated successfully' });
  });
};

// Controlador para eliminar una marca
exports.deleteBrand = (req, res) => {
  const { id } = req.params;
  brandsModel.deleteBrand(id, (err, affectedRows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (affectedRows === 0) return res.status(404).json({ message: 'Brand not found' });
    res.status(200).json({ message: 'Brand deleted successfully' });
  });
};