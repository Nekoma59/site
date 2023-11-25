const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Récuperer les compétences
router.get('/getSkills', userController.getAllSkills);
// Inserer une compétence
router.post('/insertSkills', userController.insertSkills);
// Modifier une compétence
router.put('/updateSkills/:id', userController.updateSkills);
// Supprimer une compétence
router.delete('/deleteSkills/:id', userController.deleteSkills);

// Récuperer les projets
router.get('/getProjects', userController.getAllProjects);
// Inserer un projet
router.post('/insertProjects', userController.insertProjects);
// Modifier un projet
router.put('/updateProjects/:id', userController.updateProjects);
// Supprimer un projet
router.delete('/deleteProjects/:id', userController.deleteProjects);

module.exports = router;