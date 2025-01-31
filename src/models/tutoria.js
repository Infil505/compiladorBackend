const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js'); 

class Tutoria extends Model {}

Tutoria.init({
    codigo: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
    },
    nombre: {
        type: DataTypes.STRING, 
        allowNull: false 
    },
    cupos: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    tutor:{
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'correo'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
},
{
    sequelize, 
    modelName: 'Tutoria',
    tableName: 'tutorias',
    timestamps: true,
}
);

module.exports = Tutoria;
