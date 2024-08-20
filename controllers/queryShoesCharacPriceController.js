// controllers/queryshoesCharacPriceController.js

const shoesModel = require('../models/queryshoesCharacPrice');
const { fetchUserCategoriesDetails } = require('../models/queryshoesCharacPrice');
// Controlador para obtener todos los zapatos con características y precios

// Controlador para obtener detalles de categorías de usuarios
exports.getUserCategoriesDetails = (req, res) => {
    const id_user = req.params.id_user;

    if (!id_user) {
        return res.status(400).json({
            code: "ERR_CODE",
            result: { error: "Falta el parámetro id_user" }
        });
    }

    shoesModel.fetchUserCategoriesDetails(id_user, (err, result) => {
        if (err) {
            return res.status(500).json({
                code: "ERR_CODE",
                result: { error: err.message }
            });
        }
        res.status(200).json(result);
    });
};

exports.getShoesWithCharacteristicsAndPrices = (req, res) => {
    shoesModel.getAllShoesWithCharacteristicsAndPrices((err, shoes) => {
        if (err) {
            return res.status(500).json({
                code: "COD_ERR",
                result: { error: err.message }
            });
        }
        res.status(200).json({
            code: "COD_OK",
            result: { data: shoes }
        });
    });
};

// Controlador para obtener características y precios de un zapato específico
exports.getShoeWithCharacteristicsAndPricesById = (req, res) => {
    const { shoe_id } = req.params;
    shoesModel.getShoeWithCharacteristicsAndPricesById(shoe_id, (err, shoe) => {
        if (err) {
            if (err.message === 'Shoe not found') {
                return res.status(404).json({
                    code: "COD_ERR",
                    result: { error: 'Shoe not found' }
                });
            }
            return res.status(500).json({
                code: "COD_ERR",
                result: { error: err.message }
            });
        }
        res.status(200).json({
            code: "COD_OK",
            result: { data: shoe }
        });
    });
};

// Controlador para obtener zapatos por marca
exports.getShoesByBrand = (req, res) => {
    const { brand_id } = req.params;  // Usa `req.query` si estás pasando el parámetro en la cadena de consulta

    shoesModel.getShoesByBrand(brand_id, (err, result) => {
        if (err) {
            return res.status(500).json({
                code: "COD_ERR",
                result: { error: err.message }
            });
        }

        res.status(200).json({
            code: "COD_OK",
            result: {
                data: result
            }
        });
    });
};

// controllers/queryshoesCharacPriceController.js


// Controlador para obtener zapatos disponibles en una tienda específica
exports.getShoesByStore = (req, res) => {
    const { store_id } = req.params;

    shoesModel.getShoesByStore(store_id, (err, result) => {
        if (err) {
            return res.status(500).json({
                code: "COD_ERR",
                result: { error: err.message }
            });
        }

        // Ajustar el formato de respuesta
        res.status(200).json({
            code: "COD_OK",
            result: {
                data: result
            }
        });
    });
};

// Controlador para obtener todos los zapatos con detalles Precio
exports.getShoesWithDetails = (req, res) => {
    shoesModel.getAllShoesWithDetails((err, result) => {
        if (err) {
            return res.status(500).json({
                code: "COD_ERR",
                result: { error: err.message }
            });
        }
        // Ajustar el formato de respuesta
        res.status(200).json(result);
    });
};

exports.getUserShoesHistory = (req, res) => {
    const userId = req.params.userId;

    shoesModel.fetchUserShoesHistory(userId, (err, result) => {
        if (err) {
            return res.status(500).json({
                code: "COD_ERR",
                result: { error: err.message }
            });
        }
        res.status(200).json(result);
    });
};