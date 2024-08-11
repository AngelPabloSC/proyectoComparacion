require('dotenv').config();
const express = require('express');
const router = express.Router();
const app = require('./app.js');
const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Ajusta la ruta según la ubicación real de tu archivo de configuración
const cloudinary = require('./config/dbCladinaryConfg.js');
