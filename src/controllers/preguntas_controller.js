const Pregunta = require('../services/pregunta_service'); 

const preguntaController = {
  async crearPregunta(req, res) {
    try {
      const { pregunta, respuestaCorrecta, respuestasIncorrectas } = req.body;

      if (!pregunta || !respuestaCorrecta || !Array.isArray(respuestasIncorrectas) || respuestasIncorrectas.length < 1 || respuestasIncorrectas.length > 3) {
        return res.status(400).json({ error: 'Datos inválidos. Verifica el formato y la cantidad de respuestas incorrectas.' });
      }

      const nuevaPregunta = await Pregunta.crearPregunta({
        pregunta,
        respuestaCorrecta,
        respuestasIncorrectas,
      });

      res.status(201).json(nuevaPregunta);
    } catch (error) {
      console.error('Error al crear la pregunta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async obtenerPreguntaPorId(req, res) {
    try {
      const { id } = req.params;

      const pregunta = await Pregunta.obtenerPreguntaPorId(id);

      if (!pregunta) {
        return res.status(404).json({ error: 'Pregunta no encontrada' });
      }

      res.status(200).json(pregunta);
    } catch (error) {
      console.error('Error al obtener la pregunta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async obtenerPreguntasPorArea(req, res) {
    try {
      const { area } = req.params;

      const preguntas = await Pregunta.obtenerPreguntasPorArea(area);

      if (preguntas.length === 0) {
        return res.status(404).json({ error: 'No se encontraron preguntas para el área especificada' });
      }

      res.status(200).json(preguntas);
    } catch (error) {
      console.error('Error al obtener preguntas por área:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async obtenerTodasLasPreguntas( res) {
    try {
      const preguntas = await Pregunta.obtenerTodasLasPreguntas();
      res.status(200).json(preguntas);
    } catch (error) {
      console.error('Error al obtener las preguntas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async actualizarPregunta(req, res) {
    try {
      const { id } = req.params;
      const { pregunta, respuestaCorrecta, respuestasIncorrectas } = req.body;

      const preguntaExistente = await Pregunta.obtenerPreguntaPorId(id);

      if (!preguntaExistente) {
        return res.status(404).json({ error: 'Pregunta no encontrada' });
      }

      if (respuestasIncorrectas && (!Array.isArray(respuestasIncorrectas) || respuestasIncorrectas.length < 1 || respuestasIncorrectas.length > 3)) {
        return res.status(400).json({ error: 'Datos inválidos. Verifica la cantidad de respuestas incorrectas.' });
      }

      const preguntaActualizada = await Pregunta.actualizarPregunta({
        pregunta,
        respuestaCorrecta,
        respuestasIncorrectas,
      });
      res.status(200).json(preguntaActualizada);
    } catch (error) {
      console.error('Error al actualizar la pregunta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async eliminarPregunta(req, res) {
    try {
      const { id } = req.params;

      const pregunta = await Pregunta.obtenerPreguntaPorId(id);

      if (!pregunta) {
        return res.status(404).json({ error: 'Pregunta no encontrada' });
      }

      await Pregunta.eliminarPregunta(id);
      res.status(200).json({ message: 'Pregunta eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la pregunta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

// aprender procediemientos almacenados en postgres para mejorar eficiencia de las consultas a la base de datos

module.exports = preguntaController;