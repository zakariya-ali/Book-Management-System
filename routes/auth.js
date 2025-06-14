const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const router = express.Router();

// Show registration form
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration
router.post('/register', async (req, res) => {
  const { first, last, email, password } = req.body;
  if (!first || !last || !email || !password) {
    return res.render('register', { error: 'All fields are required.' });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [first, last, email, hashed]
    );
    req.session.user = {
      id: result.insertId,
      first_name: first,
      last_name: last,
      email,
      is_admin: false
    };
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Registration failed.' });
  }
});

// Show login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render('login', { error: 'Email and password required.' });
  }
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    const user = rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: !!user.is_admin
      };
      return res.redirect('/dashboard');
    }
    res.render('login', { error: 'Invalid credentials.' });
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Login failed.' });
  }
});

// Handle logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;