const credentialModel = require('./models/credentialModels'); // Ajusta la ruta según corresponda

const username = 'testuser1';
const password = 'testpassword1';
const fk_user = 1; // Asegúrate de usar un valor válido para fk_user

credentialModel.createCredential(username, password, fk_user, (err, result) => {
  if (err) {
    console.error('Error al crear la credencial:', err);
  } else {
    console.log('Credencial creada con éxito:', result);
  }
});