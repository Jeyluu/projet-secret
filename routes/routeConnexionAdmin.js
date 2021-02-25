const router = require('express').Router()
const controlleurCoAdmin = require('../controllers/controlleurCoAdmin')

//Affichage Inscription
router.get('/inscription',controlleurCoAdmin.pageInscription)

//Enregistrement de L'utilisateur Admin dans la base
router.post('/inscription',controlleurCoAdmin.postInscription)

//Affichage de la page Connexion Admin
router.get('/connexion',controlleurCoAdmin.pageCoAdmin )

//connexion à partir de la page Connexion Admin
router.post('/connexion',controlleurCoAdmin.postConnexion)



module.exports = router