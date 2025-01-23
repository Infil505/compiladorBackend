const Area = require('../models/area');

class AreaService {
    async createArea(areaData) {
        try {
            const area = new Area(areaData);
            await Area.create(area);
            return area;
        } catch (error) {
            throw new Error('Error creating area: ' + error.message);
        }
    }

    async getAreaById(areaId) {
        try {
            const area = await Area.findByPk(areaId);
            if (!area) {
                throw new Error('Area not found');
            }
            return area;
        } catch (error) {
            throw new Error('Error fetching area: ' + error.message);
        }
    }

    async updateArea(areaId, areaData) {
        try {
            const area = await Area.update(areaId, areaData, { new: true });
            if (!area) {
                throw new Error('Area not found');
            }
            return area;
        } catch (error) {
            throw new Error('Error updating area: ' + error.message);
        }
    }

    async deleteArea(areaId) {
        try {
            const area = await Area.destroy(areaId);
            if (!area) {
                throw new Error('Area not found');
            }
            return area;
        } catch (error) {
            throw new Error('Error deleting area: ' + error.message);
        }
    }

    async getAllAreas() {
        try {
            const areas = await Area.findAll;
            return areas;
        } catch (error) {
            throw new Error('Error fetching areas: ' + error.message);
        }
    }
}

module.exports = new AreaService();