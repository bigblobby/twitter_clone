const router = require('express').Router();
const controller = require('../Controller/User.controller');

router.post('/create', controller.create);

module.exports = router;
