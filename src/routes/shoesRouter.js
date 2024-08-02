const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const characteristicsController = require('../controllers/characteristicsControllers.js');
const categoriesController = require('../controllers/categoryControllers.js');
const brandsController = require('../controllers/brandsControllers.js');
const shoeCharacteristicsController = require('../controllers/shoe_characteristicsControllers.js');
const shoesController = require('../controllers/shoesControllers.js');

// Rutas para características
router.post('/characteristics/create', characteristicsController.createCharacteristic);
router.post('/characteristics/getAll', characteristicsController.getAllCharacteristics);
router.post('/characteristics/getById', characteristicsController.getCharacteristicById);
router.post('/characteristics/update', characteristicsController.updateCharacteristic);
router.post('/characteristics/delete', characteristicsController.deleteCharacteristic);

// Rutas para categorías
router.post('/category/create', categoriesController.createCategory);
router.post('/category/all', categoriesController.getAllCategories);
router.post('/category/get/:id', categoriesController.getCategoryById);
router.post('/category/update/:id', categoriesController.updateCategory);
router.post('/category/delete/:id', categoriesController.deleteCategory);

// Rutas para brands
router.post('/brand/create', brandsController.createBrand);
router.post('/brand/all', brandsController.getAllBrands);
router.post('/brand/get/:id', brandsController.getBrandById);
router.post('/brand/update/:id', brandsController.updateBrand);
router.post('/brand/delete/:id', brandsController.deleteBrand);

// Rutas para shoe_characteristics
router.post('/shoe_characteristic/create', shoeCharacteristicsController.createShoeCharacteristic);
router.post('/shoe_characteristic/getAll', shoeCharacteristicsController.getAllShoeCharacteristics);
router.post('/shoe_characteristic/getById', shoeCharacteristicsController.getShoeCharacteristicById);
router.post('/shoe_characteristic/update', shoeCharacteristicsController.updateShoeCharacteristic);
router.post('/shoe_characteristic/delete', shoeCharacteristicsController.deleteShoeCharacteristic);

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads'); // Carpeta donde se almacenarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
    }
});

const upload = multer({ storage });

// Rutas para shoes
router.post('/shoes/create', upload.single('image'), shoesController.createShoe); // Agrega el middleware `upload`
router.post('/shoes/getAll', shoesController.getAllShoes);
router.post('/shoes/getById', shoesController.getShoeById);
router.post('/shoes/update/:id', shoesController.updateShoe);
router.post('/shoes/delete', shoesController.deleteShoe);

module.exports = router;