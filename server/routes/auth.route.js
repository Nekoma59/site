const express = require('express');
const router = express.Router();
const { register, login, dashboard } = require('../controllers/auth.controller');

// Middleware pour gérer la validation et l'authentification des utilisateurs

// Route pour l'inscription
router.post('/register', register);

//Route pour la connexion
router.post('/login', login);

//Route pour le dashboard
router.get('/dashboard', dashboard);

module.exports = router;