const { response } = require('express');
const { Products } = require('../models');

const getProducts = async (req, res = response) => {

    const { limit, init } = req.query;

    const [totalDocuments, products] = await Promise.all([
        Products.countDocuments({ status: true }),
        Products.find({ status: true }).skip(+init).limit(+limit).populate('user'),
    ]);

    res.json({
        totalDocuments, 
        products
    })

}

const createProduct = async (req, res = response) => {

    const { status, available, ...data } = req.body;

    const product = new Products(data);
    product.user = req.user.id;
    await product.save();

    res.status(201).json({
        message: 'El producto se creo con exito',
        product,
    })

}


module.exports = {
    getProducts,
    createProduct,
}