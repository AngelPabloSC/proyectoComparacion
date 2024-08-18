const usersModel = require('../models/userModels');

// Crear un usuario
exports.createUser = (req, res) => {
  const { name, lastname, birthday_date, email, fk_category_user } = req.body;
  usersModel.createUser(name, lastname, birthday_date, email, fk_category_user, (err, result) => {
    if (err) return res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
    res.status(201).json({
      code: "COD_OK",
      result: {
        message: "User created successfully",
        id: result.id_user,  // Asegúrate de usar 'id_user'
        name,
        lastname,
        birthday_date,
        email,
        fk_category_user
      }
    });
  });
};

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  usersModel.getAllUsers((err, users) => {
    if (err) return res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
    res.status(200).json({
      code: "COD_OK",
      result: {
        message: "Users fetched successfully",
        data: users
      }
    });
  });
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
  const { id_user } = req.params;
  usersModel.getUserById(id_user, (err, user) => {
    if (err) return res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
    if (!user) return res.status(404).json({
      code: "COD_ERR",
      result: { message: 'User not found' }
    });
    res.status(200).json({
      code: "COD_OK",
      result: {
        message: "User fetched successfully",
        data: user
      }
    });
  });
};

// Actualizar un usuario
exports.updateUser = (req, res) => {
  const { id_user } = req.params;
  const { name, lastname, birthday_date, email, fk_category_user } = req.body;
  usersModel.updateUser(id_user, name, lastname, birthday_date, email, fk_category_user, (err, result) => {
    if (err) return res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
    if (result.affectedRows === 0) return res.status(404).json({
      code: "COD_ERR",
      result: { message: 'User not found' }
    });
    res.status(200).json({
      code: "COD_OK",
      result: { message: 'User updated successfully' }
    });
  });
};

// Eliminar un usuario
exports.deleteUser = (req, res) => {
  const { id_user } = req.params;
  usersModel.deleteUser(id_user, (err, result) => {
    if (err) return res.status(500).json({
      code: "COD_ERR",
      result: { error: err.message }
    });
    if (result.affectedRows === 0) return res.status(404).json({
      code: "COD_ERR",
      result: { message: 'User not found' }
    });
    res.status(204).json({
      code: "COD_OK",
      result: { message: 'User deleted successfully' }
    });
  });
};