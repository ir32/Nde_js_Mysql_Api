const pool = require('../config/database');

class CareerModel {
    async getAllJobs() {
        const sqlQuery = 'SELECT * FROM dream_job';
        const [rows] = await pool.execute(sqlQuery); 
        //console.log('Query Result:', rows); 
        return rows;
    }
}

module.exports = CareerModel;
