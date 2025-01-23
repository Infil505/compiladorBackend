const Area = require('../services/area_service');

class areaController {
    // Get all areas
    static async getAllAreas(req, res) {
        try {
            const areas = await Area.getAllAreas();
            res.status(200).json(areas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get area by ID
    static async getAreaById(req, res) {
        try {
            const area = await Area.getAreaById(req.params.id);
            if (!area) return res.status(404).json({ message: 'Area not found' });
            res.status(200).json(area);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Create a new area
    static async createArea(req, res) {
        const area = new Area(req.body);
        try {
            const newArea = await Area.createArea(area);
            res.status(201).json(newArea);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Update an area
    static async updateArea(req, res) {
        try {
            const updatedArea = await Area.updateArea(req.params.id, req.body, { new: true });
            if (!updatedArea) return res.status(404).json({ message: 'Area not found' });
            res.status(200).json(updatedArea);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Delete an area
    static async deleteArea(req, res) {
        try {
            const deletedArea = await Area.deleteArea(req.params.id);
            if (!deletedArea) return res.status(404).json({ message: 'Area not found' });
            res.status(200).json({ message: 'Area deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = areaController;
