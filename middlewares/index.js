const validator = require('../middlewares/validator');
const validateJWT = require('../middlewares/validateJWT');
const validateRole = require('../middlewares/roles');
const validateFile = require('../middlewares/validateFile');

module.exports = {
    ...validator,
    ...validateJWT,
    ...validateRole,
    ...validateFile,
}