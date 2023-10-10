// models/registrationModel.js
const db = require('../config/database');
const bcrypt = require('bcrypt');

class Registration {
  static async createUser(data, role) {
    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const connection = await db.getConnection();
      const query = 'INSERT INTO registrations (username, password, role) VALUES (?, ?, ?)';
      const values = [data.username, hashedPassword, role];

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
