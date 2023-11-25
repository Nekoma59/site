// Importation des dépendances dotenv, express, body-parser, cors, et les routes.
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')
const cors = require('cors');
const cookieParser = require('cookie-parser')


// Connection à la base de données.
const connectDb = require('./config/db')

// Middlewares.
const app = express();

// Middleware pour traiter le corps des requêtes HTTP au format JSON
app.use(express.json());

// Middleware bodyParser pour analyser le corps des requêtes HTTP au format JSON
app.use(bodyParser.json());

// Middleware CookieParser
app.use(cookieParser());

// Middleware bodyParser pour analyser le corps des requêtes HTTP avec les données de formulaire URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware cors pour gérer les requêtes Cross-Origin Resource Sharing (CORS)
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

// Routes
app.use('/api', authRoutes, userRoutes);

// Configuration et lancement du serveur
const start = async () => {
    try {
        await connectDb();
        // Port
        const port = process.env.PORT || 5500;
        app.listen(port, () => {
            console.log(`le serveur à démarré sur le port ${port}`);
        })
    } catch (error) {
        console.log(`Erreur lors du démarrage du serveur`);
    }
};

start();