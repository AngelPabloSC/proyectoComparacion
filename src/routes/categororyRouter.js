const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoryControllers.js');

// Ruta para crear una categoría
router.post('/create', categoriesController.createCategory);

// Ruta para obtener todas las categorías
router.post('/all', categoriesController.getAllCategories);

// Ruta para obtener una categoría por ID
router.post('/get/:id', categoriesController.getCategoryById);

// Ruta para actualizar una categoría
router.post('/update/:id', categoriesController.updateCategory);

// Ruta para eliminar una categoría
router.post('/delete/:id', categoriesController.deleteCategory);

module.exports = router;