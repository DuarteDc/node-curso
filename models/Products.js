const { Schema, model } = require('mongoose');

const ProductSchema = Schema({

    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    }

});

ProductSchema.methods.toJSON = function () {
    const { __v,...user } = this.toObject();
    return user;
}


module.exports = model('Product', ProductSchema);