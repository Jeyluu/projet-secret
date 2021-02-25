const router = require('express').Router()
const controllerTableauDeBord = require('../controllers/controlleurTableauDeBord')

//Affichage de l'interface administration
router.get('/tableau-de-bord', controllerTableauDeBord.getTableauDeBordPage)

//Affichage de l'interface ajouter un article
router.get('/tableau-de-bord/ajouter-un-article', controllerTableauDeBord.getArticlePage)

//Ajout de l'article dans la base de donnée
router.post('/tableau-de-bord/ajouter-un-article', controllerTableauDeBord.postArticle)

//Affichage de l'article dans la base de donnée pour modification
router.get('/tableau-de-bord/modifier-un-article/:id', controllerTableauDeBord.affichageArticle)

//Publication de la modification
router.put('/tableau-de-bord/modifier-un-article/:id',controllerTableauDeBord.modifierArticle)

//Supression de l'article dans la base de donnée
router.delete('/tableau-de-bord/:id',controllerTableauDeBord.supressionArticle)

module.exports = router