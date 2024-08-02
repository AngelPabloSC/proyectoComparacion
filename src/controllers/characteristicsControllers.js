const Characteristics = require('../models/characteristicsModel');

// Crear una característica
exports.createCharacteristic = (req, res) => {
    const { name, description, characteristics_characteristic_id } = req.body;
    Characteristics.createCharacteristic(name, description, characteristics_characteristic_id, (err, id) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id, name, description, characteristics_characteristic_id });
    });
};

// Obtener todas las características
exports.getAllCharacteristics = (req, res) => {
    Characteristics.getAllCharacteristics((err, characteristics) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(characteristics);
    });
};

// Obtener una característica por ID
exports.getCharacteristicById = (req, res) => {
    const id = req.body.id;
    Characteristics.getCharacteristicById(id, (err, characteristic) => {
        if (err) return res.status(500).send(err);
        if (!characteristic) return res.status(404).json({ message: 'Characteristic not found' });
        res.status(200).json(characteristic);
    });
};

// Actualizar una característica
exports.updateCharacteristic = (req, res) => {
    const { id, name, description, characteristics_characteristic_id } = req.body;
    Characteristics.updateCharacteristic(id, name, description, characteristics_characteristic_id, (err, affectedRows) => {
        if (err) return res.status(500).send(err);
        if (affectedRows === 0) return res.status(404).json({ message: 'Characteristic not found' });
        res.status(200).json({ id, name, description, characteristics_characteristic_id });
    });
};

// Eliminar una característica
exports.deleteCharacteristic = (req, res) => {
    const id = req.body.id;
    Characteristics.deleteCharacteristic(id, (err, affectedRows) => {
        if (err) return res.status(500).send(err);
        if (affectedRows === 0) return res.status(404).json({ message: 'Characteristic not found' });
        res.status(204).end();
    });
};