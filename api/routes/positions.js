const express = require('express');
const passport = require('passport');
const controllers = require('../controllers/positions');
const router = express.Router();

router.get('/:categoryId', controllers.getByCategoryId );
router.post('/', passport.authenticate('jwt', {session: false}), controllers.create );
router.patch('/:id', passport.authenticate('jwt', {session: false}), controllers.update );
router.delete('/:id', passport.authenticate('jwt', {session: false}), controllers.remove );

module.exports = router;
