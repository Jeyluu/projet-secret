const router = require('express').Router()
const pagePrincipaleController = require('../controllers/controlleurPagePrincipale')
const pageFPSController = require('../controllers/controlleurPageFps')
const pageGestionController = require('../controllers/controlleurPageGestion')
const pageMMOController = require('../controllers/controlleurPageMmo')
const pagePlateformeController = require('../controllers/controlleurPagePlateforme')

//Affichage de la page principale
router.get('/',pagePrincipaleController.getPagePrincipale)

//Affichage de la page FPS
router.get('/fps',pageFPSController.getPageFps)

//Affichage de la page Gestion
router.get('/gestion',pageGestionController.getPageGestion)

//Affichage de la page MMO
router.get('/mmo',pageMMOController.getPageMMO)

//Affichage de la page Plateforme
router.get('/plateforme',pagePlateformeController.getPagePlateforme)

module.exports = router