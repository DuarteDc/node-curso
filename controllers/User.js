const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const getUsers = async (req, res = response) => {

    const { limit = 5, init = 0 } = req.query;

    // const users = await User.find({ status: true }).skip(+init).limit(+limit);
    // const totalDocuments = await User.countDocuments({ status: true });

    const [totalDocuments, users] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true }).skip(+init).limit(+limit),
    ]);

    res.json({
        totalDocuments,
        users,
    });

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
        user,
    });

}

const deleteUser = async (req, res = response) => {

    const { id } = req.params;

    //delete user 
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json({
        message: 'El usuario se elimino con exito',
        user
    });

}

module.exports = {
    getUsers,
    saveUser,
    updateUser,
    deleteUser
}