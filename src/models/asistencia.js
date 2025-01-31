const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');

class Asistencia extends Model {}

Asistencia.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        presente: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Asistencia',
        tableName: 'asistencias',
        timestamps: true,
    }
);

module.exports = Asistencia;
