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
        enum: ['admin', 'user'],
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
});

module.exports = model('User', UserSchema)
