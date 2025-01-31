const Usuario = require('./usuario');
const Estatus = require('./estatus');
const Area = require('./area');
const Tutoria = require('./tutoria');
const TutoriaEstudiantes = require('./tutoriaEstudiantes');
const Asistencia = require('./asistencia');


// En tu archivo de relaciones
Area.belongsToMany(Tutoria, {
    through: 'AreaTutoria',
    foreignKey: 'areaId',
    otherKey: 'tutoriaId',
        onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Tutoria.belongsToMany(Area, {
    through: 'AreaTutoria',
    foreignKey: 'tutoriaId',
    otherKey: 'areaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Relaciones con Usuario
Tutoria.belongsTo(Usuario, {
    foreignKey: 'tutor',
});

Usuario.hasMany(Tutoria, {
    foreignKey: 'tutorCorreo',
    sourceKey: 'correo',
    as: 'tutoriasImpartidas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Relación estudiantes-tutoría (many-to-many)
Tutoria.belongsToMany(Usuario, {
    through: TutoriaEstudiantes,
    foreignKey: 'tutoriaId',
    otherKey: 'estudianteCorreo',
    as: 'estudiantes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Usuario.belongsToMany(Tutoria, {
    through: TutoriaEstudiantes,
    foreignKey: 'estudianteCorreo',
    otherKey: 'tutoriaId',
    as: 'tutoriasInscritas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Relaciones con Estatus
TutoriaEstudiantes.belongsTo(Estatus, {
    foreignKey: 'estatusId',
    as: 'estatus'
});

Estatus.hasMany(TutoriaEstudiantes, {
    foreignKey: 'estatusId',
    as: 'tutoriasEstudiantes'
});

// Relación con Tutoria
Asistencia.belongsTo(Tutoria, {
    foreignKey: 'tutoriaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Relación con Usuario
Asistencia.belongsTo(Usuario, {
    foreignKey: 'estudianteCorreo',
    targetKey: 'correo',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Tutoria.hasMany(Asistencia, {
    foreignKey: 'tutoriaId'
});

Usuario.hasMany(Asistencia, {
    foreignKey: 'estudianteCorreo'
});