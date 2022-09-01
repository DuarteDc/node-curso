const { response } = require('express');
const { Products } = require('../models');

const getProducts = async (req, res = response) => {

    const { limit, init } = req.query;

    const [totalDocuments, products] = await Promise.all([
        Products.countDocuments({ status: true }),
        Products.find({ status: true }).skip(+init).limit(+limit).populate(['user', 'category']),
    ]);

    res.json({
        totalDocuments,
        products
    })

}

const getProduct = async (req, res = response) => {

    const { id } = req.params;

    const product = await Products.findById(id).populate(['user', 'category']);

    res.json({
        product
    })

}

const createProduct = async (req, res = response) => {

    const { status, available, ...data } = req.body;

    const product = new Products(data);
    product.user = req.user._id;
    await product.save();

    res.status(201).json({
        message: 'El producto se creo con exito',
        product,
    })

}

const updateProduct = async (req, res = response) => {

    const { id } = req.params;
    const { status, available, ...data } = req.body;

    const product = await Products.findByIdAndUpdate(id, data, { new: true }).populate(['user', 'category']);

    res.json({
        message: 'El producto se actualizó con exito',
        product
    })

}

const deleteProduct = async (req, res = response) => {

    const { id } = req.params;

    const product = await Products.findByIdAndUpdate(id, { status: false }, { new: true }).populate(['user', 'category']);

    res.json({
        message: 'El producto se elimino con exito',
        product,
    });

}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}