const db = require('../config/database');

class Teacher {
    static async getTeachers() {
        try {
            const connection = await db.getConnection();
            const [rows] = await connection.query('SELECT * FROM teacher_details');
            connection.release();
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async createTeacher(teacher_name) {
        try {
            const connection = await db.getConnection();
            const query = 'INSERT INTO teacher_details (teacher_name) VALUES (?)';
            const values = [teacher_name];
            await connection.query(query, values);
            connection.release();
        } catch (error) {
            throw error;
        }
    }

    static async create_Test(newTeacher1) {
        try {
            const connection = await db.getConnection();
            const query = 'INSERT INTO test_user (email, street, city, zipcode) VALUES (?, ?, ?, ?)';
            const values = [newTeacher1.email, newTeacher1.street, newTeacher1.city, newTeacher1.zipcode];
            await connection.query(query, values);
            connection.release();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Teacher;
