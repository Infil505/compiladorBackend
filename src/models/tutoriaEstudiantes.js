// Modelo para la tabla intermedia TutoriaEstudiantes
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');

class TutoriaEstudiantes extends Model {}

TutoriaEstudiantes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        tutoriaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tutorias',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        estudianteCorreo: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'correo'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        estatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'estatus',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    {
        sequelize,
        modelName: 'TutoriaEstudiantes',
        tableName: 'tutoria_estudiantes',
        timestamps: true,
    }
);

module.exports = TutoriaEstudiantes;