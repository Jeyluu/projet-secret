const router = require('express').Router()
const pagePrincipaleController = require('../controllers/controlleurPagePrincipale')

//Affichage de la page principale
router.get('/',pagePrincipaleController.getPagePrincipale)


module.exports = router