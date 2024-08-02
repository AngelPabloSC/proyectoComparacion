const Categories = require('../models/categoryModels');

// Crear una categoría
exports.createCategory = (req, res) => {
    const { category_id, name } = req.body;
    Categories.createCategory(category_id, name, (err, id) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id, category_id, name });
    });
};

// Obtener todas las categorías
exports.getAllCategories = (req, res) => {
    Categories.getAllCategories((err, categories) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(categories);
    });
};

// Obtener una categoría por ID
exports.getCategoryById = (req, res) => {
    const id = req.body.id;
    Categories.getCategoryById(id, (err, category) => {
        if (err) return res.status(500).send(err);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    });
};

// Actualizar una categoría
exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    Categories.updateCategory(id, name, (err, affectedRows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category updated successfully' });
    });
};

// Eliminar una categoría
exports.deleteCategory = (req, res) => {
    const id = req.body.id;
    Categories.deleteCategory(id, (err, affectedRows) => {
        if (err) return res.status(500).send(err);
        if (affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
        res.status(204).end();
    });
};