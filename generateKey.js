const bcrypt = require('bcryptjs');

// Contraseña para probar
const plainPassword = 'angdsads2';

// Genera un hash para la contraseña
bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error al generar el hash:', err);
    return;
  }
  console.log('Hash generado:', hashedPassword);

  // Ahora verifica el hash
  bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
    if (err) {
      console.error('Error al comparar la contraseña:', err);
      return;
    }
    console.log('¿La contraseña coincide?', result); // Debería ser true
  });
});