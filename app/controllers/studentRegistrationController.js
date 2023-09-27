const student = require('../models/studentRegistrationModel');

class StudentRegistrationController { 
    async studentRegistration(req, res) { 
        try {
            const {
                first_name,
                last_name,
                date_of_birth,
                email,
                phone_number,
                address,
                program,
                graduation_year
            } = req.body;

            // Call the model function to insert data
            const result = await student.postData(
                first_name,
                last_name,
                date_of_birth,
                email,
                phone_number,
                address,
                program,
                graduation_year
            );

            res.json({ message: 'Student data inserted successfully', result });
        } catch (error) {
            console.error('Error inserting student data:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new StudentRegistrationController();
