const Asistencia = require('../models/asistencia');

class AsistenciaService {

    async getAllAsistencias(){
        try {
            return await Asistencia.findAll();
        } catch (error) {
            return new Error('Error fetching Asistencias')
        }
    }

    async createAsistencia (data) {
        try {
            return await Asistencia.create(data);
        } catch (error) {
            throw new Error('Error creating asistencia');
        }
    }

    async getAsistenciasByCorreo(estudianteCorreo) {
        try {
            return await Asistencia.findAll({
                where: { estudianteCorreo }
            });
        } catch (error) {
            throw new Error(`Error fetching Asistencias for estudianteCorreo: ${estudianteCorreo}`);
        }
    }

    async updateAsistencia (id) {
        try {
            const [affectedRows] = await Asistencia.update(data, {where: {id} });
            if(affectedRows === 0){
                throw new Error('No se encontro la Asistencia que trata de actualizar');
            }
            return await this.getAsistenciabyId(id);
        } catch (error) {
            throw new Error('Error updating Asistencia ' + error.message);
        }
    }

    async deleteAsistencia(id){
        try {
            const deleteCount = await Asistencia.destroy({where: {id} });
            if(deleteCount === 0){
                throw new Error('No se encontro ninguna asistencia con el id: ' + id);
            }
        } catch (error) {
            throw new Error('Error deleting Asistencia ' + error.message);
        }
    }
}

module.exports = new AsistenciaService();