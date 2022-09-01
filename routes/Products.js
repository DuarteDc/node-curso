const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validator } = require('../middlewares')
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/Products');
const { isProductIdValid } = require('../helpers/dbValidator');

const router = Router();

router

    .get('/', getProducts)

    .get('/:id', [
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom(isProductIdValid),
        validator,
    ], getProduct)

    .post('/', [
        validateJWT,
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('category', 'La categoría es requerida').not().isEmpty(),
        validator,
    ], createProduct)

    .put('/:id', [
        validateJWT,
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom(isProductIdValid),
        validator,
    ], updateProduct)

    .delete('/:id', [
        validateJWT,
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom(isProductIdValid),
        validator,
    ], deleteProduct);


module.exports = router;
