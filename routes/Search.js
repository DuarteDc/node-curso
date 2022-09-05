const { Router } = require('express');

const { search } = require('../controllers/Search');

const router = Router();

router.get('/:collection/:query', search)

module.exports = router;