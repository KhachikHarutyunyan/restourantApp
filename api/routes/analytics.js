const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/analytics');

router.get('/overview', passport.authenticate('jwt', { session: false }), controller.overview);
router.get('/useroverview', passport.authenticate('jwt', { session: false }), controller.userOverview);
router.get('/analytics', passport.authenticate('jwt', { session: false }), controller.analytics);
router.get('/useranalytics', passport.authenticate('jwt', { session: false }), controller.userAnalytics);

module.exports = router;
