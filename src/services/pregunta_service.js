const Pregunta = require('../models/Pregunta');

class PreguntaService {
    static async crearPregunta(data) {
        try {
            const { pregunta, respuestaCorrecta, respuestasIncorrectas, area } = data;
            if (!pregunta || !respuestaCorrecta || !Array.isArray(respuestasIncorrectas) || respuestasIncorrectas.length < 1 || respuestasIncorrectas.length > 3 || !area) {
                throw new Error('Datos inválidos. Verifica el formato y la cantidad de respuestas incorrectas, además del área.');
            }
            return await Pregunta.create({ pregunta, respuestaCorrecta, respuestasIncorrectas, area });
        } catch (error) {
            console.error('Error al crear la pregunta:', error);
            throw new Error('Error al crear la pregunta.');
        }
    }

    static async obtenerPreguntaPorId(id) {
        try {
            const pregunta = await Pregunta.findByPk(id);
            if (!pregunta) {
                throw new Error('Pregunta no encontrada');
            }
            return pregunta;
        } catch (error) {
            console.error('Error al obtener la pregunta:', error);
            throw new Error('Error al obtener la pregunta.');
        }
    }

    static async obtenerTodasLasPreguntas() {
        try {
            return await Pregunta.findAll();
        } catch (error) {
            console.error('Error al obtener todas las preguntas:', error);
            throw new Error('Error al obtener todas las preguntas.');
        }
    }

    static async obtenerPreguntasPorArea(area) {
        try {
            const preguntas = await Pregunta.findAll({ where: { area } });
            if (preguntas.length === 0) {
                throw new Error('No se encontraron preguntas para el área especificada');
            }
            return preguntas;
        } catch (error) {
            console.error('Error al obtener preguntas por área:', error);
            throw new Error('Error al obtener preguntas por área.');
        }
    }

    static async actualizarPregunta(id, data) {
        try {
            const { pregunta, respuestaCorrecta, respuestasIncorrectas, area } = data;
            const preguntaExistente = await Pregunta.findByPk(id);
            if (!preguntaExistente) {
                throw new Error('Pregunta no encontrada');
            }
            if (respuestasIncorrectas && (!Array.isArray(respuestasIncorrectas) || respuestasIncorrectas.length < 1 || respuestasIncorrectas.length > 3)) {
                throw new Error('Datos inválidos. Verifica la cantidad de respuestas incorrectas.');
            }
            return await preguntaExistente.update({ pregunta, respuestaCorrecta, respuestasIncorrectas, area });
        } catch (error) {
            console.error('Error al actualizar la pregunta:', error);
            throw new Error('Error al actualizar la pregunta.');
        }
    }

    static async eliminarPregunta(id) {
        try {
            const pregunta = await Pregunta.findByPk(id);
            if (!pregunta) {
                throw new Error('Pregunta no encontrada');
            }
            await pregunta.destroy();
            return { message: 'Pregunta eliminada exitosamente' };
        } catch (error) {
            console.error('Error al eliminar la pregunta:', error);
            throw new Error('Error al eliminar la pregunta.');
        }
    }
}

module.exports = PreguntaService;
