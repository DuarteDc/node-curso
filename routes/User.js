const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validator, hasRole } = require('../middlewares');

const { getUsers, saveUser, updateUser, deleteUser } = require('../controllers/User');
const { isValidRole, existEmail, existUser } = require('../helpers/dbValidator');

const router = Router();


router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(existEmail),
    check('password', 'La contraseña debe ser mayor o igual a 8 caracteres').isLength({ min: 6 }),
    // check('rol', 'No es un rol valido').isIn(['admin', 'user']),
    check('rol').custom(isValidRole),
    validator
], saveUser);

router.put('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existUser),
    check('rol').custom(isValidRole),
    validator,
], updateUser);

router.delete('/:id', [
    validateJWT,
    // isAdmin,
    hasRole('admin', 'seller'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existUser),
    validator,
], deleteUser);

module.exports = router;