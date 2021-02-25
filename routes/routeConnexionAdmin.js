const router = require('express').Router()
const controlleurCoAdmin = require('../controllers/controlleurCoAdmin')

//Affichage Inscription
router.get('/inscription',controlleurCoAdmin.pageInscription)

//Enregistrement de L'utilisateur Admin dans la base
router.post('/inscription',controlleurCoAdmin.postInscription)

//Affichage de la page Connexion Admin
router.get('/connexion',controlleurCoAdmin.pageCoAdmin )

module.exports = router