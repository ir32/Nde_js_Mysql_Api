const Registration = require('../models/registrationModel');

class RegistrationController {
  static async registerUser(req, res) {
    try {
      const { username, password, role } = req.body; // Add 'role' to the request body

      // Check if the username is already taken
      const existingUser = await Registration.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      // Create a new user with the specified role
      const userData = { username, password };
      const userId = await Registration.createUser(userData, role); // Pass the 'role' here

      res.json({ message: 'User registered successfully', userId });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      // Get the user from the database
      const user = await Registration.getUserByUsername(username);

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify the password using the verifyPassword method
      const isPasswordValid = await Registration.verifyPassword(password, user.password);

      // Check if the password is correct
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Set the user data in the session
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.role = user.role; // Add this line to set the role

      res.json({ message: 'Login successful', userId: user.id, username: user.username, role: user.role });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async checkLogin(req, res) {
    try {
      // Check if the user is logged in
      if (req.session.userId && req.session.username) {
        res.json({ loggedIn: true, userId: req.session.userId, username: req.session.username });
      } else {
        res.json({ loggedIn: false });
      }
    } catch (error) {
      console.error('Error checking login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  static async logoutUser(req, res) {
    try {
      // Clear the session data
      req.session.destroy();

      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

}

module.exports = RegistrationController;
