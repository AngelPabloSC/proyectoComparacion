const shoeCharacteristicsModel = require('../models/shoe_characteristicsModels.js');

// Controlador para crear una relación zapato-característica
exports.createShoeCharacteristic = (req, res) => {
    const { shoe_id, characteristic_id, value } = req.body;
    shoeCharacteristicsModel.createShoeCharacteristic(shoe_id, characteristic_id, value, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id, shoe_id, characteristic_id, value });
    });
};

// Controlador para obtener todas las relaciones zapato-característica
exports.getAllShoeCharacteristics = (req, res) => {
    shoeCharacteristicsModel.getAllShoeCharacteristics((err, shoeCharacteristics) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(shoeCharacteristics);
    });
};

// Controlador para obtener una relación zapato-característica por ID de zapato y característica
exports.getShoeCharacteristicById = (req, res) => {
    const { shoe_id, characteristic_id } = req.body;
    shoeCharacteristicsModel.getShoeCharacteristicById(shoe_id, characteristic_id, (err, shoeCharacteristic) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!shoeCharacteristic) return res.status(404).json({ message: 'Shoe characteristic not found' });
        res.status(200).json(shoeCharacteristic);
    });
};

// Controlador para actualizar una relación zapato-característica
exports.updateShoeCharacteristic = (req, res) => {
    const { shoe_id, characteristic_id, value } = req.body;
    shoeCharacteristicsModel.updateShoeCharacteristic(shoe_id, characteristic_id, value, (err, affectedRows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (affectedRows === 0) return res.status(404).json({ message: 'Shoe characteristic not found' });
        res.status(200).json({ message: 'Shoe characteristic updated successfully' });
    });
};

// Controlador para eliminar una relación zapato-característica
exports.deleteShoeCharacteristic = (req, res) => {
    const { shoe_id, characteristic_id } = req.body;
    shoeCharacteristicsModel.deleteShoeCharacteristic(shoe_id, characteristic_id, (err, affectedRows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (affectedRows === 0) return res.status(404).json({ message: 'Shoe characteristic not found' });
        res.status(200).json({ message: 'Shoe characteristic deleted successfully' });
    });
};