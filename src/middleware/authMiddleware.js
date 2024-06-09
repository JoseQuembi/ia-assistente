module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        req.flash('error_msg', 'Por favor, faça login para acessar esta página.');
        res.redirect('/login');
    }
};
