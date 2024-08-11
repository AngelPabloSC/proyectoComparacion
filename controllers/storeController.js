const Stores = require('../models/storeModels');

// Crear una tienda
exports.createStore = (req, res) => {
    const { name } = req.body;
    Stores.createStore(name, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(201).json({
            code: "COD_OK",
            result: {
                message: "Store created successfully",
                id: result.id,
                name
            }
        });
    });
};

// Obtener todas las tiendas
exports.getAllStores = (req, res) => {
    Stores.getAllStores((err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "Stores fetched successfully",
                data: result
            }
        });
    });
};

// Obtener una tienda por ID
exports.getStoreById = (req, res) => {
    const id = req.params.id;
    Stores.getStoreById(id, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (!result) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Store not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "Store fetched successfully",
                data: result
            }
        });
    });
};

// Actualizar una tienda
exports.updateStore = (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    Stores.updateStore(id, name, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Store not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: { message: 'Store updated successfully' }
        });
    });
};

// Eliminar una tienda
exports.deleteStore = (req, res) => {
    const id = req.params.id;
    Stores.deleteStore(id, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Store not found' }
        });
        res.status(204).json({
            code: "COD_OK",
            result: { message: 'Store deleted successfully' }
        });
    });
};