const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const path = require('path'); // Import the 'path' module

const session = require('express-session');
const { v4: uuidv4 } = require('uuid'); // Import uuid and use v4 method to generate a random string

// Set up session middleware
app.use(
  session({
    secret: uuidv4(), // Generate a random secret key using uuid
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
  })
);

// Parse JSON request bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Set up user routes
app.use('/', userRoutes);

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
