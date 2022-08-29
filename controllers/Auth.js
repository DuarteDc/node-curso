const { response, json } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/generateJWT');
const { validateGoogleToken } = require('../helpers/validateGoogleToken');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'El usuario / contraseña no son validos' });
        if (!user.status) return res.status(400).json({ message: 'El usuario / contraseña no son validos' });

        const validatePassword = bcryptjs.compareSync(password, user.password);
        if (!validatePassword) return res.status(400).json({ message: 'El usuario / contraseña no son validos' });

        const token = await generateJWT(user._id);

        res.json({
            user,
            token,
        });


    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal',
        });
    }

}


const loginWithGoogle = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { name, email, picture } = await validateGoogleToken(id_token);
        let user = await User.findOne({ email });

        if (!user) {
            const data = { name, email, password: '123456', image: picture, google: true };
            user = new User(data);
            await user.save();
        }

        if (!user.status) return res.status(400).json({ message: 'El usuario no es valido' });

        const token = await generateJWT(user._id);

        res.json({
            user,
            token
        });

    } catch (error) {

        res.status(400).json({ message: 'Token de google no valido' });

    }

}

module.exports = {
    login,
    loginWithGoogle,
}