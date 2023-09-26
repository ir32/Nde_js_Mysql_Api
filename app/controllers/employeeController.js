const Employee = require('../models/employeeModel');

class EmployeeController {
  async createEmployeeWithAge(req, res) {
    try {
      const { employeeData, ageData } = req.body;

      const result = await Employee.createEmployeeWithAge(employeeData, ageData);

      res.json({ message: 'Employee and Age created successfully', employeeId: result.employeeId });
    } catch (error) {
      console.error('Error creating Employee and Age:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  async getAllEmp(req, res) {
    try {
      const employees = await Employee.getAllEmployees();
      res.json({ employees });
    } catch (error) {
      console.error('Error retrieving employees:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const { id } = req.params;

      const employee = await Employee.fetchEmployeeById(id);

      if (employee) {
        res.json({ employee });
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error getting employee:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
}

module.exports = EmployeeController;
