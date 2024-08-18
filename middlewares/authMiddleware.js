// middleware/authMiddleware.js
const { verifyToken } = require('../utils/auth');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Espera 'Bearer <token>'

    if (!token) return res.status(401).json({ code: "COD_ERR", result: { message: 'No token provided' } });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ code: "COD_ERR", result: { message: 'Invalid token' } });

    req.userId = decoded.userId; // Guardar el ID del usuario en la solicitud
    next();
};

module.exports = authenticate;