const db = require('../config/database');

class Work {
    static async getWorkshop() {
        try {
          const connection = await db.getConnection();
          const [rows] = await connection.query('SELECT * FROM workshop');
          connection.release();
          return rows;
        } catch (error) {
          throw error;
        }
    }

    static async submit_workshop(topic, date, location) {
        try {
            const connection = await db.getConnection();
            const query = 'INSERT INTO workshop (topic, date, location) VALUES (?, ?, ?)';
            const values = [topic, date, location];

            await connection.query(query, values);
            connection.release();
        } catch (error) {
            throw error;
        }
    }

}
module.exports = Work;
