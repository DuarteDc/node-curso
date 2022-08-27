const { Router } = require('express');
const router = Router();
//Controllers
const AuthController = require('../controllers/Auth');

router.post('/login', AuthController);

module.exports = router;