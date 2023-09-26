const pool = require('../config/database');

const User = {};

User.getAllUsers = () => {
  return pool.query('SELECT * FROM users');
};

User.getAllContacts = () => {
  return pool.query('SELECT * FROM contacts');
};

User.createUser = (userData) => {
  return pool.query('INSERT INTO users SET ?', userData);
};

User.postContact = (contactData) => {
  return pool.query('INSERT INTO contacts SET ?', contactData);
};

// User.postContact = (contactData) => {
//   return pool.query('INSERT INTO contacts SET ?', contactData);
// };
User.getUserById = (userId) => {
  return pool.query('SELECT * FROM users WHERE id = ?', [userId]);
};

User.updateUserById = (userId, userData) => {
  return pool.query('UPDATE users SET ? WHERE id = ?', [userData, userId]);
};

User.deleteUserById = (userId) => {
  return pool.query('DELETE FROM users WHERE id = ?', [userId]);
};

User.getContacts = () => {
  return pool.query('SELECT * FROM contacts');
};

User.getOrders = () => {
  return pool.query('SELECT * FROM orders');
};

User.getPayments = () => {
  return pool.query('SELECT * FROM payments');
};

module.exports = User;
