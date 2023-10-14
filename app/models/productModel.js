const db = require('../config/database');

class Product {
  static async createProduct(data) {
    try {
      const connection = await db.getConnection();
      const query = 'INSERT INTO products (name, price, category_id, product_image) VALUES (?, ?, ?, ?)';
      const imagePath = data.product_image.replace('public\\', ''); // Modify the image path

      const values = [data.name, data.price, data.category_id, imagePath];

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
  
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        price: row.price,
        category_id: row.category_id,
        product_image: `/${row.product_image.replace(/\\/g, '/')}`, // Remove the additional '/uploads' segment
      }));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
