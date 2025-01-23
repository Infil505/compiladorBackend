const Estatus = require('../models/estatus');

class EstatusService {
    async getAllEstatus() {
        try {
            return await Estatus.findAll();
        } catch (error) {
            throw new Error('Error fetching estatus');
        }
    }

    async getEstatusById(id) {
        try {
            return await Estatus.findByPk(id);
        } catch (error) {
            throw new Error('Error fetching estatus by id');
        }
    }

    async createEstatus(data) {
        try {
            const newEstatus = new Estatus(data);
            return await Estatus.create(newEstatus);
        } catch (error) {
            throw new Error('Error creating estatus');
        }
    }

    async updateEstatus(id, data) {
        try {
            return await Estatus.update(id, data, { new: true });
        } catch (error) {
            throw new Error('Error updating estatus');
        }
    }

    async deleteEstatus(id) {
        try {
            return await Estatus.destroy(id);
        } catch (error) {
            throw new Error('Error deleting estatus');
        }
    }
}

module.exports = new EstatusService();