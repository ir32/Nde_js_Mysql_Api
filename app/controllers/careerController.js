const CareerModel = require('../models/careerModel');

class CareerController {
    async dreamJob(req, res) {
        try {
            const careerModel = new CareerModel();
            const jobs = await careerModel.getAllJobs();
            res.status(200).json({ jobs });
        } catch (error) {
            console.error('Error getting job items:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = CareerController;
