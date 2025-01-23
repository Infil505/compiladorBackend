const estatusService = require('../services/estatus_service');

class estatusController{

    // Get all estatus
static async getAllEstatus  (req, res) {
    try {
        const estatus = await estatusService.getAllEstatus();
        res.status(200).json(estatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get estatus by ID
static async getEstatusById  (req, res)  {
    try {
        const estatus = await estatusService.getEstatusById(req.params.id);
        if (!estatus) return res.status(404).json({ message: 'Estatus not found' });
        res.status(200).json(estatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new estatus
static async createEstatus  (req, res)  {
    try {
        const newEstatus = await estatusService.createEstatus(req.body);
        res.status(201).json(newEstatus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update estatus
static async updateEstatus  (req, res)  {
    try {
        const updatedEstatus = await estatusService.updateEstatus(req.params.id, req.body);
        if (!updatedEstatus) return res.status(404).json({ message: 'Estatus not found' });
        res.status(200).json(updatedEstatus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete estatus
static async deleteEstatus  (req, res)  {
    try {
        const deletedEstatus = await estatusService.deleteEstatus(req.params.id);
        if (!deletedEstatus) return res.status(404).json({ message: 'Estatus not found' });
        res.status(200).json({ message: 'Estatus deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

}

module.exports = estatusController;