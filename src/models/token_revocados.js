const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js'); 

class RevokedToken extends Model {}

RevokedToken.init({  
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
},   {
    sequelize, 
    modelName: 'TokenRevocado',
    tableName: 'tokens_revocados',
    timestamps: false,
  });

module.exports = RevokedToken;
