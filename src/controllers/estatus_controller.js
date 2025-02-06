const EstatusService = require('../services/estatus_service');

class EstatusController{

    // Get all estatus
static async getAllEstatus  (res) {
    try {
        const estatus = await EstatusService.getAllEstatus();
        res.status(200).json(estatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get estatus by UsuarioCorreo
static async getEstatusByUsuarioCorreo(req, res) {
    try {
        const { usuarioCorreo } = req.params;
        const estatus = await EstatusService.getEstatusByUsuarioCorreo(usuarioCorreo);
        if (!estatus) return res.status(404).json({ message: 'Estatus no encontrado para el usuario' });
        res.status(200).json(estatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get estatus by areaId
static async getEstatusByAreaId(req, res) {
    try {
        const { areaId } = req.params;
        const estatus = await EstatusService.getEstatusByAreaId(areaId);
        if (!estatus) return res.status(404).json({ message: 'Estatus no encontrado para el area' });
        res.status(200).json(estatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create new estatus
static async createEstatus  (req, res)  {
    try {
        const newEstatus = await EstatusService.createEstatus(req.body);
        res.status(201).json(newEstatus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update estatus
static async updateEstatus  (req, res)  {
    try {
        const updatedEstatus = await EstatusService.updateEstatus(req.params.id, req.body);
        if (!updatedEstatus) return res.status(404).json({ message: 'Estatus not found' });
        res.status(200).json(updatedEstatus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete estatus
static async deleteEstatus  (req, res)  {
    try {
        const deletedEstatus = await EstatusService.deleteEstatus(req.params.id);
        if (!deletedEstatus) return res.status(404).json({ message: 'Estatus not found' });
        res.status(200).json({ message: 'Estatus deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

}

module.exports = EstatusController;