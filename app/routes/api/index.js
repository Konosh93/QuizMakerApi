var router = require('express').Router();


router.use('/accounts', require('./accounts'));
router.use('/quizes', require('./quizes'));


module.exports = router;