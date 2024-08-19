const Credentials = require('../models/credentialModels');
const { generateToken } = require('../utils/auth');
const db = require('../config/dbconfig');
const bcrypt = require('bcryptjs');
// Crear una credencial
exports.createCredential = (req, res) => {
    const { username, password, fk_user } = req.body;

    // Llama al modelo para crear la credencial
    Credentials.createCredential(username, password, fk_user, (err, result) => {
        if (err) {
            return res.status(500).json({
                code: "COD_ERR",
                result: { error: err.message }
            });
        }

        // Envia una respuesta exitosa con los datos de la credencial creada
        res.status(201).json({
            code: "COD_OK",
            result: {
                message: "Credential created successfully",
                data: [
                    {
                        id_credential: result.id_credential,
                        username,
                        fk_user
                    }
                ]
            }
        });
    });
};

// Iniciar sesión
exports.login = (req, res) => {
    const { username, password } = req.body;
    console.log('Solicitando login para usuario:', username);

    // Recuperar las credenciales del usuario de la base de datos
    db.query('SELECT * FROM credential WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({
                code: "COD_ERR",
                result: { error: err.message }
            });
        }

        if (results.length === 0) {
            console.log('Usuario no encontrado');
            return res.status(401).json({
                code: "COD_ERR",
                result: { message: 'Invalid username or password' }
            });
        }

        const user = results[0];

        // Comparar la contraseña proporcionada con el hash almacenado
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error al comparar la contraseña:', err);
                return res.status(500).json({
                    code: "COD_ERR",
                    result: { error: err.message }
                });
            }

            if (!isMatch) {
                console.log('Contraseña incorrecta');
                return res.status(401).json({
                    code: "COD_ERR",
                    result: { message: 'Invalid username or password' }
                });
            }

            console.log('Usuario verificado:', user);

            // Generar un token JWT y devolverlo
            const token = generateToken(user.fk_user);

            res.status(200).json({
                code: "COD_OK",
                result: {
                    message: "Login successful",
                    userId: user.fk_user,
                    username,
                    token
                }
            });
        });
    });
};

// Obtener todas las credenciales
exports.getAllCredentials = (req, res) => {
    Credentials.getAllCredentials((err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "Credentials fetched successfully",
                data: result
            }
        });
    });
};

// Obtener una credencial por ID
exports.getCredentialById = (req, res) => {
    const id_credential = req.params.id_credential;
    Credentials.getCredentialById(id_credential, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (!result) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Credential not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "Credential fetched successfully",
                data: result
            }
        });
    });
};

// Actualizar una credencial
exports.updateCredential = (req, res) => {
    const { id_credential } = req.params;
    const { username, password, fk_user } = req.body;
    Credentials.updateCredential(id_credential, username, password, fk_user, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Credential not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: { message: 'Credential updated successfully' }
        });
    });
};

// Eliminar una credencial
exports.deleteCredential = (req, res) => {
    const { id_credential } = req.params;
    Credentials.deleteCredential(id_credential, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'Credential not found' }
        });
        res.status(204).end();
    });
};