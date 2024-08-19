const bcrypt = require('bcryptjs');

// Hash de la contraseña almacenada en la base de datos
const storedHash = '$2a$10$yVX1RsBj6vVpXCPm1lysM.2juasH3IWSStGdnSOgCIbSZR/6jBhBy';

// Contraseña que estás intentando verificar
const plainPassword = 'angel123'; // Reemplaza esto con la contraseña que debería coincidir

bcrypt.compare(plainPassword, storedHash, (err, isMatch) => {
  if (err) {
    console.error('Error al comparar la contraseña:', err);
    return;
  }
  console.log('¿La contraseña coincide?', isMatch); // Debería ser true si la contraseña coincide
});
