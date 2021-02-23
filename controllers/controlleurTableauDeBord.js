//Affichage de l'interface administration
exports.getTableauDeBordPage = async (req, res) => {
    res.render('admin/tableauDeBord')
}

//Affichage de l'interface ajouter un article
exports.getArticlePage = async (req, res) => {
    const categorieArticle = await querysql("SELECT categorieJeu.categorieId, categorieJeu.categorie FROM categorieJeu")
    const auteurArticle = await querysql("SELECT auteur.auteurId, auteur.pseudo FROM auteur")
    res.render('admin/ajoutArticle', {categories:categorieArticle, auteurs:auteurArticle})
}

//Poster l'article dans la base de donnée MySql
exports.postArticle = async (req, res) => {
    const { titre, image, categorieId, contenu, auteurId} = req.body
    console.log(req.body);
}