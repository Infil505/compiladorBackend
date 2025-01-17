const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de tener configurada tu conexión en este archivo

const Usuario = sequelize.define('Usuario', {
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoDeUsuario: {
    type: DataTypes.ENUM('tutor', 'estudiante', 'administrador'), // Ajusta los valores según tus necesidades
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'usuarios', // Nombre de la tabla en la base de datos
});

module.exports = Usuario;
