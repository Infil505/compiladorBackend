const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js'); 

class Usuario extends Model {}

Usuario.init(
  {
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true, 
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
      type: DataTypes.ENUM('tutor', 'estudiante', 'administrador'),
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
  }
);

module.exports = Usuario;
