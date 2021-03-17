const router = require('express').Router()
const controllerTableauDeBord = require('../controllers/controlleurTableauDeBord')

/** 
* @swagger
* /tableau-de-bord:
*  get:
*   summary: Le Tableau de bord
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage de l'interface administration
router.get('/',controllerTableauDeBord.getTableauDeBordPage)

/** 
* @swagger
* /tableau-de-bord/ajouter-un-article:
*  get:
*   summary: Afficher la page ajouter un article
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage de l'interface ajouter un article
router.get('/ajouter-un-article', controllerTableauDeBord.getArticlePage)

/** 
* @swagger
* /tableau-de-bord/ajouter-un-article:
*  post:
*   summary: ajouter un article
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Ajout de l'article dans la base de donnée
router.post('/ajouter-un-article', controllerTableauDeBord.postArticle)

/** 
* @swagger
* /tableau-de-bord//modifier-un-article/:id:
*  get:
*   summary: Afficher la page modification article
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage de l'article dans la base de donnée pour modification
router.get('/modifier-un-article/:id', controllerTableauDeBord.affichageArticle)

/** 
* @swagger
* /tableau-de-bord//modifier-un-article/:id:
*  put:
*   summary: modification article
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Publication de la modification
router.put('/modifier-un-article/:id',controllerTableauDeBord.modifierArticle)


/** 
* @swagger
* /tableau-de-bord/:id:
*  delete:
*   summary: Suppression d'un article
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Supression de l'article dans la base de donnée
router.delete('/:id',controllerTableauDeBord.supressionArticle)

module.exports = router