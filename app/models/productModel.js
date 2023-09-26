const db = require('../config/database');

class Product {
  static async createProduct(data) {
    try {
      const connection = await db.getConnection();
      const query = 'INSERT INTO products (name, price, category_id, product_image) VALUES (?, ?, ?, ?)';
      const values = [data.name, data.price, data.category_id, data.product_image];

      const [result] = await connection.query(query, values);
      connection.release();

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
  static async getAllProducts() {
    try {
      const connection = await db.getConnection();
      const query = 'SELECT * FROM products';
      const [rows] = await connection.query(query);
      connection.release();

      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
