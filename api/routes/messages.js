const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllers = require('../controllers/messages');

router.get('/:id', passport.authenticate('jwt', { session: false }), controllers.getUserMessage);
router.post('/', passport.authenticate('jwt', { session: false }), controllers.saveMessage);

module.exports = router;
