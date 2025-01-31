const TutoriaEstudiante = require('../models/tutoriaEstudiantes')

class TutoriaEstudianteService {
    async createTutoriaEstudiante(data) {
        try {
            return await c.create(data);
        } catch (error) {
            throw new Error('Error creating TutoriaEstudiante: ' + error.message);
        }
    }

    async getTutoriaEstudianteById(id) {
        try {
            const tutoriaEstudiante = await TutoriaEstudiante.findByPk(id);
            if (!tutoriaEstudiante) {
                throw new Error('TutoriaEstudiante not found');
            }
            return tutoriaEstudiante;
        } catch (error) {
            throw new Error('Error fetching TutoriaEstudiante: ' + error.message);
        }
    }

    async updateTutoriaEstudiante(id, data) {
        try {
            const [affectedRows] = await TutoriaEstudiante.update(data, { where: { id } });
            if (affectedRows === 0) {
                throw new Error('TutoriaEstudiante not found');
            }
            return await this.getTutoriaEstudianteById(id);
        } catch (error) {
            throw new Error('Error updating TutoriaEstudiante: ' + error.message);
        }
    }

    async deleteTutoriaEstudiante(id) {
        try {
            const deletedCount = await TutoriaEstudiante.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new Error('TutoriaEstudiante not found');
            }
            return { message: 'TutoriaEstudiante deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting TutoriaEstudiante: ' + error.message);
        }
    }
}

module.exports = new TutoriaEstudianteService();