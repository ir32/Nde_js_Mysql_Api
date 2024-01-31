// const db = require('../config/database');
const Teacher = require('../models/teacherModel');

class TeacherController {
    async getTeachers(req, res) {
        try {
            const teachers = await Teacher.getTeachers();
            res.json(teachers);
        } catch (error) {
            console.error('Error retrieving teachers:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async createTeacher(req, res) {
        try {
            const { teacher_name } = req.body;
            await Teacher.createTeacher(teacher_name);
            res.json({ message: 'Teacher created successfully' });
        } catch (error) {
            console.error('Error creating teacher:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async test_user(req, res) {
        try {
            const { email, street, city, zipcode } = req.body;
            const newTeacher1 = await Teacher.create_Test({
                email,
                street,
                city,
                zipcode,
            });
        
            res.json({ message: 'Teacher created successfully', teacher: newTeacher1 });
        } catch (error) {
            console.error('Error creating teacher:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = TeacherController;
