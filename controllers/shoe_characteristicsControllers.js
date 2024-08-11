const shoeCharacteristicsModel = require('../models/shoe_characteristicsModels.js');

// Controlador para crear una relación zapato-característica
exports.createShoeCharacteristic = async (req, res) => {
  const { fk_shoes, fk_characteristics, value } = req.body;
  try {
    const id = await shoeCharacteristicsModel.createShoeCharacteristic(fk_shoes, fk_characteristics, value);
    res.status(201).json({
      code: "COD_OK",
      result: {
        message: 'Shoe characteristic created successfully',
        id,
        fk_shoes,
        fk_characteristics,
        value
      }
    });
  } catch (err) {
    res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
  }
};

// Controlador para obtener todas las relaciones zapato-característica
exports.getAllShoeCharacteristics = async (req, res) => {
  try {
    const shoeCharacteristics = await shoeCharacteristicsModel.getAllShoeCharacteristics();
    res.status(200).json({
      code: "COD_OK",
      result: {
        message: 'Shoe characteristics fetched successfully',
        data: shoeCharacteristics
      }
    });
  } catch (err) {
    res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
  }
};

// Controlador para obtener una relación zapato-característica por ID de zapato y característica
exports.getShoeCharacteristicById = async (req, res) => {
  const { fk_shoes, fk_characteristics } = req.body;
  try {
    const shoeCharacteristic = await shoeCharacteristicsModel.getShoeCharacteristicById(fk_shoes, fk_characteristics);
    if (!shoeCharacteristic) {
      return res.status(404).json({
        code: "COD_ERR",
        result: { message: 'Shoe characteristic not found' }
      });
    }
    res.status(200).json({
      code: "COD_OK",
      result: {
        message: 'Shoe characteristic fetched successfully',
        data: shoeCharacteristic
      }
    });
  } catch (err) {
    res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
  }
};

// Controlador para actualizar una relación zapato-característica
exports.updateShoeCharacteristic = async (req, res) => {
  const { fk_shoes, fk_characteristics, value } = req.body;
  try {
    const affectedRows = await shoeCharacteristicsModel.updateShoeCharacteristic(fk_shoes, fk_characteristics, value);
    if (affectedRows === 0) {
      return res.status(404).json({
        code: "COD_ERR",
        result: { message: 'Shoe characteristic not found' }
      });
    }
    res.status(200).json({
      code: "COD_OK",
      result: { message: 'Shoe characteristic updated successfully' }
    });
  } catch (err) {
    res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
  }
};

// Controlador para eliminar una relación zapato-característica
exports.deleteShoeCharacteristic = async (req, res) => {
  const { fk_shoes, fk_characteristics } = req.body;
  try {
    const affectedRows = await shoeCharacteristicsModel.deleteShoeCharacteristic(fk_shoes, fk_characteristics);
    if (affectedRows === 0) {
      return res.status(404).json({
        code: "COD_ERR",
        result: { message: 'Shoe characteristic not found' }
      });
    }
    res.status(200).json({
      code: "COD_OK",
      result: { message: 'Shoe characteristic deleted successfully' }
    });
  } catch (err) {
    res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
  }
};