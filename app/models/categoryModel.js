const db = require('../config/database');

class CategoryModel {
  static async createCategory(categoryData) {
    try {
      const connection = await db.getConnection();
      const query = 'INSERT INTO categories (name) VALUES (?)';
      const values = [categoryData.name];

      const [result] = await connection.query(query, values);
      connection.release();

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoryModel;
