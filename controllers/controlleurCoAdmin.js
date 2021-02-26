const bcrypt = require('bcrypt')


//Affichage de la page Inscription
exports.pageInscription = async (req, res) => {
    res.render('admin/inscription',{message : req.flash('message')})
}

//Affichage de la page connexion Admin
exports.pageCoAdmin = async (req, res) => {
    res.render('admin/coAdmin',{message : req.flash('message'), messemail:req.flash("messemail"), messmdp:req.flash("messmdp")})
}

//Enregistrement dans la DB
exports.postInscription = async (req, res) => {

    const { nom, prenom, pseudo, email, motdepasse } = req.body

    //si l'email existe, on execute la commande mysql COUNT
    const findEmail = await querysql('SELECT COUNT(*) AS cnt FROM utilisateur WHERE email=?', [email])

    //Si la requête Count renvoi un chiffre inférieur supérieur à 0 alors l'Email existe et donc la commande ci-dessous s'execute
    if (findEmail[0].cnt > 0) {
        req.flash("message", "L'email déjà existant")
        return res.redirect('/admin/inscription')
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

//Connexion de la page
exports.postConnexion = async (req, res) => {

    const {email,motdepasse} = req.body

    //si l'email n'existe pas
    const findEmail = await querysql('SELECT COUNT(*) AS cnt FROM utilisateur WHERE email=?', [email])
    
    if(!findEmail[0].cnt > 0) {
        req.flash("messemail", "L'email n'existe pas. Merci de vous inscrire sur l'onglet inscription")
        return res.redirect('/admin/connexion')
    }

    //si l'email existe 
    //Verifier le mot de passe
    const utilisateur = await querysql('SELECT utilisateurId,nom, prenom,pseudo, email, motdepasse FROM utilisateur WHERE email = ?', [email])
    const checkpassword = await bcrypt.compare(motdepasse,utilisateur[0].motdepasse)

    if(!checkpassword) {
        req.flash("messmdp","Le mot de passe ne correspond pas")
        return res.redirect('/admin/connexion')
    } else {
        console.log("req.ression :",utilisateur);
        req.session.utilisateurId = utilisateur[0].utilisateurId
        req.session.utilisateur = {
            id: utilisateur[0].utilisateurId,
            nom: utilisateur[0].nom,
            prenom: utilisateur[0].prenom,
            pseudo: utilisateur[0].pseudo,
            email: utilisateur[0].email,
        }
        return res.redirect("/tableau-de-bord")
    }

}

//Deconnexion
exports.deconnexion = async (req, res) => {
    req.session.destroy(function(err){
        res.redirect('/')
    }) 
}