const { Router } = require('express');
const router = Router();

const { getUsers, saveUser, updateUser, deleteUser } = require('../controllers/User');

router.get('/', getUsers);
router.post('/', saveUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;