const sequelize = require('../sequelize');
const Pregunta = require('../models/preguntas');
const usuario = require('../models/usuario');

async function syncModels() {
  try {
    await sequelize.sync({ force: true }); // Usa force: true para desarrollo (elimina tablas existentes)
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
}

syncModels();