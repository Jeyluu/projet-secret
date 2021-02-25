//GET
exports.getPageFps = async (req, res) => {
    const jeu = await querysql('SELECT article.titre, article.image,article.articleId,article.contenu,article.categorieID, article.auteurID FROM article WHERE categorieID = 1')
    res.render('fps', {carteJeu : jeu})
}