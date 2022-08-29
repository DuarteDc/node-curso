const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');

const { validator } = require('../middlewares');
//Controllers
const { login, loginWithGoogle } = require('../controllers/Auth');

router
    .post('/login', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria'),
        validator,
    ], login)
    
    .post('/login-google', [
        check('id_token', 'El id token es requerido').not().isEmpty(),
    ], loginWithGoogle)

module.exports = router;