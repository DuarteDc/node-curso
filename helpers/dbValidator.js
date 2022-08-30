const { Categories, User, Role } = require("../models");

const isValidRole = async (rol = '') => {
    const isValid = await Role.findOne({ rol });
    if (!isValid) throw new Error(`El rol ${rol} no es valido`);
}

const existEmail = async (email = '') => {
    const isEmailValid = await User.findOne({ email });
    if (isEmailValid) throw new Error('El correo ya ha sido registrado');
}

const existUser = async (_id) => {
    const user = await User.findById(_id);
    if (!user) throw new Error(`El id no es valido`);
}

const isCategoryIdValid = async (_id) => {
    const category = await Categories.findById(_id);
    if (!category) throw new Error('El id no es valido');
}

module.exports = {
    isValidRole,
    existEmail,
    existUser,
    isCategoryIdValid,
}