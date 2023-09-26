const db = require('../config/database');

class Employee {
  static async createEmployeeWithAge(employeeData, ageData) {
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      const [employeeResult] = await connection.query('INSERT INTO employees SET ?', employeeData);
      const employeeId = employeeResult.insertId;

      const ageDataWithEmployeeId = { ...ageData, index_id: employeeId };
      await connection.query('INSERT INTO age SET ?', ageDataWithEmployeeId);

      await connection.commit();
      connection.release();

      return { employeeId };
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  }

  static async fetchEmployeeById(id) {
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.query('SELECT * FROM employees WHERE id = ?', [id]);
      connection.release();

      if (rows.length === 0) {
        return null; // Employee not found
      }

      const employee = rows[0];
      return employee;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  }
  static async getAllEmployees() {
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.query('SELECT * FROM employees');
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Employee;

