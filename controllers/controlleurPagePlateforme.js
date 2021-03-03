//GET
exports.getPagePlateforme = async (req, res) => {
    const jeuPlateforme = await querysql('SELECT article.titre, article.image,article.articleId,article.contenu,article.categorieID, article.utilisateurId FROM article WHERE categorieID = 4')
    res.render('plateforme', {carteJeu : jeuPlateforme})
}


exports.getPageArticlePlateforme = async (req, res) => {

    const id = req.params.id;

    const jeuPlateforme = await querysql("SELECT article.titre, article.image,article.articleId, utilisateur.pseudo, categorieJeu.categorie, article.contenu FROM utilisateur INNER JOIN article ON utilisateur.utilisateurID = article.utilisateurId INNER JOIN categorieJeu ON categorieJeu.categorieId = article.categorieID WHERE articleId =?", [id])
    console.log(id,jeuPlateforme);

    res.render('articlePlateforme', {jeuPlateforme: jeuPlateforme[0]})
}