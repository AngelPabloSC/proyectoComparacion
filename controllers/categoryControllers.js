const Categories = require('../models/categoryModels');

// Crear una categoría
exports.createCategory = (req, res) => {
    const { name, fk_categories } = req.body;
    Categories.createCategory(name, fk_categories, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(201).json({
            code: "COD_OK",
            result: {
                message: "Category created successfully",
                id: result.id,
                name,
                fk_categories
            }
        });
    });
};

// Obtener todas las categorías
exports.getAllCategories = (req, res) => {
    Categories.getAllCategories((err, categories) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "Categories fetched successfully",
                data: categories
            }
        });
    });
};

// Obtener una categoría por ID
exports.getCategoryById = (req, res) => {
    const id = req.params.id; // Cambiado a params en lugar de body
    Categories.getCategoryById(id, (err, category) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (!category) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Category not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "Category fetched successfully",
                data: category
            }
        });
    });
};

// Actualizar una categoría
exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { name, fk_categories } = req.body;
    Categories.updateCategory(id, name, fk_categories, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Category not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: { message: 'Category updated successfully' }
        });
    });
};

// Eliminar una categoría
exports.deleteCategory = (req, res) => {
    const id = req.params.id; // Cambiado a params en lugar de body
    Categories.deleteCategory(id, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Category not found' }
        });
        res.status(204).json({
            code: "COD_OK",
            result: { message: 'Category deleted successfully' }
        });
    });
};