const fileupload = require("express-fileupload");
const path = require("path");

//Affichage de l'interface administration
exports.getTableauDeBordPage = async (req, res) => {
    const affichageArticle = await querysql("SELECT article.titre, article.image,article.articleId, auteur.pseudo, categorieJeu.categorie FROM auteur INNER JOIN article ON auteur.auteurId = article.auteurID INNER JOIN categorieJeu ON categorieJeu.categorieId = article.categorieID")
    res.render('admin/tableauDeBord', { affichage: affichageArticle })
}

//Affichage de l'interface ajouter un article
exports.getArticlePage = async (req, res) => {
    const categorieArticle = await querysql("SELECT categorieJeu.categorieId, categorieJeu.categorie FROM categorieJeu")
    const auteurArticle = await querysql("SELECT auteur.auteurId, auteur.pseudo FROM auteur")
    res.render('admin/ajoutArticle', { categories: categorieArticle, auteurs: auteurArticle })
}

//Poster l'article dans la base de donnée MySql
exports.postArticle = async (req, res) => {
    const { titre, image, categorieId, contenu, auteurId } = req.body
    console.log(req.body);


    //Enregistrer l'image dans le fichier public/image/upload
    const imageUpload = req.files.image
    console.log(imageUpload);
    let imageName = imageUpload.imageName //Ici je rappelle le nom de l'image qui est dans le req.files.image. C'est un let car je vais la modifier ci-dessous
    const mimetype = imageUpload.mimetype.split('/')[1]//Ici je prends le mimetype du req.files.image et avec split je sépare en deux ce qui ressort (imageName) et je prends que la partie après le /
    const titreImage = req.body.titre //Ici je rappelle le titre du req.body

    imageName = titreImage + "." + mimetype // je recompose le nom de l'image qui va apparaitre dans le public/images/uploads avec le titre de l'image et l'extension

    imageUpload.mv(`public/images/uploads/${imageName}`, async (err) => {
        if (err) {
            return res.status(500).send(err)
        }
        try {
            await querysql('INSERT INTO article(titre,image,categorieId,contenu,auteurId) VALUES (?,?,?,?,?)', [titre, imageName, categorieId, contenu, auteurId],
                (err, result) => {
                    if (err) {
                        res.send(err)
                    } else {
                        return res.redirect('/tableau-de-bord')
                    }
                }
            )
        } catch (err) {
            res.status(400).json({ message: err })
        }
    })
}
//Affichage de  l'article pour modification dans la base de donnée MySql
exports.affichageArticle = async (req, res) => {
    const categorieArticle = await querysql("SELECT categorieJeu.categorieId, categorieJeu.categorie FROM categorieJeu")
    const auteurArticle = await querysql("SELECT auteur.auteurId, auteur.pseudo FROM auteur")
    const id = req.params.id
    const article = await querysql("SELECT article.titre, article.contenu, article.image, article.articleId FROM article WHERE articleId =?", [id]) //WHERE articleId = '" + req.params.id + "';"
    res.render('admin/modificationArticle', { categories: categorieArticle, auteurs: auteurArticle, reprise: article[0] })

}

//Modification de l'article dans la base de donnée MySql
exports.modifierArticle = async (req, res) => {
    const { titre, image, categorieId, contenu, auteurId } = req.body
    const id = req.params.id

    const imageUpload = req.files.image
    console.log(imageUpload);
    //Ici je rappelle le nom de l'image qui est dans le req.files.image. C'est un let car je vais la modifier ci-dessous
    let imageName = imageUpload.imageName
    //Ici je prends le mimetype du req.files.image et avec split je sépare en deux ce qui ressort (imageName) et je prends que la partie après le /
    const mimetype = imageUpload.mimetype.split('/')[1]
    //Ici je rappelle le titre du req.body
    const titreImage = req.body.titre
    // je recompose le nom de l'image qui va apparaitre dans le public/images/uploads avec le titre de l'image et l'extension
    imageName = titreImage + "." + mimetype

    imageUpload.mv(`public/images/uploads/${imageName}`, async (err) => {
        if (err) {
            return res.status(500).send(err)
        }
        try {
            await querysql("UPDATE article SET titre = ?, image = ?, categorieId = ?, contenu = ?, auteurId = ? WHERE articleId = ?", [titre, imageName, categorieId, contenu, auteurId, id],

                (err, result) => {
                    console.log(result);
                    if (err) {
                        res.send(err)
                    } else {
                        return res.redirect('/tableau-de-bord')
                    }
                })
        }

        catch (err) {
            res.status(400).json({ message: err })
        }
    })

}

//Suppression de  l'article dans la base de donnée MySql
exports.supressionArticle = async (req, res) => {
    const id = req.params.id
    console.log(id);
    await querysql('DELETE FROM article WHERE articleId = ?',id)
    res.redirect('/tableau-de-bord')
} 