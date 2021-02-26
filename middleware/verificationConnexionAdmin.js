exports.verifierConnexion = (req, res, next) => {
    if(req.session.utilisateur == undefined) {
        req.flash("message","Vous n'êtes pas un administrateur demi tour")
        return res.redirect('/admin/connexion')
    } else {
        next()
    }
    
}