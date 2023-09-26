const entrance = require('../models/entranceModel');

class entranceController {
    async getAllEntrances(req, res) {
        try {
            const allEntrances = await entrance.getAllEntrances();
            res.json(allEntrances);
        } catch (error) {
            console.error('Error retrieving entrance data:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async createEntrance(req, res) {
        try {
            const { entrance_roll, obtain_marks, total_marks } = req.body;
            const entranceData = { entrance_roll, obtain_marks, total_marks };

            const entranceId = await entrance.createEntrance(entranceData);

            res.json({ message: 'Entrance data created successfully', entranceId });
        } catch (error) {
            console.error('Error creating entrance data:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = entranceController;
