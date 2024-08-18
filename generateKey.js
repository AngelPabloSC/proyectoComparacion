const bcrypt = require('bcryptjs');

// Hash de la contraseña almacenada en la base de datos (debe ser la misma que se usa en producción)
const storedHash = '$2a$10$K4f3.UCF3WP3Qn2RI5XPdeyRM'; // Sustituye esto por el hash real de la base de datos

// Contraseña que estás intentando verificar
const plainPassword = 'angel123'; // Sustituye esto por la contraseña real

bcrypt.compare(plainPassword, storedHash, (err, result) => {
  if (err) {
    console.error('Error al comparar la contraseña:', err);
  } else {
    console.log('¿La contraseña coincide?', result); // Debería ser true si la contraseña coincide
  }
});


