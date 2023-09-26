const Work = require('../models/workshopModel');

class WorkshopController {
    async getWork(req, res) {
        try {
          const allworkshop = await Work.getWorkshop();
          res.json(allworkshop);
        } catch (error) {
          console.error('Error retrieving Workshop data:', error);
          res.status(500).json({ message: 'Server error' });
        }
    }

    async submitWorkshop(req, res) {
        try {
            const { topic, date, location } = req.body;

            const submitdata = await Work.submit_workshop(topic, date, location);
            res.json({ message: 'Workshop submitted successfully' });
        } catch (error) {
            console.error('Error submitting workshop:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = WorkshopController;
