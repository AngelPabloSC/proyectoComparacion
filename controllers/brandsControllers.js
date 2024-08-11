const brandsModel = require('../models/brandsModels.js');

// Controlador para crear una marca
exports.createBrand = (req, res) => {
  const { name } = req.body;
  brandsModel.createBrand(name, (err, result) => {
    if (err) return res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
    res.status(201).json({
      code: "COD_OK",
      result: {
        message: "Brand created successfully",
        id: result.id,
        name
      }
    });
  });
};

// Controlador para obtener todas las marcas
exports.getAllBrands = (req, res) => {
  brandsModel.getAllBrands((err, brands) => {
    if (err) return res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
    res.status(200).json({
      code: "COD_OK",
      result: {
        message: "Brands fetched successfully",
        data: brands
      }
    });
  });
};

// Controlador para obtener una marca por ID
exports.getBrandById = (req, res) => {
  const { id } = req.params;
  brandsModel.getBrandById(id, (err, brand) => {
    if (err) return res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
    if (!brand) return res.status(404).json({
      code: "COD_ERR",
      result: { message: 'Brand not found' }
    });
    res.status(200).json({
      code: "COD_OK",
      result: {
        message: "Brand fetched successfully",
        data: brand
      }
    });
  });
};

// Controlador para actualizar una marca
exports.updateBrand = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  brandsModel.updateBrand(id, name, (err, result) => {
    if (err) return res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
    if (result.affectedRows === 0) return res.status(404).json({
      code: "COD_ERR",
      result: { message: 'Brand not found' }
    });
    res.status(200).json({
      code: "COD_OK",
      result: { message: 'Brand updated successfully' }
    });
  });
};

// Controlador para eliminar una marca
exports.deleteBrand = (req, res) => {
  const { id } = req.params;
  brandsModel.deleteBrand(id, (err, result) => {
    if (err) return res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
    if (result.affectedRows === 0) return res.status(404).json({
      code: "COD_ERR",
      result: { message: 'Brand not found' }
    });
    res.status(200).json({
      code: "COD_OK",
      result: { message: 'Brand deleted successfully' }
    });
  });
};