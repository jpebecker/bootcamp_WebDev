// Entry point of the application.
// Sets up Express, view engine, static files and mounts the routes.

require('dotenv').config();

const express = require('express');
const path = require('path');
const indexRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse form submissions (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static assets (CSS, client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

// Application routes
app.use('/', indexRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Página não encontrada',
    message: 'A página que você tentou acessar não existe.',
  });
});

// Centralized error handler.
// Any error passed to next(err) anywhere in the app ends up here,
// so the user always sees a friendly page instead of a stack trace.
app.use((err, req, res, next) => {
  console.error('Unhandled application error:', err);
  res.status(500).render('error', {
    title: 'Algo deu errado',
    message: 'Não foi possível completar sua solicitação. Tente novamente em instantes.',
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
