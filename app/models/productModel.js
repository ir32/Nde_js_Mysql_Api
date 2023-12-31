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
  static async post_banner(data) {
    try {
      const connection = await db.getConnection();
      const query = 'INSERT INTO tab_banner (image, product, company) VALUES (?, ?, ?)';

      const values = [data.image, data.product, data.company];

      const [result] = await connection.query(query, values);
      connection.release();
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
  static async getbanner() {
    try {
      const connection = await db.getConnection();
      const query = 'SELECT * FROM tab_banner';
      const [rows] = await connection.query(query);
      connection.release();
  
      return rows.map((row) => ({
        id: row.id,
        product: row.product,
        company: row.company,
        image: `/uploads/${row.image.split('\\').pop()}`
        // image: `/${row.image.replace('public\\', '/')}`, // Modify the image path
        // image: `/${row.image.replace(/\\/g, '/')}`, // Remove the additional '/uploads' segment
      }));
    } catch (error) {
      throw error;
    }
  }
  static async all_discount_product () {
    try {
       const connection = await db.getConnection();
       const query = 'SELECT * FROM discount_tbl';
       const [rows] = await connection.query(query);
       connection.release();
       return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async createDiscountProduct(name, desc_pro, discount_percentage) {
    try {
      const connection = await db.getConnection();
      const query = 'INSERT INTO discount_tbl (name, desc_pro, discount_percentage) VALUES (?, ?, ?)';
      const values = [name, desc_pro, discount_percentage];
      await connection.query(query, values);
      connection.release();
      return { message: 'Discount product added successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Error adding discount product');      
    }
  
  }
  
}

module.exports = Product;
