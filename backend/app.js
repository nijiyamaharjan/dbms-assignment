const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcrypt')

// Middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type'], // Allowed headers
};
app.use(cors(corsOptions));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nijiya',
  database: 'user_registration'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Routes

// gets all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

// inserts user
app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, password, dob, isAdmin } = req.body;
  console.log(req.body)

  // Ensure all required fields are provided
  if (!firstName || !lastName || !email || !password || !dob) {
    return res.status(400).send('Missing required fields');
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Query to insert the new user into the database
  const query = 'INSERT INTO users (firstName, lastName, email, password, dob, isAdmin) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [firstName, lastName, email, hashedPassword, dob, isAdmin || 0], (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error creating user');
      return;
    }
    // Send a response indicating success
    res.status(201).send('User created successfully');
  });
});

// selects particular user
app.get('/api/users/:id', (req, res) => {
  const userID = req.params.id;
  db.query('SELECT * FROM users WHERE userID = ?', [userID], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching users');
      return;
    }
    console.log(results)
    res.json(results[0]);
  });
});


  // Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Query to check if the user exists with the given email
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      return res.status(500).json({ error: 'Error checking credentials' });
    }

    // Check if the user exists
    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare password (assuming you're storing plain-text passwords, ideally you'd hash them)
    const user = results[0];
    const match = await bcrypt.compare(password, user.password)
    if (match) {
      // Passwords match, successful login
      return res.status(200).json({
        message: 'Login successful',
        userId: user.userID, // Send user ID in the response
      });
    } else {
      // Passwords do not match
      return res.status(400).json({ error: 'Invalid email or password' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  