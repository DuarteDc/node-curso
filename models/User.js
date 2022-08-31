const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    google: {
        type: Boolean,
        default: false,
    },
    rol: {
        type: String,
        required: true,
        default: 'user',
    },
    status: {
        type: Boolean,
        default: true,
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema)
