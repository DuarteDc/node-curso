const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const getUsers = (req, res = response) => {
    res.json('get users');
}

const saveUser = async (req, res = response) => {

    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.json({ user })

}

const updateUser = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        message: 'El usuario se actualizó con exito',
        user
    })

}

const deleteUser = (req, res = response) => {
    res.json('get users');
}

module.exports = {
    getUsers,
    saveUser,
    updateUser,
    deleteUser
}