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
            return await Estatus.create(data);
        } catch (error) {
            throw new Error('Error creating estatus');
        }
    }

    async getEstatusByUsuarioCorreo(usuarioCorreo) {
        try {
            return await Estatus.findAll({ where: { usuarioCorreo } });
        } catch (error) {
            throw new Error('Error fetching estatus by usuarioCorreo');
        }
    }

    async getEstatusByAreaId(areaId) {
        try {
            return await Estatus.findAll({ where: { areaId } });
        } catch (error) {
            throw new Error('Error fetching estatus by areaId');
        }
    }

    async updateEstatus(id, data) {
        try {
            const [affectedRows] = await Estatus.update(data, { where: { id } });
            if (affectedRows === 0) {
                throw new Error('No se encontró el estatus para actualizar');
            }
            return await this.getEstatusById(id);
        } catch (error) {
            throw new Error('Error updating estatus: ' + error.message);
        }
    }
    

    async deleteEstatus(id) {
        try {
            const deletedCount = await Estatus.destroy({ where: { id } });
            if (deletedCount === 0) {
                throw new Error('No se encontró el estatus para eliminar');
            }
            return { message: 'Estatus eliminado correctamente' };
        } catch (error) {
            throw new Error('Error deleting estatus: ' + error.message);
        }
    }
    
}

module.exports = new EstatusService();