const { Router } = require('express');
const { check } = require('express-validator');

const { validator, validateFile } = require('../middlewares');
const { uploadFile, updateFileCloudinary, showImage } = require('../controllers/Uploads');
const { validateCollection } = require('../helpers');

const router = Router();

router

    .post('/', [
        validateFile,
    ], uploadFile)

    .put('/:collection/:id', [
        validateFile,
        check('id', 'El id no es valido').isMongoId(),
        check('collection').custom(collection => validateCollection(collection, ['users', 'products'])),
        validator,
    ], updateFileCloudinary)


    .get('/:collection/:id', [
        check('id', 'El id no es valido').isMongoId(),
        check('collection').custom(collection => validateCollection(collection, ['users', 'products'])),
        validator,
    ], showImage)

module.exports = router;    