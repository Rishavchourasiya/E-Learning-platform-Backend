const express = require('express');
const app = express();
require('./db/Connection');
const Register = require('./model/Register');
const data = require('./default/default');
const Lecture = require('./model/Lecture');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
// Root
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Create Lecture
app.get("/getlecture", async (req, res) => {
    try {
      const data = await Lecture.find({});
      res.json(data);
    } catch (e) {
      res.json(e);
    }
  });
  app.post('/admin', async (req, res) => {
    const { name, title, url, description } = req.body;
    try {
      const newLecture = new Lecture({
        name,
        title,
        url,
        description
      });
      await newLecture.save();
      res.status(201).json({ message: 'Lecture added successfully' });
    } catch (error) {
      console.error('Error adding lecture:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

// Register User
app.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Register({
      name,
      email,
      password: hashedPassword,
      confirmPassword, // You might not need to store confirmPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login User
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await Register.findOne({ email });

    if (!user || !user.password) {
      return res.status(404).json({ error: 'User not found or password missing' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Server Listener
app.listen(PORT, () => {
  console.log('Server is running on port: http://localhost:5000');
});
data(); // Initialize default data