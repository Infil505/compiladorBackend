const tutoriaService = require('../services/tutoria_service');

class TutoriaController {
    
    // Obtener todas las tutorías
    static async getAllTutorias(req, res) {
        try {
            const tutorias = await tutoriaService.getAllTutorias();
            res.status(200).json(tutorias);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Obtener una tutoría por ID
    static async getTutoriaById(req, res) {
        try {
            const tutoria = await tutoriaService.getTutoriaById(req.params.id);
            res.status(200).json(tutoria);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // Crear una nueva tutoría
    static async createTutoria(req, res) {
        try {
            const newTutoria = await tutoriaService.createTutoria(req.body);
            res.status(201).json(newTutoria);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Actualizar una tutoría por ID
    static async updateTutoria(req, res) {
        try {
            const updatedTutoria = await tutoriaService.updateTutoria(req.params.id, req.body);
            res.status(200).json(updatedTutoria);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // Eliminar una tutoría por ID
    static async deleteTutoria(req, res) {
        try {
            await tutoriaService.deleteTutoria(req.params.id);
            res.status(200).json({ message: 'Tutoria eliminada exitosamente' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = TutoriaController;
