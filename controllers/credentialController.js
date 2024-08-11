const Credentials = require('../models/credentialModels');

// Crear una credencial
exports.createCredential = (req, res) => {
    const { username, password, fk_user } = req.body;
    Credentials.createCredential(username, password, fk_user, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(201).json({
            code: "COD_OK",
            result: {
                message: "Credential created successfully",
                id_credential: result.id_credential,
                username,
                fk_user
            }
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
        res.status(204).json({
            code: "COD_OK",
            result: { message: 'Credential deleted successfully' }
        });
    });
};