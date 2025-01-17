const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la instancia de Sequelize para PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST || 'localhost', 
    dialect: 'postgres', 
    port: process.env.DB_PORT || 5432, 
    logging: false, 
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión con PostgreSQL establecida exitosamente.');
  } catch (error) {
    console.error('No se pudo conectar con la base de datos:', error);
  }
}

testConnection();

module.exports = sequelize;
