const router = require('express').Router()
const controllerTableauDeBord = require('../controllers/controlleurTableauDeBord')

//Affichage de l'interface administration
router.get('/tableau-de-bord', controllerTableauDeBord.getTableauDeBordPage)

module.exports = router