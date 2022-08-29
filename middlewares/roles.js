const { response } = require("express")

const isAdmin = (req, res = response, next) => {

    if (!req.user) return res.status(500).json({ message: 'User is required' });

    if (req.user.rol !== 'admin') return res.status(401).json({ message: 'unauthorized user' });

    next();

}

const hasRole = (...roles) => {

    return (req, res = response, next) => {
        if (!req.user) return res.status(500).json({ message: 'User is required' });

        if (!roles.includes(req.user.rol)) return res.status(401).json({ message: 'unauthorized user' });

        next();
    }

}


module.exports = {
    isAdmin,
    hasRole,
}
