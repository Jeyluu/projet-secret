exports.verifCo = (req,res,next) => {
    if(req.session.utilisateur == undefined) {
        return res.redirect('/admin/connexion')
    } else {
        next()
    }
}