//GET
exports.getPageGestion = async (req, res) => {
    const jeuGestion = await querysql('SELECT article.titre, article.image,article.articleId,article.contenu,article.categorieID, article.utilisateurId FROM article WHERE categorieID = 2')
    res.render('gestion', {carteJeu : jeuGestion})
}