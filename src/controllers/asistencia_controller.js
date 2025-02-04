const AsistenciaService = require('../services/asistencia_service');

class AsistenciaController {
    static async getAllAsistencias(res) {
        try {
            const asistencias = await AsistenciaService.getAllAsistencias();
            res.json(asistencias);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createAsistencia(req, res) {
        try {
            const nuevaAsistencia = await AsistenciaService.createAsistencia(req.body);
            res.status(201).json(nuevaAsistencia);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAsistenciasByCorreo(req, res) {
        try {
            const { correo } = req.params;
            const asistencias = await AsistenciaService.getAsistenciasByCorreo(correo);
            if (!asistencias.length) {
                return res.status(404).json({ message: 'No se encontraron asistencias para este correo' });
            }
            res.json(asistencias);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateAsistencia(req, res) {
        try {
            const { id } = req.params;
            const updatedAsistencia = await AsistenciaService.updateAsistencia(id, req.body);
            res.json(updatedAsistencia);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteAsistencia(req, res) {
        try {
            const { id } = req.params;
            await AsistenciaService.deleteAsistencia(id);
            res.json({ message: 'Asistencia eliminada correctamente' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = AsistenciaController;