const validator = require('../middlewares/validator');
const validateJWT = require('../middlewares/validateJWT');
const validateRole = require('../middlewares/roles');


module.exports = {
    ...validator,
    ...validateJWT,
    ...validateRole,
}