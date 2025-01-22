const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');

class Estatus extends Model {}

Estatus.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nota: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        usuarioCorreo: { 
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'usuarios',  
                key: 'correo',  
            },
            onDelete: 'CASCADE',  
            onUpdate: 'CASCADE',
        },
        areaId: {  
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'areas', 
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: 'Estatus',
        tableName: 'estatus',
        timestamps: true,
    }
);

module.exports = Estatus;
