// consultas/shoesQueries.js

const GET_ALL_SHOES_WITH_CHARACTERISTICS_AND_PRICES = `
  SELECT s.shoe_id, s.name AS shoe_name, s.brand_id, s.image_url, s.fk_categoryshoes,
         sc.fk_characteristics AS characteristic_id, c.name AS characteristic_name, sc.value,
         st.price AS store_price
  FROM nv5pkm6bo5v2qwpu.shoes s
  LEFT JOIN nv5pkm6bo5v2qwpu.shoescharacteris sc ON s.shoe_id = sc.fk_shoes
  LEFT JOIN nv5pkm6bo5v2qwpu.characteristics c ON sc.fk_characteristics = c.characteristic_id
  LEFT JOIN nv5pkm6bo5v2qwpu.storeShoes st ON s.shoe_id = st.fk_shoes
`;

const GET_SHOE_WITH_CHARACTERISTICS_AND_PRICES_BY_ID = `
  SELECT s.shoe_id, s.name AS shoe_name, s.brand_id, s.image_url, s.fk_categoryshoes,
         sc.fk_characteristics AS characteristic_id, c.name AS characteristic_name, sc.value,
         st.price AS store_price
  FROM nv5pkm6bo5v2qwpu.shoes s
  LEFT JOIN nv5pkm6bo5v2qwpu.shoescharacteris sc ON s.shoe_id = sc.fk_shoes
  LEFT JOIN nv5pkm6bo5v2qwpu.characteristics c ON sc.fk_characteristics = c.characteristic_id
  LEFT JOIN nv5pkm6bo5v2qwpu.storeShoes st ON s.shoe_id = st.fk_shoes
  WHERE s.shoe_id = ?
`;

// queries/shoesQueries.js

const GET_SHOES_BY_BRAND = `
  SELECT s.shoe_id, s.name AS shoe_name, b.name AS brand_name
  FROM nv5pkm6bo5v2qwpu.shoes s
  JOIN nv5pkm6bo5v2qwpu.brands b ON s.brand_id = b.brand_id
  WHERE s.brand_id = ?
  LIMIT 0, 1000;
`;



module.exports = {
  GET_ALL_SHOES_WITH_CHARACTERISTICS_AND_PRICES,
  GET_SHOE_WITH_CHARACTERISTICS_AND_PRICES_BY_ID,
  GET_SHOES_BY_BRAND
};