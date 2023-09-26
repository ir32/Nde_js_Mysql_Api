const Admission = require('../models/admissionModel');

class AdmissionController {
  static async createAdmission(req, res) {
    try {
      const { name } = req.body;
      const image = req.file.path; // Assuming you're using a file upload middleware

      const admissionData = {
        name,
        image,
      };

      const admissionId = await Admission.createAdmission(admissionData);

      res.json({ message: 'Admission created successfully', admissionId });
    } catch (error) {
      console.error('Error creating admission:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async getAdmissions(req, res) {
    try {
      const admissions = await Admission.getAllAdmissions();
      res.json(admissions);
    } catch (error) {
      console.error('Error fetching admissions:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = AdmissionController;
