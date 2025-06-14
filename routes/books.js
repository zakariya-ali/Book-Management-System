const express = require('express');
const pool = require('../db');
const router = express.Router();

// Middleware to ensure admin access
router.use((req, res, next) => {
  if (!req.session.user || !req.session.user.is_admin) {
    return res.status(403).send('Access denied');
  }
  next();
});

// List books
router.get('/', async (req, res) => {
  try {
    const [books] = await pool.execute('SELECT * FROM books');
    res.render('books', { books, shopName: res.locals.shopName });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Show form to add a book
router.get('/add', (req, res) => {
  res.render('add-book', { shopName: res.locals.shopName });
});

// Handle add book
router.post('/add', async (req, res) => {
  const { title, author, description, price } = req.body;
  try {
    await pool.execute(
      'INSERT INTO books (title, author, description, price) VALUES (?, ?, ?, ?)',
      [title, author, description, price]
    );
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Show form to edit a book
router.get('/edit/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.sendStatus(404);
    res.render('edit-book', { book: rows[0], shopName: res.locals.shopName });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Handle edit book
router.post('/edit/:id', async (req, res) => {
  const { title, author, description, price } = req.body;
  try {
    await pool.execute(
      'UPDATE books SET title = ?, author = ?, description = ?, price = ? WHERE id = ?',
      [title, author, description, price, req.params.id]
    );
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Handle delete book
router.post('/delete/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM books WHERE id = ?', [req.params.id]);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;