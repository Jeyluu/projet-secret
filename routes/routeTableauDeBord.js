const router = require('express').Router()
const controllerTableauDeBord = require('../controllers/controlleurTableauDeBord')

//Affichage de l'interface administration
router.get('/',controllerTableauDeBord.getTableauDeBordPage)

//Affichage de l'interface ajouter un article
router.get('/ajouter-un-article', controllerTableauDeBord.getArticlePage)

//Ajout de l'article dans la base de donnée
router.post('/ajouter-un-article', controllerTableauDeBord.postArticle)

//Affichage de l'article dans la base de donnée pour modification
router.get('/modifier-un-article/:id', controllerTableauDeBord.affichageArticle)

//Publication de la modification
router.put('/modifier-un-article/:id',controllerTableauDeBord.modifierArticle)

//Supression de l'article dans la base de donnée
router.delete('/:id',controllerTableauDeBord.supressionArticle)

module.exports = router