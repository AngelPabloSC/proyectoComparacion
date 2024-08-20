// consultas/shoesQueries.js

const GET_ALL_SHOES_WITH_CHARACTERISTICS_AND_PRICES = `
  SELECT s.shoe_id, s.name AS shoe_name, s.brand_id, s.image_url, s.fk_categoryshoes,
         sc.fk_characteristics AS characteristic_id, c.name AS characteristic_name, sc.value,
         st.price AS store_price
  FROM zdzkxer8m5jmvjms.shoes s
  LEFT JOIN zdzkxer8m5jmvjms.shoescharacteris sc ON s.shoe_id = sc.fk_shoes
  LEFT JOIN zdzkxer8m5jmvjms.characteristics c ON sc.fk_characteristics = c.characteristic_id
  LEFT JOIN zdzkxer8m5jmvjms.storeShoes st ON s.shoe_id = st.fk_shoes
`;

const GET_SHOE_WITH_CHARACTERISTICS_AND_PRICES_BY_ID = `
    SELECT 
    s.shoe_id, 
    s.name AS shoe_name, 
    s.image_url, 
    b.name AS brand_name,  -- Nombre de la marca
    c2.name AS category_name,  -- Nombre de la categoría
    sc.fk_characteristics AS characteristic_id, 
    c.name AS characteristic_name, 
    sc.value,
    st.price AS store_price,
    st2.name AS store_name  -- Nombre de la tienda
FROM 
    shoes s
LEFT JOIN 
    zdzkxer8m5jmvjms.shoescharacteris sc ON s.shoe_id = sc.fk_shoes
LEFT JOIN 
    zdzkxer8m5jmvjms.characteristics c ON sc.fk_characteristics = c.characteristic_id
LEFT JOIN 
    zdzkxer8m5jmvjms.storeShoes st ON s.shoe_id = st.fk_shoes
LEFT JOIN 
    zdzkxer8m5jmvjms.store st2 ON st.fk_store = st2.store_id
LEFT JOIN 
    zdzkxer8m5jmvjms.brands b ON s.brand_id = b.brand_id  -- Nombre de la marca
LEFT JOIN 
    zdzkxer8m5jmvjms.categories c2 ON s.fk_categoryshoes = c2.category_id  -- Nombre de la categoría
WHERE 
    s.shoe_id = ?;
`;

// queries/shoesQueries.js

const GET_SHOES_BY_BRAND = `
  SELECT s.shoe_id, s.name AS shoe_name, b.name AS brand_name
  FROM zdzkxer8m5jmvjms.shoes s
  JOIN zdzkxer8m5jmvjms.brands b ON s.brand_id = b.brand_id
  WHERE s.brand_id = ?
  LIMIT 0, 1000;
`;

const GET_SHOES_BY_STORE = `
  SELECT 
    s.shoe_id, 
    s.name AS shoe_name, 
    b.name AS brand_name, 
    s.image_url, 
    ss.price,
    st.name AS store_name  -- Agregado el nombre de la tienda
FROM 
    shoes s
JOIN 
    storeShoes ss ON s.shoe_id = ss.fk_shoes
JOIN 
    store st ON ss.fk_store = st.store_id
JOIN
    brands b ON s.brand_id = b.brand_id
WHERE 
    st.store_id = ?
LIMIT 0, 1000;
`;

// queries/shoesQueries.js

const GET_ALL_SHOES_WITH_DETAILS = `
  SELECT 
    s.shoe_id, 
    s.name AS shoe_name, 
    b.name AS brand_name, 
    s.image_url, 
    c.name AS category_name, 
    ss.price,
    st.name AS store_name
  FROM 
    shoes s
  JOIN 
    brands b 
    ON s.brand_id = b.brand_id
  LEFT JOIN 
    categories c 
    ON s.fk_categoryshoes = c.category_id
  LEFT JOIN 
    storeShoes ss 
    ON s.shoe_id = ss.fk_shoes
  LEFT JOIN 
    store st 
    ON ss.fk_store = st.store_id;
`;

const FETCH_USER_CATEGORIES_DETAILS = `
  SELECT 
    c.name AS category_name, 
    u.id_user, 
    u.name AS user_name
  FROM 
    categories c
  JOIN 
    user u 
    ON u.fk_category_user = c.category_id
  WHERE 
    u.id_user = ?;
`;

const FETCH_USER_SHOES_HISTORY = `
  SELECT 
    sh.image_url, 
    sh.name AS shoe_name, 
    uh.date AS consultation_date 
  FROM 
    history_user uh
  JOIN 
    shoes sh 
    ON uh.fk_shoes = sh.shoe_id
  WHERE 
    uh.fk_user = ?;
`;
module.exports = {

  
  GET_ALL_SHOES_WITH_CHARACTERISTICS_AND_PRICES,
  GET_SHOE_WITH_CHARACTERISTICS_AND_PRICES_BY_ID,
  GET_SHOES_BY_BRAND,
  GET_SHOES_BY_STORE,
  GET_ALL_SHOES_WITH_DETAILS,
  FETCH_USER_CATEGORIES_DETAILS,
  FETCH_USER_SHOES_HISTORY

};