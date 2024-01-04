const bcrypt = require('bcrypt');
const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

conn.connect((err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données :', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

const register = (req, res) => {
    const { email, password } = req.body;

    const checkEmailQuery = 'SELECT * FROM admin WHERE email_admin = ?';
    conn.query(checkEmailQuery, [email], async (checkErr, results) => {
        if (checkErr) {
            return res.status(500).json({ success: false, message: 'Erreur lors de la recherche de l\'adresse e-mail' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Cette adresse e-mail est déjà enregistrée.' });
        }

        // Vérification des conditions regex du mot de passe
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            return res.status(400).json({ message: 'Le mot de passe ne respecte pas les critères de sécurité' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const query = 'INSERT INTO admin (email_admin, password_admin) VALUES (?, ?)';
            conn.query(query, [email, hashedPassword], (err) => {
                if (err) {
                    console.error('Erreur lors de l\'insertion des données : ' + err);
                    res.status(500).json({ error: 'Erreur lors de l\'insertion des données' });
                } else {
                    res.status(200).json({ message: 'Utilisateur enregistré' });
                }
            });
        } catch (hashError) {
            console.error('Erreur lors du hashage du mot de passe : ' + hashError);
            res.status(500).json({ error: 'Erreur lors du hashage du mot de passe' });
        }
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    const checkUserQuery = 'SELECT * FROM admin WHERE email_admin = ?';
    conn.query(checkUserQuery, [email], async (checkErr, results) => {
        if (checkErr) {
            return res.status(500).json({ success: false, message: 'Erreur lors de la recherche de l\'utilisateur' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password_admin);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        res.status(200).json({ message: 'Connexion réussie' });
    });
};

const dashboard = (req, res) => {
    // Your dashboard logic here
    res.status(200).json({ message: 'Dashboard route reached' });
};

module.exports = { register, login, dashboard };
