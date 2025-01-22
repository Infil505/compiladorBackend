const sequelize = require('../config/sequelize');
const Usuario = require('../services/user_service');
const Pregunta = require('../models/preguntas');
const Relaciones = require('../models/relaciones');
const Area = require('../models/area');
const Estatus = require('../models/estatus');

async function syncModels() {
  try {
    console.log('Iniciando la sincronización de modelos...');

    await sequelize.sync({ force: true });
    console.log('Modelos sincronizados con la base de datos.');

    // Crear usuarios
    const [usuarioTutor, usuarioEstudiante] = await Promise.all([
      Usuario.createUser({
        correo: 'juan.perez@est.com',
        password: '5714570p',
        nombre: 'Darwin Silva',
        tipoDeUsuario: 'tutor',
      }),
      Usuario.createUser({
        correo: 'maria.lopez@est.com',
        password: '12345678',
        nombre: 'Maria Lopez',
        tipoDeUsuario: 'estudiante',
      }),
    ]);

    console.log('Usuarios creados correctamente.');

    // Crear áreas de estudio
    const areaMath = await Area.create({
      nombre: 'Matemáticas',
      descripcion: 'Área enfocada en cálculos y lógica matemática.',
    });

    const areaScience = await Area.create({
      nombre: 'Ciencias',
      descripcion: 'Área enfocada en la exploración del mundo natural.',
    });

    console.log('Áreas creadas correctamente.');

    // Asociar el usuario estudiante con estatus en diferentes áreas
    await Promise.all([
      Estatus.create({
        usuarioCorreo: usuarioEstudiante.correo,
        nota: 85,
        areaId: areaMath.id,
      }),
      Estatus.create({
        usuarioCorreo: usuarioEstudiante.correo,
        nota: 90,
        areaId: areaScience.id,
      }),
    ]);

    console.log('Estatus creados correctamente.');

    // Crear preguntas de ejemplo
    await Pregunta.create({
      pregunta: '¿Qué es Sequelize?',
      respuestaCorrecta: 'Es un ORM para Node.js.',
      respuestasIncorrectas: [
        'Una base de datos',
        'Un framework',
        'Un lenguaje de programación',
      ],
    });

    console.log('Datos de ejemplo creados correctamente.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error.message);
  } finally {
    // Cerrar la conexión a la base de datos para evitar conexiones abiertas
    await sequelize.close();
    console.log('Conexión a la base de datos cerrada.');
  }
}

// Ejecutar la función de sincronización solo si el script es ejecutado directamente
if (require.main === module) {
  syncModels();
}

module.exports = syncModels;
