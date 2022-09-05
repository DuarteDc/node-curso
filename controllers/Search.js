const { response } = require('express');
const { User, Categories, Products } = require('../models');

const { ObjectId } = require('mongoose').Types;


const collections = [
    'users',
    'categories',
    'products',
];

const searchUser = async (query = '', res = response) => {

    const isMongoId = ObjectId.isValid(query);

    if (isMongoId) {
        const user = await User.findById(query);
        return res.json({
            results: user ? [user] : [],
        });
    }

    const regexQuery = new RegExp(query, 'i');

    const [users, totalDocs] = await Promise.all([
        User.find({
            $or: [{ name: regexQuery }, { email: regexQuery }],
            $and: [{ status: true }],
        }),
        User.countDocuments({
            $or: [{ name: regexQuery }, { email: regexQuery }],
            $and: [{ status: true }],
        }),
    ]);


    res.json({
        results: users,
        totalDocs,
    })

}


const searchCategory = async (query = '', res = response) => {

    const isMongoId = ObjectId.isValid(query);

    if (isMongoId) {
        const category = await Categories.findById(query);
        return res.json({
            results: category ? [category] : [],
        });
    }

    const regexQuery = new RegExp(query, 'i');

    const [categories, totalDocs] = await Promise.all([
        Categories.find({
            $or: [{ name: regexQuery }],
            $and: [{ status: true }],
        }),
        Categories.countDocuments({
            $or: [{ name: regexQuery }],
            $and: [{ status: true }],
        }),
    ]);


    res.json({
        results: categories,
        totalDocs,
    })

}


const searchProduct = async (query = '', res = response) => {

    const isMongoId = ObjectId.isValid(query);

    if (isMongoId) {
        const products = await Products.findById(query);
        return res.json({
            results: products ? [products] : [],
        });
    }

    const regexQuery = new RegExp(query, 'i');

    const [products, totalDocs] = await Promise.all([
        Products.find({
            $or: [{ name: regexQuery }, { description: regexQuery }],
            $and: [{ status: true }],
        }).populate('category'),
        Products.countDocuments({
            $or: [{ name: regexQuery }, { description: regexQuery }],
            $and: [{ status: true }],
        }),
    ]);


    res.json({
        results: products,
        totalDocs,
    })

}

const search = async (req, res = response) => {

    const { collection, query } = req.params;

    if (!collections.includes(collection)) return res.status(400).json({ message: 'La colección no es valida' });

    switch (collection) {

        case 'users':
            await searchUser(query, res);
            break;

        case 'categories':
            await searchCategory(query, res);
            break;

        case 'products':
            await searchProduct(query, res);
            break;

        default:
            return res.status(500).json({ message: 'La colección no es valida' });

    }

}

module.exports = {
    search
}