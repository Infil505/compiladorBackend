const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js'); 

class Pregunta extends Model {}

Pregunta.init(
  {
    pregunta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    respuestaCorrecta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    respuestasIncorrectas: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
      allowNull: false,
      validate: {
        len: [3],
      },
    },
  },
  {
    sequelize, 
    modelName: 'Pregunta',
    tableName: 'preguntas',
    timestamps: false,
  }
);

module.exports = Pregunta;
