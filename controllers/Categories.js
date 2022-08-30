const { response } = require('express');

const { Categories } = require('../models');

const getCategories = async (req, res = response) => {

    const { limit, init } = req.query;

    const [totalDocuments, categories] = await Promise.all([
        Categories.countDocuments({ status: true }),
        Categories.find({ status: true }).skip(+init).limit(+limit).populate('user'),
    ]);

    res.json({
        totalDocuments,
        categories
    })

}

const getCategory = async (req, res = response) => {

    const { id } = req.params;

    const category = await Categories.findOne({ _id: id, status: true }).populate('user');

    if (!category) return res.status(401).json({ message: 'La categoría no existe' });

    res.json({
        category
    });

}

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    let category = await Categories.findOne({ name });
    if (category) return res.status(400).json({ message: `La categoría ${name}, ya existe` });

    const data = {
        name,
        user: req.user._id,
    }

    category = await Categories(data);
    await category.save();

    res.status(201).json({
        message: 'La categoría se creo con exito',
        category,
    })

}

const updateCategory = async () => {

}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
}