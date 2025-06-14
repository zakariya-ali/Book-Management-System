const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const bookRoutes = require('./books');

module.exports = (app, shopData) => {
  // Make user available in templates
  app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.shopName = shopData.shopName;
    next();
  });

  // Home and About
  app.get('/', (req, res) => res.render('index', shopData));
  app.get('/about', (req, res) => res.render('about', shopData));

  // Auth routes: login, register, logout
  app.use('/', authRoutes);

  // Book management routes (admin)
  app.use('/books', bookRoutes);

  // Search books
  app.get('/search', (req, res) => res.render('search', shopData));
  app.get('/search-result', async (req, res) => {
    const pool = require('../db');
    const keyword = req.query.keyword || '';
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM books WHERE title LIKE ?',
        [`%${keyword}%`]
      );
      res.render('search-results', { ...shopData, books: rows, keyword });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // Dashboard for user (if needed)
  app.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('dashboard', shopData);
  });

  // Catch-all redirect
  app.use((req, res) => res.redirect('/'));
};