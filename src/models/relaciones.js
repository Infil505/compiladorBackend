const Usuario = require('./usuario');
const Estatus = require('./estatus');
const Area = require('./area');


Usuario.hasMany(Estatus, {
    foreignKey: 'usuarioCorreo',
    sourceKey: 'correo',
    as: 'estatuses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Estatus.belongsTo(Usuario, {
    foreignKey: 'usuarioCorreo',
    targetKey: 'correo',
    as: 'usuario',
});

Area.hasMany(Estatus, {
    foreignKey: 'areaId',
    as: 'estatuses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Estatus.belongsTo(Area, {
    foreignKey: 'areaId',
    as: 'area',
});
