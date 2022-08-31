const { Router } = require('express');

const { validateJWT, validator } = require('../middlewares')
const { createProduct, getProducts } = require('../controllers/Products');
const { check } = require('express-validator');

const router = Router();

router

    .get('/', getProducts)

    .get('/:id',)

    .post('/', [
        validateJWT,
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('category', 'La categoría es requerida').not().isEmpty(),
        validator,
    ], createProduct)

    .put('/:id')

    .delete('/:id')


module.exports = router;
