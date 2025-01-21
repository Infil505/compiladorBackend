const sequelize = require('../config/sequelize'); 
const Usuario = require('../services/user_service'); 
const Pregunta = require('../models/preguntas'); 


async function syncModels() {
  try {
    // Sincronizar todos los modelos con la base de datos
    await sequelize.sync({ force: true });
    console.log('Modelos sincronizados con la base de datos.');
    await Usuario.createUser({correo: 'juan.perez@est.com', password: '5714570p', nombre: 'Darwin Silva', tipoDeUsuario: 'tutor', });
    await Pregunta.create({
      pregunta: '¿Qué es Sequelize?',
      respuestaCorrecta: 'Es un ORM para Node.js.',
      respuestasIncorrectas: ['Una base de datos', 'Un framework', 'Un lenguaje de programación'],
    });

    console.log('Datos de ejemplo creados correctamente.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
}

syncModels();

module.exports = syncModels;