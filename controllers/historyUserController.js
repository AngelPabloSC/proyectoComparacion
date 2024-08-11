const HistoryUsers = require('../models/historyUserModels');

// Crear un registro de historial de usuario
exports.createHistoryUser = (req, res) => {
    const { fk_shoes, fk_user, date } = req.body;
    HistoryUsers.createHistoryUser(fk_shoes, fk_user, date, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(201).json({
            code: "COD_OK",
            result: {
                message: "History record created successfully",
                id_history: result.id_history,
                fk_shoes,
                fk_user,
                date
            }
        });
    });
};

// Obtener todos los registros de historial de usuario
exports.getAllHistoryUsers = (req, res) => {
    HistoryUsers.getAllHistoryUsers((err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "History records fetched successfully",
                data: result
            }
        });
    });
};

// Obtener un registro de historial de usuario por ID
exports.getHistoryUserById = (req, res) => {
    const id_history = req.params.id_history;
    HistoryUsers.getHistoryUserById(id_history, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (!result) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'History record not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "History record fetched successfully",
                data: result
            }
        });
    });
};

// Obtener un registro de historial de usuario por claves foráneas
exports.getHistoryUserByKeys = (req, res) => {
    const { fk_shoes, fk_user } = req.params;
    HistoryUsers.getHistoryUserByKeys(fk_shoes, fk_user, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (!result) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'History record not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: {
                message: "History record fetched successfully",
                data: result
            }
        });
    });
};

// Actualizar un registro de historial de usuario
exports.updateHistoryUser = (req, res) => {
    const { id_history } = req.params;
    const { fk_shoes, fk_user, date } = req.body;
    HistoryUsers.updateHistoryUser(id_history, fk_shoes, fk_user, date, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'History record not found' }
        });
        res.status(200).json({
            code: "COD_OK",
            result: { message: 'History record updated successfully' }
        });
    });
};

// Eliminar un registro de historial de usuario
exports.deleteHistoryUser = (req, res) => {
    const { id_history } = req.params;
    HistoryUsers.deleteHistoryUser(id_history, (err, result) => {
        if (err) return res.status(500).json({
            code: "COD_ERR",
            result: { error: err.message }
        });
        if (result.affectedRows === 0) return res.status(404).json({
            code: "COD_ERR",
            result: { message: 'History record not found' }
        });
        res.status(204).json({
            code: "COD_OK",
            result: { message: 'History record deleted successfully' }
        });
    });
};