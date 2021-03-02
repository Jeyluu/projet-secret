//GET
exports.getPageMMO = async (req, res) => {
    const jeuMmo = await querysql('SELECT article.titre, article.image,article.articleId,article.contenu,article.categorieID, article.utilisateurId FROM article WHERE categorieID = 3')
    res.render('mmo',{carteJeu : jeuMmo})
}