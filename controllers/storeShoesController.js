const StoreShoes = require('../models/storeShoesModels');

// Agregar una relación entre zapatos y tienda
exports.createStoreShoes = (req, res) => {
    const { fk_shoes, fk_store, price } = req.body;
    StoreShoes.createStoreShoes(fk_shoes, fk_store, price, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(201).json({
            code: "COD_OK",
            result: {
                message: "StoreShoes relationship created successfully",
                id: result.id,
                fk_shoes,
                fk_store,
                price
            }
        });
    });
};

// Obtener todas las relaciones entre zapatos y tienda
exports.getAllStoreShoes = (req, res) => {
    StoreShoes.getAllStoreShoes((err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "StoreShoes relationships fetched successfully",
                data: result
            }
        });
    });
};

// Obtener una relación entre zapatos y tienda por IDs
exports.getStoreShoesByIds = (req, res) => {
    const { fk_shoes, fk_store } = req.params;
    StoreShoes.getStoreShoesByIds(fk_shoes, fk_store, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (!result) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'StoreShoes relationship not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "StoreShoes relationship fetched successfully",
                data: result
            }
        });
    });
};

// Actualizar el precio en una relación entre zapatos y tienda
exports.updateStoreShoes = (req, res) => {
    const { fk_shoes, fk_store } = req.params;
    const { price } = req.body;
    StoreShoes.updateStoreShoes(fk_shoes, fk_store, price, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'StoreShoes relationship not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: { message: 'StoreShoes relationship updated successfully' }
        });
    });
};

// Eliminar una relación entre zapatos y tienda
exports.deleteStoreShoes = (req, res) => {
    const { fk_shoes, fk_store } = req.params;
    StoreShoes.deleteStoreShoes(fk_shoes, fk_store, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'StoreShoes relationship not found' }
        });
        res.status(204).json({
            code: "COD_OK",
            result: { message: 'StoreShoes relationship deleted successfully' }
        });
    });
};