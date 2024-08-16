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
            brand_id: results[0].brand_id,
            image_url: results[0].image_url,
            fk_categoryshoes: results[0].fk_categoryshoes,
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
                    price: row.store_price
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
            price: row.price
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
module.exports = {
    getAllShoesWithCharacteristicsAndPrices,
    getShoeWithCharacteristicsAndPricesById,
    getShoesByBrand,
    getShoesByStore,
    getAllShoesWithDetails
};