// models/queryshoesCharacPrice.js

const db = require('../config/dbconfig.js');
const queries = require('../querys/shoesCharesterisPrice.js');

// Obtener todos los zapatos con características y precios
const getAllShoesWithCharacteristicsAndPrices = (callback) => {
    db.query(queries.GET_ALL_SHOES_WITH_CHARACTERISTICS_AND_PRICES, (err, results) => {
        if (err) {
            return callback(err);
        }

        const shoes = [];
        results.forEach(row => {
            let shoe = shoes.find(shoe => shoe.shoe_id === row.shoe_id);
            if (!shoe) {
                shoe = {
                    shoe_id: row.shoe_id,
                    shoe_name: row.shoe_name,
                    brand_id: row.brand_id,
                    image_url: row.image_url,
                    fk_categoryshoes: row.fk_categoryshoes,
                    characteristics: [],
                    prices: []
                };
                shoes.push(shoe);
            }
            // Evitar características duplicadas
            if (row.characteristic_id && !shoe.characteristics.some(c => c.characteristic_id === row.characteristic_id)) {
                shoe.characteristics.push({
                    characteristic_id: row.characteristic_id,
                    characteristic_name: row.characteristic_name,
                    value: row.value
                });
            }
            // Evitar precios duplicados
            if (row.store_price && !shoe.prices.some(p => p.price === row.store_price)) {
                shoe.prices.push({
                    price: row.store_price
                });
            }
        });

        callback(null, shoes);
    });
};

// Obtener características y precios de un zapato específico
const getShoeWithCharacteristicsAndPricesById = (shoe_id, callback) => {
    db.query(queries.GET_SHOE_WITH_CHARACTERISTICS_AND_PRICES_BY_ID, [shoe_id], (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.length === 0) {
            return callback(new Error('Shoe not found'));
        }

        const shoe = {
            shoe_id: results[0].shoe_id,
            shoe_name: results[0].shoe_name,
            brand_name: results[0].brand_name,  // Cambiado a brand_name
            image_url: results[0].image_url,
            category_name: results[0].category_name,  // Cambiado a category_name
            characteristics: [],
            prices: []
        };

        results.forEach(row => {
            // Evitar características duplicadas
            if (row.characteristic_id && !shoe.characteristics.some(c => c.characteristic_id === row.characteristic_id)) {
                shoe.characteristics.push({
                    characteristic_id: row.characteristic_id,
                    characteristic_name: row.characteristic_name,
                    value: row.value
                });
            }
            // Evitar precios duplicados
            if (row.store_price && !shoe.prices.some(p => p.price === row.store_price)) {
                shoe.prices.push({
                    price: row.store_price,
                    store_name: row.store_name  // Agregado el nombre de la tienda
                });
            }
        });

        callback(null, shoe);
    });
};
// Obtener todos los zapatos por marca
const getShoesByBrand = (brand_id, callback) => {
    db.query(queries.GET_SHOES_BY_BRAND, [brand_id], (err, results) => {
        if (err) {
            return callback({
                code: "COD_ERR",
                result: { error: err.message }
            });
        }

        // Mapeo de resultados a un formato adecuado
        const shoes = results.map(row => ({
            shoe_id: row.shoe_id,
            shoe_name: row.shoe_name,
            brand_name: row.brand_name
        }));

        callback(null, shoes);
    });
};


// Obtener todos los zapatos disponibles en una tienda específica
const getShoesByStore = (store_id, callback) => {
    db.query(queries.GET_SHOES_BY_STORE, [store_id], (err, results) => {
        if (err) {
            return callback({
                code: "COD_ERR",
                result: { error: err.message }
            });
        }

        // Mapeo de resultados a un formato adecuado
        const shoes = results.map(row => ({
            shoe_id: row.shoe_id,
            shoe_name: row.shoe_name,
            brand_name: row.brand_name,
            image_url: row.image_url,
            price: row.price,
            store_name: row.store_name
        }));

        callback(null, shoes);
    });
};

const getAllShoesWithDetails = (callback) => {
    db.query(queries.GET_ALL_SHOES_WITH_DETAILS, (err, results) => {
        if (err) {
            return callback({
                code: "COD_ERR",
                result: { error: err.message }
            });
        }

        const shoes = results.map(row => ({
            shoe_id: row.shoe_id,
            shoe_name: row.shoe_name,
            brand_name: row.brand_name,
            image_url: row.image_url,
            category_name: row.category_name,
            price: row.price,
            store_name: row.store_name
        }));

        // Enviar el formato esperado
        callback(null, {
            code: "COD_OK",
            result: { data: shoes }
        });
    });
};

const fetchUserCategoriesDetails = (userId, callback) => {
    db.query(queries.FETCH_USER_CATEGORIES_DETAILS, [userId], (err, results) => {
        if (err) {
            return callback({
                code: "ERR_CODE",
                result: { error: err.message }
            });
        }

        const categories = results.map(row => ({
            category_name: row.category_name,
            id_user: row.id_user,
            user_name: row.user_name
        }));

        callback(null, {
            code: "COD_OK",
            result: { data: categories }
        });
    });
};


const fetchUserShoeHistory = (userId, callback) => {
    const query = `
        SELECT 
            sh.image_url,
            sh.name AS shoe_name,
            uh.date AS consultation_date
        FROM 
            user_history AS uh
        INNER JOIN 
            shoes AS sh ON uh.fk_shoes = sh.shoe_id
        WHERE 
            uh.fk_user = ?;
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            return callback({
                code: "ERR_CODE",
                result: { error: err.message }
            });
        }

        const shoeHistory = results.map(row => ({
            image_url: row.image_url,
            shoe_name: row.shoe_name,
            consultation_date: row.consultation_date
        }));

        callback(null, {
            code: "COD_OK",
            result: { data: shoeHistory }
        });
    });
};

module.exports = {
    getAllShoesWithCharacteristicsAndPrices,
    getShoeWithCharacteristicsAndPricesById,
    getShoesByBrand,
    getShoesByStore,
    getAllShoesWithDetails,
    fetchUserCategoriesDetails,
    fetchUserShoeHistory
    
};