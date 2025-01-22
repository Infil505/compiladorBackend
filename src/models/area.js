const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');

class Area extends Model { }

Area.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Area',
        tableName: 'areas',
        timestamps: true,
    }
);

module.exports = Area;
