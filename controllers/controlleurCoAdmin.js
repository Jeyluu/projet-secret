const bcrypt = require('bcrypt')


//Affichage de la page Inscription
exports.pageInscription = async (req, res) => {
    res.render('admin/inscription')
}

//Enregistrement dans la DB
exports.postInscription = async (req, res) => {

    const { nom, prenom, pseudo, email, motdepasse } = req.body

    //si l'email existe, on execute la commande mysql COUNT
    const findEmail = await querysql('SELECT COUNT(*) AS cnt FROM utilisateur WHERE email=?', [email])

    //Si la requête Count renvoi un chiffre inférieur supérieur à 0 alors l'Email existe et donc la commande ci-dessous s'execute
    if (findEmail[0].cnt > 0) {
        req.flash("message", "L'email déjà existant")
        return res.redirect('/inscription')
    }


    //Si l'email n'existe pas alors on ajoute un utilisateur
    try {

        //hasher le mot de passe
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(motdepasse, salt)

        await querysql("INSERT INTO utilisateur (nom, prenom,pseudo, email, motdepasse) VALUES(?,?,?,?,?)",
            [nom, prenom, pseudo, email, hash],
            (err, result) => {
                if (err) {
                    req.flash("message", `Il y a une erreur ${err}`)
                    return res.redirect('/admin/inscription')
                }
                req.flash("message", `Merci de votre inscription ! Vous pouvez maintenant vous connecter`)
                return res.redirect('/admin/connexion')
            }
        )

    } catch (err) {
        res.status(400).json({ message: err })
    }

}

//Affichage de la page connexion Admin
exports.pageCoAdmin = async (req, res) => {
    res.render('admin/coAdmin')
}