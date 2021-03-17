const router = require('express').Router()
const controlleurCoAdmin = require('../controllers/controlleurCoAdmin')

/** 
* @swagger
* /admin/inscription:
*  get:
*   summary: Afficher la page inscription
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage Inscription
router.get('/inscription',controlleurCoAdmin.pageInscription)

/** 
* @swagger
* /admin/inscription:
*  post:
*   summary: Inscription
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Enregistrement de L'utilisateur Admin dans la base
router.post('/inscription',controlleurCoAdmin.postInscription)

/** 
* @swagger
* /admin/connexion:
*  get:
*   summary: Afficher la page connexion
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Affichage de la page Connexion Admin
router.get('/connexion',controlleurCoAdmin.pageCoAdmin )

/** 
* @swagger
* /admin/connexion:
*  post:
*   summary: Connexion
*   responses:
*       200:
*          description: Affichage réussi !
*/
//connexion à partir de la page Connexion Admin
router.post('/connexion',controlleurCoAdmin.postConnexion)

/** 
* @swagger
* /admin/deconnexion:
*  get:
*   summary: Connexion
*   responses:
*       200:
*          description: Affichage réussi !
*/
//Deconnexion de la session
router.get('/deconnexion', controlleurCoAdmin.deconnexion)

module.exports = router