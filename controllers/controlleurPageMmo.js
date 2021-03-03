//GET
exports.getPageMMO = async (req, res) => {
    const jeuMmo = await querysql('SELECT article.titre, article.image,article.articleId,article.contenu,article.categorieID, article.utilisateurId FROM article WHERE categorieID = 3')
    res.render('mmo',{carteJeu : jeuMmo})
}

//GET PAGE ARTICLE SIMPLE
exports.getPageArticleMmo = async (req, res) => {
    const id = req.params.id;

    const jeuMmo = await querysql("SELECT article.titre, article.image,article.articleId, utilisateur.pseudo, categorieJeu.categorie, article.contenu FROM utilisateur INNER JOIN article ON utilisateur.utilisateurID = article.utilisateurId INNER JOIN categorieJeu ON categorieJeu.categorieId = article.categorieID WHERE articleId =?", [id])
    console.log(id,jeuMmo);

    res.render('articleMmo', {jeuMmo: jeuMmo[0]})
}