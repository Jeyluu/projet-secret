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

//Affichage d'un article à partir de la page FPS
router.get('/fps/articleFps/:id',pageFPSController.getPageArticleFps)

//Affichage de la page Gestion
router.get('/gestion',pageGestionController.getPageGestion)

//Affichage d'un article à partir de la page Gestion
router.get('/gestion/articleGestion/:id',pageGestionController.getPageArticleGestion)

//Affichage de la page MMO
router.get('/mmo',pageMMOController.getPageMMO)

//Affichage d'un article à partir de la page MMO
router.get('/mmo/articleMmo/:id',pageMMOController.getPageArticleMmo)

//Affichage de la page Plateforme
router.get('/plateforme',pagePlateformeController.getPagePlateforme)

//Affichage d'un article à partir de la page Plateforme
router.get('/plateforme/articlePlateforme/:id',pagePlateformeController.getPageArticlePlateforme)

module.exports = router