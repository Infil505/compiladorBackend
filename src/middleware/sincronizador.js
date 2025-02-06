const sequelize = require('../config/sequelize');
const Usuario = require('../services/user_service');
const Pregunta = require('../models/preguntas');
const Tutoria = require('../models/tutoria');
const Area = require('../models/area');
const Estatus = require('../models/estatus');
const relaciones = require('../models/relaciones');
const TutoriaEstudiantes = require('../models/tutoriaEstudiantes');
const Asistencia = require('../models/asistencia');
const RevokedToken = require('../models/token_revocados');

async function syncModels() {
  try {
    console.log('Iniciando la sincronización de modelos...');

    await sequelize.sync({ force: true });
    console.log('Modelos sincronizados con la base de datos.');

    // Crear usuarios
    const [usuarioTutor1, usuarioTutor2, usuarioEstudiante1, usuarioEstudiante2] = await Promise.all([
      Usuario.createUser({
        correo: 'juan.perez@est.com',
        password: '5714570p',
        nombre: 'Darwin Silva',
        tipoDeUsuario: 'tutor',
      }),
      Usuario.createUser({
        correo: 'ana.garcia@est.com',
        password: '87654321',
        nombre: 'Ana García',
        tipoDeUsuario: 'tutor',
      }),
      Usuario.createUser({
        correo: 'maria.lopez@est.com',
        password: '12345678',
        nombre: 'Maria Lopez',
        tipoDeUsuario: 'estudiante',
      }),
      Usuario.createUser({
        correo: 'pedro.sanchez@est.com',
        password: '23456789',
        nombre: 'Pedro Sánchez',
        tipoDeUsuario: 'estudiante',
      }),
    ]);

    console.log('Usuarios creados correctamente.');

    // Crear tutorías
      const [tutoria1, tutoria2] = await Promise.all([
          Tutoria.create({
              tutor: usuarioTutor1.correo,
              nombre: 'Introducción al Cálculo',
              descripcion: 'Curso básico de cálculo diferencial',
              fechaInicio: new Date('2025-02-01'),
              fechaFin: new Date('2025-06-30'),
              cupos: 5
          }),
          Tutoria.create({
              tutor: usuarioTutor2.correo,
              nombre: 'Física Básica',
              descripcion: 'Fundamentos de física',
              fechaInicio: new Date('2025-02-01'),
              fechaFin: new Date('2025-06-30'),
              cupos: 5
          })
      ]);
  
    // Crear registros de asistencia
    await Promise.all([
      Asistencia.create({
        tutoriaId: tutoria2.codigo,
        estudianteCorreo: usuarioEstudiante1.correo,
        fecha: new Date('2025-02-01'),
        presente: true,
      }),
      Asistencia.create({
        tutoriaId: tutoria2.codigo,
        estudianteCorreo: usuarioEstudiante2.correo,
        fecha: new Date('2025-02-01'),
        presente: false,
      })
    ]);

    console.log('Registros de asistencia creados correctamente.');

     // Crear áreas de estudio
     const [areaMath, areaScience] = await Promise.all([
      Area.create({
        nombre: 'Matemáticas',
        descripcion: 'Área enfocada en cálculos y lógica matemática.',
        tutoriaId: tutoria1.codigo,
        nEvluacion: 1,
      }),
      Area.create({
        nombre: 'Ciencias',
        descripcion: 'Área enfocada en la exploración del mundo natural.',
        tutoriaId: tutoria2.codigo,
        nEvluacion: 1,
      })
    ]);

    console.log('Áreas creadas correctamente.');


    // Asociar estatus con estudiantes y áreas
    const [estatus1, estatus2, estatus3] = await Promise.all([
      Estatus.create({
        usuarioCorreo: usuarioEstudiante1.correo,
        nota: 85,
        areaId: areaMath.id,
      }),
      Estatus.create({
        usuarioCorreo: usuarioEstudiante1.correo,
        nota: 90,
        areaId: areaScience.id,
      }),
      Estatus.create({
        usuarioCorreo: usuarioEstudiante2.correo,
        nota: 92,
        areaId: areaMath.id,
      })
    ]);

    console.log('Estatus creados correctamente.');

    
    // Crear relaciones estudiantes-tutorías
    await Promise.all([
      TutoriaEstudiantes.create({
        tutoriaId: tutoria1.codigo,
        estudianteCorreo: usuarioEstudiante1.correo,
        estatusId: estatus1.id,
      }),
      TutoriaEstudiantes.create({
        tutoriaId: tutoria1.codigo,
        estudianteCorreo: usuarioEstudiante2.correo,
        estatusId: estatus2.id,
      }),
      TutoriaEstudiantes.create({
        tutoriaId: tutoria2.codigo,
        estudianteCorreo: usuarioEstudiante1.correo,
        estatusId: estatus3.id,
      })
    ]);

    console.log('Relaciones tutorías-estudiantes creadas correctamente.');

    // Crear preguntas de ejemplo
    await Promise.all([
      Pregunta.create({
        pregunta: '¿Qué es Sequelize?',
        respuestaCorrecta: 'Es un ORM para Node.js.',
        respuestasIncorrectas: [
          'Una base de datos',
          'Un framework',
          'Un lenguaje de programación',
        ],
        areaId: 2,
      }),
      Pregunta.create({
        pregunta: '¿Qué es una relación many-to-many?',
        respuestaCorrecta: 'Una relación donde múltiples registros se relacionan con múltiples registros.',
        respuestasIncorrectas: [
          'Una relación uno a uno',
          'Una relación uno a muchos',
          'Un tipo de base de datos',
        ],
        areaId: 1,
      })
    ]);

    console.log('Preguntas creadas correctamente.');
    console.log('Todos los datos de ejemplo fueron creados exitosamente.');

  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
    throw error;
  } finally {
    await sequelize.close();
    console.log('Conexión a la base de datos cerrada.');
  }
}

// Ejecutar la función de sincronización solo si el script es ejecutado directamente
if (require.main === module) {
  syncModels().catch(console.error);
}

module.exports = syncModels;