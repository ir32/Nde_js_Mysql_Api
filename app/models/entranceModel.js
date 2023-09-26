const db = require('../config/database');

class entrance {
    static async getAllEntrances() {
        try {
            const connection = await db.getConnection();
            const [rows] = await connection.query('SELECT * FROM score');
            connection.release();
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async createEntrance(entranceData) {
        try {
            const connection = await db.getConnection();
            const query = 'INSERT INTO score (entrance_roll, obtain_marks, total_marks) VALUES (?, ?, ?)';
            const values = [entranceData.entrance_roll, entranceData.obtain_marks, entranceData.total_marks];

            const [result] = await connection.query(query, values);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = entrance;
