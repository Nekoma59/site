require('dotenv').config();
const mysql = require('mysql');

// const db = require('../config/db')
// const conn = mysql.createConnection(db);

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

// SERVICES
const insertServices = (req, res) => {
    // Extration des données du corps de la requete
    const { service, icon } = req.body
    console.log(req.body)

    if (!service, !icon) {
        return res.status(400).json({
            error: 'Données incorrect'
        })
    }
    const query = 'INSERT INTO `services` (`service`, `icon`) VALUES (?,?)';
    conn.query(query, [service, icon], (err) => {
        if (err) {
            console.error('erreur')
            res.status(500).json({ error: 'erreur' })
        } else {
            res.status(200).json({ message: 'compétence enregistré' })
        }
    })
}

const getAllServices = (req, res) => {

    const query = 'SELECT * FROM services';
    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    })
}

const updateServices = (req, res) => {
    const { service, icon } = req.body;
    const id = req.params.id;

    if (!service, !icon) {
        return res.status(400).json({
            error: 'Données incorrectes'
        });
    }

    const query = 'UPDATE `services` SET `service` = ?, `icon` = ? Where id = ?';
    conn.query(query, [service, icon, id], (err) => {
        if (err) {
            console.error("Erreur lors de la modification des données :" + err);
            res.status(500).json({ error: "Erreur lors de la modification des données" });
        } else {
            res.status(200).json({ message: 'Services modifié' });
        }
    });
};

const deleteServices = (req, res) => {

    const userId = req.params.id

    if (!userId) {
        return res.status(400).json({
            error: 'ID du skill manquant dans les paramètres de la route'
        })
    }

    let query = `DELETE FROM services WHERE id = ${userId}`
    conn.query(query, (err) => {
        if (err) {
            console.error("Erreur lors de la suppression des données :" + err);
            res.status(500).json({ error: "Erreur lors de la suppression des données" })
        } else {
            res.status(200).json({ message: 'Service supprimé' })
        }
    })
}
// FIN SERVICES 


// Projet
const insertProjects = (req, res) => {
    const { project_name, project_desc, tech_stack, project_img, project_url,code_produit } = req.body

    if (!project_name || !project_desc || !tech_stack || !project_img || !project_url || !code_produit) {
        return res.status(400).json({ error: 'Données incorrect' })
    }
    const query = 'INSERT INTO `projects` (`project_name`, `project_desc`, `tech_stack`, `project_img`, `project_url`, `code_produit`) VALUES (?,?,?,?,?,?)';
    conn.query(query, [project_name, project_desc, tech_stack, project_img, project_url, code_produit], (err) => {
        if (err) {
            console.error('erreur')
            res.status(500).json({ error: 'erreur' })
        } else {
            res.status(200).json({ message: 'projet enregistré' })
        }
    })
}

const getAllProjects = (req, res) => {

    const query = 'SELECT * FROM projects';

    conn.query(query, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({ error: "Erreur lors de la récupération des données" })
        } else {
            res.status(200).json(result)
        }
    })
}

const updateProjects = (req, res) => {

    const { project_name, project_desc, tech_stack, project_img, project_url, code_produit } = req.body

    if (!project_name || !project_desc || !tech_stack || !project_img || !project_url || !code_produit) {
        return res.status(400).json({ error: 'Données incorrect' })
    }
    const query = 'UPDATE `projects` SET `project_name` = ?, `project_desc` = ?, `tech_stack` = ?, `project_img` = ?, `project_url` = ?, `code_produit` = ? Where id = ?'
    conn.query(query, [project_name, project_desc, tech_stack, project_img, project_url, code_produit, req.params.id], (err) => {
        if (err) {
            console.error("Erreur lors de la modification des données :" + err);
            res.status(500).json({ error: "Erreur lors de la modification des données" })
        } else {
            res.status(200).json({ message: 'Projet modifié' })
        }
    })
}

const deleteProjects = (req, res) => {

    const userId = req.params.id

    if (!userId) {
        return res.status(400).json({
            error: 'ID du projet manquant dans les paramètres de la route'
        })
    }

    let query = `DELETE FROM projects WHERE id = ${userId}`
    conn.query(query, (err) => {
        if (err) {
            console.error("Erreur lors de la suppression des données :" + err);
            res.status(500).json({ error: "Erreur lors de la suppression des données" })
        } else {
            res.status(200).json({ message: 'projet supprimé' })
        }
    })
}
// Fin Projet

module.exports = {
    getAllServices,
    getAllProjects,

    insertServices,
    insertProjects,

    updateServices,
    updateProjects,

    deleteServices,
    deleteProjects,
}