const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllers = require('../controllers/order');

router.get('/', passport.authenticate('jwt', { session: false }), controllers.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), controllers.create);

module.exports = router;
