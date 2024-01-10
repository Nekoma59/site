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

const register = async (req, res) => {
    const { email, password } = req.body;

    const checkEmailQuery = 'SELECT * FROM admin WHERE email_admin = ?';
    try {
        const results = await query(checkEmailQuery, [email]);

        if (results.length > 0) {
            return res.status(400).json({ message: 'Cette adresse e-mail est déjà enregistrée.' });
        }

        // Vérification des conditions regex du mot de passe
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            return res.status(400).json({ message: 'Le mot de passe ne respecte pas les critères de sécurité' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = 'INSERT INTO admin (email_admin, password_admin) VALUES (?, ?)';
        await query(insertQuery, [email, hashedPassword]);

        res.status(200).json({ message: 'Utilisateur enregistré' });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const checkUserQuery = 'SELECT * FROM admin WHERE email_admin = ?';
    try {
        const results = await query(checkUserQuery, [email]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password_admin);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        res.status(200).json({ message: 'Connexion réussie' });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};

const dashboard = (req, res) => {
    // Your dashboard logic here
    res.status(200).json({ message: 'Dashboard route reached' });
};

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = { register, login, dashboard };
