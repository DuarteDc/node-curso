const { Router } = require('express');
const { check } = require('express-validator');

const { validator, validateJWT } = require('../middlewares');

const { getCategories, createCategory, getCategory } = require('../controllers/Categories');
const { isCategoryIdValid } = require('../helpers/dbValidator');

const router = Router();

router

    .get('/', getCategories)

    .get('/:id', [
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom(isCategoryIdValid),
        validator,
    ], getCategory)

    .post('/', [
        validateJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validator,
    ], createCategory)

    .put('/:id')

    .delete('/:id')



module.exports = router;