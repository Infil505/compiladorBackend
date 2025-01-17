const Pregunta = require('../models/Pregunta'); // Ajusta la ruta según tu estructura

const preguntaController = {
  // Crear una nueva pregunta
  async crearPregunta(req, res) {
    try {
      const { pregunta, respuestaCorrecta, respuestasIncorrectas } = req.body;

      if (!pregunta || !respuestaCorrecta || !Array.isArray(respuestasIncorrectas) || respuestasIncorrectas.length < 1 || respuestasIncorrectas.length > 3) {
        return res.status(400).json({ error: 'Datos inválidos. Verifica el formato y la cantidad de respuestas incorrectas.' });
      }

      const nuevaPregunta = await Pregunta.create({
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

  // Obtener una pregunta por ID
  async obtenerPreguntaPorId(req, res) {
    try {
      const { id } = req.params;

      const pregunta = await Pregunta.findByPk(id);

      if (!pregunta) {
        return res.status(404).json({ error: 'Pregunta no encontrada' });
      }

      res.status(200).json(pregunta);
    } catch (error) {
      console.error('Error al obtener la pregunta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Obtener todas las preguntas
  async obtenerTodasLasPreguntas(req, res) {
    try {
      const preguntas = await Pregunta.findAll();
      res.status(200).json(preguntas);
    } catch (error) {
      console.error('Error al obtener las preguntas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Actualizar una pregunta por ID
  async actualizarPregunta(req, res) {
    try {
      const { id } = req.params;
      const { pregunta, respuestaCorrecta, respuestasIncorrectas } = req.body;

      const preguntaExistente = await Pregunta.findByPk(id);

      if (!preguntaExistente) {
        return res.status(404).json({ error: 'Pregunta no encontrada' });
      }

      if (respuestasIncorrectas && (!Array.isArray(respuestasIncorrectas) || respuestasIncorrectas.length < 1 || respuestasIncorrectas.length > 3)) {
        return res.status(400).json({ error: 'Datos inválidos. Verifica la cantidad de respuestas incorrectas.' });
      }

      const preguntaActualizada = await preguntaExistente.update({
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

  // Eliminar una pregunta por ID
  async eliminarPregunta(req, res) {
    try {
      const { id } = req.params;

      const pregunta = await Pregunta.findByPk(id);

      if (!pregunta) {
        return res.status(404).json({ error: 'Pregunta no encontrada' });
      }

      await pregunta.destroy();
      res.status(200).json({ message: 'Pregunta eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la pregunta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

module.exports = preguntaController;
