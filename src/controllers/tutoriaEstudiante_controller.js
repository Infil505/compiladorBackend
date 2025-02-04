const tutoriaEstudianteService = require('../services/tutoriaEstudiante_service');

class TutoriaEstudianteController {
    
    // Crear una nueva relación Tutoria-Estudiante
    static async createTutoriaEstudiante(req, res) {
        try {
            const newTutoriaEstudiante = await tutoriaEstudianteService.createTutoriaEstudiante(req.body);
            res.status(201).json(newTutoriaEstudiante);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Obtener una relación Tutoria-Estudiante por ID
    static async getTutoriaEstudianteById(req, res) {
        try {
            const tutoriaEstudiante = await tutoriaEstudianteService.getTutoriaEstudianteById(req.params.id);
            res.status(200).json(tutoriaEstudiante);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // Actualizar una relación Tutoria-Estudiante por ID
    static async updateTutoriaEstudiante(req, res) {
        try {
            const updatedTutoriaEstudiante = await tutoriaEstudianteService.updateTutoriaEstudiante(req.params.id, req.body);
            res.status(200).json(updatedTutoriaEstudiante);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // Eliminar una relación Tutoria-Estudiante por ID
    static async deleteTutoriaEstudiante(req, res) {
        try {
            await tutoriaEstudianteService.deleteTutoriaEstudiante(req.params.id);
            res.status(200).json({ message: 'TutoriaEstudiante eliminada exitosamente' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = TutoriaEstudianteController;
