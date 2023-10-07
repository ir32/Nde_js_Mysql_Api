// subjectHelper.js
const db = require('../config/database');

class SubjectHelper {
  static async getDataByCondition(tableName, whereCondition) {
    try {
      const connection = await db.getConnection();
      const query = `SELECT * FROM ${tableName}`;

    //   const query = `SELECT * FROM ${tableName} WHERE ${whereCondition}`;
      const [rows] = await connection.query(query);
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = SubjectHelper;

