const usersModel = require('../models/userModels');

// Controlador para crear un usuario
exports.createUser = (req, res) => {
  const { name, lastname, birthday_date, email, fk_category_user } = req.body;
  usersModel.createUser(name, lastname, birthday_date, email, fk_category_user, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json(result);
  });
};

// Controlador para obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  usersModel.getAllUsers((err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

// Controlador para obtener un usuario por ID
exports.getUserById = (req, res) => {
  const { id_user } = req.params;
  usersModel.getUserById(id_user, (err, result) => {
    if (err) return res.status(500).json(err);
    if (!result.data) return res.status(404).json({ code: "COD_ERR", result: { error: 'User not found' } });
    res.status(200).json(result);
  });
};

// Controlador para actualizar un usuario
exports.updateUser = (req, res) => {
  const { id_user } = req.params;
  const { name, lastname, birthday_date, email, fk_category_user } = req.body;
  usersModel.updateUser(id_user, name, lastname, birthday_date, email, fk_category_user, (err, result) => {
    if (err) return res.status(500).json(err);
    if (!result.result) return res.status(404).json({ code: "COD_ERR", result: { error: 'User not found' } });
    res.status(200).json(result);
  });
};

// Controlador para eliminar un usuario
exports.deleteUser = (req, res) => {
  const { id_user } = req.params;
  usersModel.deleteUser(id_user, (err, result) => {
    if (err) return res.status(500).json(err);
    if (!result.result) return res.status(404).json({ code: "COD_ERR", result: { error: 'User not found' } });
    res.status(200).json(result);
  });
};