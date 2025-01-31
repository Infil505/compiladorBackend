const Tutoria = require('../models/tutoria');

class TutoriaService {
    async getAllTutorias() {
        try {
            const tutorias = await Tutoria.find();
            return tutorias;
        } catch (error) {
            throw new Error('Error fetching tutorias: ' + error.message);
        }
    }

    async getTutoriaById(id) {
        try {
            const tutoria = await Tutoria.findById(id);
            if (!tutoria) {
                throw new Error('Tutoria not found');
            }
            return tutoria;
        } catch (error) {
            throw new Error('Error fetching tutoria: ' + error.message);
        }
    }

    async createTutoria(tutoriaData) {
        try {
            const newTutoria = new Tutoria(tutoriaData);
            await newTutoria.save();
            return newTutoria;
        } catch (error) {
            throw new Error('Error creating tutoria: ' + error.message);
        }
    }

    async updateTutoria(id, tutoriaData) {
        try {
            const updatedTutoria = await Tutoria.findByIdAndUpdate(id, tutoriaData, { new: true });
            if (!updatedTutoria) {
                throw new Error('Tutoria not found');
            }
            return updatedTutoria;
        } catch (error) {
            throw new Error('Error updating tutoria: ' + error.message);
        }
    }

    async deleteTutoria(id) {
        try {
            const deletedTutoria = await Tutoria.findByIdAndDelete(id);
            if (!deletedTutoria) {
                throw new Error('Tutoria not found');
            }
            return deletedTutoria;
        } catch (error) {
            throw new Error('Error deleting tutoria: ' + error.message);
        }
    }
}

module.exports = new TutoriaService();