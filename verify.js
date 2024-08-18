const credentialModel = require('./models/credentialModels'); // Ajusta la ruta según corresponda

const username = 'testuser';
const password = 'testpassword'; // Usa la contraseña que usaste al crear la credencial

credentialModel.verifyCredentials(username, password, (err, result) => {
  if (err) {
    console.error('Error al verificar las credenciales:', err);
  } else if (result) {
    console.log('Credenciales verificadas con éxito:', result);
  } else {
    console.log('Credenciales incorrectas');
  }
});