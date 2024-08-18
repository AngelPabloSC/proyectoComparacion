const bcrypt = require('bcryptjs');

// Contraseña original
const plainPassword = 'angel123'; // Reemplaza con la contraseña original

// Genera un nuevo hash
bcrypt.hash(plainPassword, 10, (err, newHash) => {
  if (err) {
    console.error('Error al generar el hash:', err);
    return;
  }
  console.log('Nuevo hash generado:', newHash);

  // Compara el nuevo hash con el hash almacenado
  bcrypt.compare(plainPassword, newHash, (err, isMatch) => {
    if (err) {
      console.error('Error al comparar el hash:', err);
      return;
    }
    console.log('¿El nuevo hash coincide?', isMatch); // Debería ser true
  });
});