const router = require('express').Router()
const pagePrincipaleController = require('../controllers/controlleurPagePrincipale')
const pageFPSController = require('../controllers/controlleurPageFps')
const pageGestionController = require('../controllers/controlleurPageGestion')
const pageMMOController = require('../controllers/controlleurPageMmo')
const pagePlateformeController = require('../controllers/controlleurPagePlateforme')



/** 
* @swagger
* /:
*  get:
*   summary: Afficher toutes les catégories
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage de la page principale
router.get('/',pagePrincipaleController.getPagePrincipale)

/** 
* @swagger
* /fps:
*  get:
*   summary: Afficher les jeux pour la catégorie FPS
*   responses:
*       200:
*          description: Affichage réussi !
*/

//Affichage de la page FPS
router.get('/fps',pageFPSController.getPageFps)

/** 
* @swagger
* /fps/articleFps/:id:
*  get:
*   summary: Afficher un jeu de la catégorie FPS
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage d'un article à partir de la page FPS
router.get('/fps/articleFps/:id',pageFPSController.getPageArticleFps)

/** 
* @swagger
* /gestion:
*  get:
*   summary: Afficher les jeux pour la catégorie Gestion
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage de la page Gestion
router.get('/gestion',pageGestionController.getPageGestion)

/** 
* @swagger
* /gestion/articleGestion/:id:
*  get:
*   summary: Afficher un jeu de la catégorie Gestion
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage d'un article à partir de la page Gestion
router.get('/gestion/articleGestion/:id',pageGestionController.getPageArticleGestion)

/** 
* @swagger
* /mmo:
*  get:
*   summary: Afficher les jeux pour la catégorie MMO
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage de la page MMO
router.get('/mmo',pageMMOController.getPageMMO)

/** 
* @swagger
* /mmo/articleMmo/:id:
*  get:
*   summary: Afficher un jeu de la catégorie MMO
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage d'un article à partir de la page MMO
router.get('/mmo/articleMmo/:id',pageMMOController.getPageArticleMmo)

/** 
* @swagger
* /plateforme:
*  get:
*   summary: Afficher les jeux pour la catégorie plateforme
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage de la page Plateforme
router.get('/plateforme',pagePlateformeController.getPagePlateforme)

/** 
* @swagger
* /plateforme/articlePlateforme/:id:
*  get:
*   summary: Afficher un jeu de la catégorie Plateforme
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage d'un article à partir de la page Plateforme
router.get('/plateforme/articlePlateforme/:id',pagePlateformeController.getPageArticlePlateforme)

module.exports = router