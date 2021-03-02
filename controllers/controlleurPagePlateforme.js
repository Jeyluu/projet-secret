//GET
exports.getPagePlateforme = async (req, res) => {
    const jeuPlateforme = await querysql('SELECT article.titre, article.image,article.articleId,article.contenu,article.categorieID, article.utilisateurId FROM article WHERE categorieID = 4')
    res.render('plateforme', {carteJeu : jeuPlateforme})
}