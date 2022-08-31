const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.json({ msg: 'Endpoint of products' });
});


module.exports = router;
