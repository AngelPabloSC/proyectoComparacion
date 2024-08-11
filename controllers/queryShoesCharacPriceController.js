// controllers/queryshoesCharacPriceController.js

const shoesModel = require('../models/queryshoesCharacPrice');

// Controlador para obtener todos los zapatos con características y precios
exports.getShoesWithCharacteristicsAndPrices = (req, res) => {
    shoesModel.getAllShoesWithCharacteristicsAndPrices((err, shoes) => {
        if (err) {
            return res.status(500).json({ code: "COD_ERR", result: { error: err.message } });
        }
        res.status(200).json({ code: "COD_OK", data: shoes });
    });
};

// Controlador para obtener características y precios de un zapato específico
exports.getShoeWithCharacteristicsAndPricesById = (req, res) => {
    const { shoe_id } = req.params;
    shoesModel.getShoeWithCharacteristicsAndPricesById(shoe_id, (err, shoe) => {
        if (err) {
            if (err.message === 'Shoe not found') {
                return res.status(404).json({ code: "COD_ERR", result: { error: 'Shoe not found' } });
            }
            return res.status(500).json({ code: "COD_ERR", result: { error: err.message } });
        }
        res.status(200).json({ code: "COD_OK", data: shoe });
    });
};

// Controlador para obtener zapatos por marca
exports.getShoesByBrand = (req, res) => {
    const { brand_id } = req.params;  // Usa `req.query` si estás pasando el parámetro en la cadena de consulta

    shoesModel.getShoesByBrand(brand_id, (err, shoes) => {
        if (err) {
            return res.status(500).json({
                code: 'ERROR',
                message: 'Error al obtener los zapatos',
                error: err
            });
        }

        res.status(200).json({
            code: 'OK',
            data: shoes
        });
    });
};