// controllers/registrationController.js
const Registration = require('../models/registrationModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class RegistrationController {
  // Generate a random secret key for JWT
  static generateRandomSecretKey() {
    // Generate a random secret key with 32 bytes (256 bits)
    return crypto.randomBytes(32).toString('hex');
  }

  static createToken(userId, username, role) {
    const secretKey = RegistrationController.generateRandomSecretKey(); // Generate a new secret key
    return jwt.sign({ userId, username, role }, secretKey, { expiresIn: '1h' });
  }

  static verifyToken(token) {
    try {
      const secretKey = RegistrationController.generateRandomSecretKey(); // Use the same secret key for verification
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw error;
    }
  }
  
  static async registerUser(req, res) {
    try {
      const { username, password, role } = req.body;

      // Check if the username is already taken
      const existingUser = await Registration.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      // Create a new user with the specified role
      const userData = { username, password };
      const userId = await Registration.createUser(userData, role);

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
      req.session.role = user.role;

      // Create a JWT token
      const token = RegistrationController.createToken(user.id, user.username, user.role);

      res.json({ message: 'Login successful', userId: user.id, username: user.username, role: user.role, token });
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
