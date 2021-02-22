//GET
exports.getPagePrincipale = async (req, res) => {
    const carteCategorie = await querysql('SELECT categorie,image,description,liens FROM categorieJeu')
    res.render('pagePrincipale', {categories : carteCategorie})
}



