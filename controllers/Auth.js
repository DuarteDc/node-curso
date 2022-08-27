const { response } = require('express');

const User = require('../models/User');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'El usuario / contraseña no son validos' });


    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal',
        });
    }

}

module.exports = {
    login,
}