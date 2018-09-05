const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllers = require('../controllers/checkout');

router.get('/', passport.authenticate('jwt', { session: false }), controllers.getAllCheckoutes);
router.get('/:id', controllers.getAllUserCheckoutes);
router.post('/', controllers.createCheckout);

module.exports = router;
