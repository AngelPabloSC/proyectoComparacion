const upload = require('../config/multerConfig.js');
const cloudinary = require('../config/dbCladinaryConfg.js');
const Shoes = require('../models/shoesModels.js');
const path = require('path');

// Función para subir la imagen a Cloudinary
const uploadImageToCloudinary = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath);
        return result.secure_url;
    } catch (error) {
        throw new Error('Error al subir la imagen a Cloudinary: ' + error.message);
    }
};

// Controlador para crear un zapato con subida de imagen
exports.createShoe = (req, res) => {
    upload.single('image_url')(req, res, async (err) => {
        if (err) return res.status(500).json({ code: "COD_ERR", result: { error: 'Error en la carga del archivo' } });

        const { name, brand_id, fk_categoryshoes } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ code: "COD_ERR", result: { error: 'Image file is required' } });
        }

        try {
            // Responde al cliente inmediatamente
            res.status(202).json({ code: "COD_OK", result: { message: 'Processing shoe creation, check later for status' } });

            // Subir la imagen a Cloudinary en segundo plano
            const image_url = await uploadImageToCloudinary(file.path);

            // Inserta el zapato en la base de datos
            const result = await Shoes.createShoe(name, brand_id, fk_categoryshoes, image_url);
            console.log('Shoe created successfully with ID:', result.id);

            // Notifica o maneja la finalización del proceso de alguna manera (ej. websockets, emails, etc.)

        } catch (error) {
            console.error('Error during shoe creation:', error.message);
        }
    });
};

// Controlador para obtener todos los zapatos
exports.getAllShoes = async (req, res) => {
    try {
        const result = await Shoes.getAllShoes();
        res.status(200).json({ code: "COD_OK", result: { data: result } });
    } catch (error) {
        res.status(500).json({ code: "COD_ERR", result: { error: error.message } });
    }
};

// Controlador para obtener un zapato por ID
exports.getShoeById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Shoes.getShoeById(id);
        if (!result) return res.status(404).json({ code: "COD_ERR", result: { message: 'Shoe not found' } });
        res.status(200).json({ code: "COD_OK", result: { data: result } });
    } catch (error) {
        res.status(500).json({ code: "COD_ERR", result: { error: error.message } });
    }
};

// Controlador para actualizar un zapato
exports.updateShoe = (req, res) => {
    upload.single('image_url')(req, res, async (err) => {
        if (err) return res.status(500).json({ code: "COD_ERR", result: { error: 'Error en la carga del archivo' } });

        const { id } = req.params;
        const { name, brand_id, fk_categoryshoes } = req.body;
        const file = req.file; // Archivo cargado

        let image_url = null;
        if (file) {
            try {
                // Subir la imagen a Cloudinary
                image_url = await uploadImageToCloudinary(file.path);
            } catch (error) {
                return res.status(500).json({ code: "COD_ERR", result: { error: error.message } });
            }
        }

        try {
            // Actualizar el zapato en la base de datos
            const result = await Shoes.updateShoe(id, name, brand_id, fk_categoryshoes, image_url);
            if (result.affectedRows === 0) return res.status(404).json({ code: "COD_ERR", result: { message: 'Shoe not found' } });
            res.status(200).json({ code: "COD_OK", result: { message: 'Shoe updated successfully', id, name, brand_id, fk_categoryshoes, image_url } });
        } catch (error) {
            res.status(500).json({ code: "COD_ERR", result: { error: error.message } });
        }
    });
};

// Controlador para eliminar un zapato
exports.deleteShoe = async (req, res) => {
    const { id } = req.params;
    try {
        const shoe = await Shoes.getShoeById(id);
        if (!shoe) return res.status(404).json({ code: "COD_ERR", result: { message: 'Shoe not found' } });

        // Eliminar la imagen de Cloudinary
        if (shoe.image_url) {
            const public_id = path.basename(shoe.image_url, path.extname(shoe.image_url));
            await cloudinary.uploader.destroy(public_id);
        }

        // Eliminar el zapato de la base de datos
        const result = await Shoes.deleteShoe(id);
        if (result.affectedRows === 0) return res.status(404).json({ code: "COD_ERR", result: { message: 'Shoe not found' } });
        res.status(200).json({ code: "COD_OK", result: { message: 'Shoe deleted successfully' } });
    } catch (error) {
        res.status(500).json({ code: "COD_ERR", result: { error: error.message } });
    }
};