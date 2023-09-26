const accountModel = require('../models/accountModel');

// Controller function for user login
function login(req, res) {
  const { username, password } = req.body;

  accountModel.authenticateUser(username, password, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Set session or JWT token, and return success response
    // For simplicity, let's assume we set a session variable called "user" with the user object
    req.session.user = user;
    return res.json({ message: 'Login successful' });
  });
}

// Controller function for user logout
function logout(req, res) {
  // Clear session or JWT token
  // For simplicity, let's assume we clear the "user" session variable
  delete req.session.user;
  return res.json({ message: 'Logout successful' });
}

module.exports = {
  login,
  logout,
};
