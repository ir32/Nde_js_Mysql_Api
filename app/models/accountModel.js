const db = require('../config/database');

// Function to authenticate user
function authenticateUser(username, password, callback) {
  db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (err, rows) => {
    if (err) {
      return callback(err);
    }

    if (rows.length === 0) {
      return callback(null, false);
    }

    const user = rows[0];
    return callback(null, user);
  });
}

module.exports = {
  authenticateUser,
};
