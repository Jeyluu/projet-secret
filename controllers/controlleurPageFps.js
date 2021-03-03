//GET
exports.getPageFps = async (req, res) => {
    const jeu = await querysql('SELECT article.titre, article.image,article.articleId,article.contenu,article.categorieID, article.utilisateurId FROM article WHERE categorieID = 1')
    res.render('fps', {carteJeu : jeu})
}

//GET PAGE ARTICLE SIMPLE
exports.getPageArticleFps = async (req, res) => {

    const id = req.params.id;

    const jeuFps = await querysql("SELECT article.titre, article.image,article.articleId, utilisateur.pseudo, categorieJeu.categorie, article.contenu FROM utilisateur INNER JOIN article ON utilisateur.utilisateurID = article.utilisateurId INNER JOIN categorieJeu ON categorieJeu.categorieId = article.categorieID WHERE articleId =?", [id])
    console.log(id,jeuFps);

    res.render('articleFps', {jeuFps: jeuFps[0]})
}