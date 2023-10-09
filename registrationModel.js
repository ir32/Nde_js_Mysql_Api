// old login and registation without role 
const db = require('../config/database');
const bcrypt = require('bcrypt');

class Registration {
  static async createUser(data) {
    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(data.password, 10); // The second argument is the salt rounds

      const connection = await db.getConnection();
      const query = 'INSERT INTO registrations (username, password) VALUES (?, ?)';
      const values = [data.username, hashedPassword];

      const [result] = await connection.query(query, values);
      connection.release();

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByUsername(username) {
    try {
      const connection = await db.getConnection();
      const query = 'SELECT * FROM registrations WHERE username = ?';
      const [rows] = await connection.query(query, [username]);
      connection.release();

      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Registration;

