const { response, request } = require('express');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('token');

    if (!token) return res.status(401).json({ message: 'token is required' });

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_JWT_KEY);
        const user = await User.findById(_id);

        if(!user) return res.status(404).json({ message: 'El usuario no existe' });

        if (!user.status) return res.status(404).json({ message: 'El usuario no existe' });

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'token is not valid' });
    }

}

module.exports = {
    validateJWT,
}