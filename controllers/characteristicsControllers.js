const Characteristics = require('../models/characteristicsModel');

// Crear una característica
exports.createCharacteristic = (req, res) => {
    const { name, description } = req.body;
    Characteristics.createCharacteristic(name, description, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(201).json({
            code: "COD_OK",
            result: {
                message: "Characteristic created successfully",
                id: result.id,
                name,
                description
            }
        });
    });
};

// Obtener todas las características
exports.getAllCharacteristics = (req, res) => {
    Characteristics.getAllCharacteristics((err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "Characteristics fetched successfully",
                data: result
            }
        });
    });
};

// Obtener una característica por ID
exports.getCharacteristicById = (req, res) => {
    const id = req.params.id; // Cambiado a params en lugar de body
    Characteristics.getCharacteristicById(id, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (!result) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Characteristic not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "Characteristic fetched successfully",
                data: result
            }
        });
    });
};

// Actualizar una característica
exports.updateCharacteristic = (req, res) => {
    const { id, name, description } = req.body;
    Characteristics.updateCharacteristic(id, name, description, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Characteristic not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: { message: 'Characteristic updated successfully' }
        });
    });
};

// Eliminar una característica
exports.deleteCharacteristic = (req, res) => {
    const id = req.body.id;
    Characteristics.deleteCharacteristic(id, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Characteristic not found' }
        });
        res.status(204).json({
            code: "COD_OK",
            result: { message: 'Characteristic deleted successfully' }
        });
    });
};