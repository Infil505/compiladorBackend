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

    async getAsistenciabyId (id) {
        try {
            return await Asistencia.findByPk(id);
        } catch (error) {
            throw new Error('Error fetching Asistencia by id ' + id)
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
            
        }
    }
}

module.exports = new AsistenciaService();