
const path = require('path');
const express = require('express');
const router = express.Router();
const characteristicsController = require('../controllers/characteristicsControllers.js');
const categoriesController = require('../controllers/categoryControllers.js');
const brandsController = require('../controllers/brandsControllers.js');
const shoeCharacteristicsController = require('../controllers/shoe_characteristicsControllers.js');
const shoesController = require('../controllers/shoesControllers.js');
const userController = require('../controllers/userControllers.js');
const credentialController = require('../controllers/credentialController.js');
const historyUserController = require('../controllers/historyUserController.js');
const storeController = require('../controllers/storeController.js');
const storeShoesController = require('../controllers/storeShoesController.js');
const queyrshoesCharacController = require('../controllers/queryShoesCharacPriceController.js');
const authenticate = require('../middlewares/authMiddleware.js');
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


// Rutas para shoes
router.post('/shoes/create', shoesController.createShoe);
router.post('/shoes/getAll', shoesController.getAllShoes);
router.post('/shoes/getById', shoesController.getShoeById);
router.post('/shoes/update/:id', shoesController.updateShoe);
router.post('/shoes/delete/:id', shoesController.deleteShoe);
// Rutas para user
router.post('/user/create', userController.createUser);
router.post('/user/getAll', userController.getAllUsers);
router.post('/user/getById', userController.getUserById);
router.post('/user/update/:id', userController.updateUser);
router.post('/user/delete', userController.deleteUser);

//iniciar Secion
router.get('/protected-route', authenticate, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
});
router.post('/login', credentialController.login);
// Rutas para credential
router.post('/credential/create', credentialController.createCredential);
router.post('/credential/getAll', credentialController.getAllCredentials);
router.post('/credential/getById', credentialController.getCredentialById);
router.post('/credential/update/:id', credentialController.updateCredential);
router.post('/credential/delete', credentialController.deleteCredential);
// Rutas para history
router.post('/history/create', historyUserController.createHistoryUser);
router.post('/history/getAll', historyUserController.getAllHistoryUsers);
router.post('/history/getById', historyUserController.getHistoryUserByKeys);
router.post('/history/update/:id', historyUserController.updateHistoryUser);
router.post('/history/delete', historyUserController.deleteHistoryUser);
// Rutas para store
router.post('/store/create', storeController.createStore);
router.post('/store/getAll', storeController.getAllStores);
router.post('/store/getById', storeController.getStoreById);
router.post('/store/update/:id', storeController.updateStore);
router.post('/store/delete', storeController.deleteStore);
// Rutas para shoesstore
router.post('/shoesstore/create', storeShoesController.createStoreShoes);
router.post('/shoesstore/getAll', storeShoesController.getAllStoreShoes);
router.post('/shoesstore/getById', storeShoesController.getStoreShoesByIds);
router.post('/shoesstore/update/:id', storeShoesController.updateStoreShoes);
router.post('/shoesstore/delete/:id', storeShoesController.deleteStoreShoes);
//Queryshoeschrateris
router.post('/characPriceShoes', queyrshoesCharacController.getShoesWithCharacteristicsAndPrices);
router.post('/characPriceShoes/:shoe_id', queyrshoesCharacController.getShoeWithCharacteristicsAndPricesById);
router.post('/shesbrand/:brand_id', queyrshoesCharacController.getShoesByBrand)
router.post('/storeshoes/:store_id', queyrshoesCharacController.getShoesByStore)

router.post('/shoesprice', queyrshoesCharacController.getShoesWithDetails)
module.exports = router;