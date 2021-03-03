//GET
exports.getPageGestion = async (req, res) => {
    const jeuGestion = await querysql('SELECT article.titre, article.image,article.articleId,article.contenu,article.categorieID, article.utilisateurId FROM article WHERE categorieID = 2')
    res.render('gestion', {carteJeu : jeuGestion})
}


exports.getPageArticleGestion = async (req, res) => {
    const id = req.params.id;

    const jeuGestion = await querysql("SELECT article.titre, article.image,article.articleId, utilisateur.pseudo, categorieJeu.categorie, article.contenu FROM utilisateur INNER JOIN article ON utilisateur.utilisateurID = article.utilisateurId INNER JOIN categorieJeu ON categorieJeu.categorieId = article.categorieID WHERE articleId =?", [id])
    console.log(id,jeuGestion);

    res.render('articleGestion', {jeuGestion: jeuGestion[0]})
}