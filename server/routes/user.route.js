const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Récuperer les compétences
router.get('/getServices', userController.getAllServices);
// Inserer une compétence
router.post('/insertServices', userController.insertServices);
// Modifier une compétence
router.put('/updateServices/:id', userController.updateServices);
// Supprimer une compétence
router.delete('/deleteServices/:id', userController.deleteServices);

// Récuperer les projets
router.get('/getProjects', userController.getAllProjects);
// Inserer un projet
router.post('/insertProjects', userController.insertProjects);
// Modifier un projet
router.put('/updateProjects/:id', userController.updateProjects);
// Supprimer un projet
router.delete('/deleteProjects/:id', userController.deleteProjects);

module.exports = router;