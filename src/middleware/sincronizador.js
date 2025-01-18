const sequelize = require('../config/sequelize'); // Configuración de Sequelize
const Usuario = require('../services/userService'); // Modelo Usuario
const Pregunta = require('../models/preguntas'); // Modelo Pregunta
const { Model } = require('sequelize');
 // Modelo Usuario (sin relación con Pregunta)

async function syncModels() {
  try {
    // Sincronizar todos los modelos con la base de datos
    await sequelize.sync({ force: true }); // Usa `force: false` en producción
    console.log('Modelos sincronizados con la base de datos.');

    // Crear datos de ejemplo para verificar que la sincronización fue exitosa
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