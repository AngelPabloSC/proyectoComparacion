const Shoes = require('../models/shoesModels.js');
const cloudinary = require('../config/dbCladinaryConfg.js');

// Controlador para crear un zapato con subida de imagen
exports.createShoe = async (req, res) => {
    try {
        const { name, brand_id, category_id, price, size, color } = req.body;
        const image = req.file; // Asegúrate de que el archivo se envíe como 'image' en el form-data

        if (!image) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        // Subir imagen a Cloudinary
        const result = await cloudinary.uploader.upload(image.path);

        const image_url = result.secure_url;

        // Insertar el zapato en la base de datos
        Shoes.createShoe(name, brand_id, category_id, price, size, color, image_url, (err, id) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, name, brand_id, category_id, price, size, color, image_url });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controlador para obtener todos los zapatos
exports.getAllShoes = (req, res) => {
    Shoes.getAllShoes((err, shoes) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(shoes);
    });
};

// Controlador para obtener un zapato por ID
exports.getShoeById = (req, res) => {
    const id = req.params.id;
    Shoes.getShoeById(id, (err, shoe) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!shoe) return res.status(404).json({ message: 'Shoe not found' });
        res.status(200).json(shoe);
    });
};

// Controlador para actualizar un zapato
exports.updateShoe = (req, res) => {
    const { id } = req.params;
    const { name, brand_id, category_id, price, size, color } = req.body;
    const image = req.files?.image;

    if (image) {
        cloudinary.uploader.upload(image.tempFilePath, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const image_url = result.secure_url;

            Shoes.updateShoe(id, name, brand_id, category_id, price, size, color, image_url, (err, affectedRows) => {
                if (err) return res.status(500).json({ error: err.message });
                if (affectedRows === 0) return res.status(404).json({ message: 'Shoe not found' });
                res.status(200).json({ message: 'Shoe updated successfully', id, name, brand_id, category_id, price, size, color, image_url });
            });
        });
    } else {
        Shoes.updateShoe(id, name, brand_id, category_id, price, size, color, null, (err, affectedRows) => {
            if (err) return res.status(500).json({ error: err.message });
            if (affectedRows === 0) return res.status(404).json({ message: 'Shoe not found' });
            res.status(200).json({ message: 'Shoe updated successfully', id, name, brand_id, category_id, price, size, color });
        });
    }
};

// Controlador para eliminar un zapato
exports.deleteShoe = (req, res) => {
    const { id } = req.body;
    Shoes.deleteShoe(id, (err, affectedRows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (affectedRows === 0) return res.status(404).json({ message: 'Shoe not found' });
        res.status(200).json({ message: 'Shoe deleted successfully' });
    });
};