const fileupload = require("express-fileupload");
const path = require("path");


//Affichage de l'interface administration
exports.getTableauDeBordPage = async (req, res) => {
    const affichageArticle = await querysql("SELECT article.titre, article.image,article.articleId, utilisateur.pseudo, categorieJeu.categorie FROM utilisateur INNER JOIN article ON utilisateur.utilisateurID = article.utilisateurId INNER JOIN categorieJeu ON categorieJeu.categorieId = article.categorieID")
    const affichageCategorie = await querysql("SELECT categorieJeu.categorieId, categorieJeu.categorie, categorieJeu.image, categorieJeu.liens FROM categorieJeu;")
    const utilisateur = req.session.utilisateur
    res.render('admin/tableauDeBord', { affichage: affichageArticle,utilisateur:utilisateur, categorie: affichageCategorie})
}

//Affichage de l'interface ajouter une catégorie
exports.getCategoriePage =  (req, res) => {
    res.render('admin/ajoutCategorie')
}

//Poster la catégorie
exports.postCategorie = async (req, res) => {

    const { categorieId, categorie, image, description, liens } = req.body
    console.log(req.body);
    //Enregistrer l'image dans le fichier public/image/upload
    const imageUpload = req.files.image
    
    let imageName = imageUpload.name //Ici je rappelle le nom de l'image qui est dans le req.files.image. C'est un let car je vais la modifier ci-dessous
    console.log(imageName);
    const mimetype = imageUpload.mimetype.split('/')[1]//Ici je prends le mimetype du req.files.image et avec split je sépare en deux ce qui ressort (imageName) et je prends que la partie après le /
    const titreImage = req.body.categorie //Ici je rappelle le titre du req.body
    console.log(titreImage);
    imageName = titreImage + "." + mimetype // je recompose le nom de l'image qui va apparaitre dans le public/images/uploads avec le titre de l'image et l'extension
    console.log(imageName);
    imageUpload.mv(`public/images/uploads/${imageName}`, async (err) => {
        if (err) {
            return res.status(500).send(err)
        }
        try {
            await querysql('INSERT INTO categorieJeu(??,??,??,??) VALUES (?,?,?,?)', ['categorie','image','description','liens',categorie, imageName, description, liens],
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

//Afficher la page Modifier la catégorie
exports.affichageCategorie = async (req, res) => {
    const id = req.params.id
    const repriseDonnee = await querysql('SELECT categorieJeu.categorieId, categorieJeu.categorie, categorieJeu.image, categorieJeu.description, categorieJeu.liens FROM categorieJeu WHERE categorieId = ?', [id])
    
    res.render('admin/modificationCategorie', {repriseDonneeCategorie: repriseDonnee[0]})
}

//Modification de la catégorie

exports.modifierCategorie = async (req, res) => {
    const { categorieId, categorie, image, description, liens } = req.body
    const id = req.params.id
    console.log(req.body);
    //Enregistrer l'image dans le fichier public/image/upload
    const imageUpload = req.files.image
    
    let imageName = imageUpload.name //Ici je rappelle le nom de l'image qui est dans le req.files.image. C'est un let car je vais la modifier ci-dessous
    console.log(imageName);
    const mimetype = imageUpload.mimetype.split('/')[1]//Ici je prends le mimetype du req.files.image et avec split je sépare en deux ce qui ressort (imageName) et je prends que la partie après le /
    const titreImage = req.body.categorie //Ici je rappelle le titre du req.body
    console.log(titreImage);
    imageName = titreImage + "." + mimetype // je recompose le nom de l'image qui va apparaitre dans le public/images/uploads avec le titre de l'image et l'extension
    console.log(imageName);


    imageUpload.mv(`public/images/uploads/${imageName}`, async (err) => {
        if (err) {
            return res.status(500).send(err)
        }
        try {
            await querysql("UPDATE categorieJeu SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?", ['categorie',categorie,'image', imageName,'description', description,'liens', liens,'categorieId', id],
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

//Supression d'une categorie
exports.supressionCategorie = async (req, res) => {
    const id = req.params.id
    console.log(id);
    await querysql('DELETE FROM categorieJeu WHERE categorieId = ?',id)
    res.redirect('/tableau-de-bord')
}


//Affichage de l'interface ajouter un article
exports.getArticlePage = async (req, res) => {
    const categorieArticle = await querysql("SELECT categorieJeu.categorieId, categorieJeu.categorie FROM categorieJeu")
    const utilisateurArticle = await querysql("SELECT utilisateur.utilisateurID, utilisateur.pseudo FROM utilisateur")
    res.render('admin/ajoutArticle', { categories: categorieArticle, auteurs: utilisateurArticle })
}

//Poster l'article dans la base de donnée MySql
exports.postArticle = async (req, res) => {
    const { titre, image, categorieId, contenu, utilisateurId } = req.body
    console.log(req.body);


    //Enregistrer l'image dans le fichier public/image/upload
    const imageUpload = req.files.image
    
    let imageName = imageUpload.imageName //Ici je rappelle le nom de l'image qui est dans le req.files.image. C'est un let car je vais la modifier ci-dessous;
    
    const mimetype = imageUpload.mimetype.split('/')[1]//Ici je prends le mimetype du req.files.image et avec split je sépare en deux ce qui ressort (imageName) et je prends que la partie après le /
    const titreImage = req.body.titre //Ici je rappelle le titre du req.body

    imageName = titreImage + "." + mimetype // je recompose le nom de l'image qui va apparaitre dans le public/images/uploads avec le titre de l'image et l'extension

    imageUpload.mv(`public/images/uploads/${imageName}`, async (err) => {
        if (err) {
            return res.status(500).send(err)
        }
        try {
            await querysql('INSERT INTO article(??,??,??,??,??) VALUES (?,?,?,?,?)', ['titre','image','categorieId','contenu','utilisateurId',titre, imageName, categorieId, contenu, utilisateurId],
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
    const utilisateurArticle = await querysql("SELECT utilisateur.utilisateurID, utilisateur.pseudo FROM utilisateur")
    const id = req.params.id
    const article = await querysql("SELECT article.titre, article.contenu, article.image, article.articleId FROM article WHERE articleId =?", [id]) //WHERE articleId = '" + req.params.id + "';"
    res.render('admin/modificationArticle', { categories: categorieArticle, auteurs: utilisateurArticle, reprise: article[0] })

}

//Modification de l'article dans la base de donnée MySql
exports.modifierArticle = async (req, res) => {
    const { titre, image, categorieId, contenu, utilisateurId } = req.body
    const id = req.params.id

    const imageUpload = req.files.image
    
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
            await querysql("UPDATE article SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?", ['titre',titre,'image', imageName,'categorieId', categorieId,'contenu', contenu,'utilisateurId', utilisateurId,'articleId', id],

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