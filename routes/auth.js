
const router = require('express').Router;
const passport = require('passport');

// router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// router.get('/auth/facebook/callback', passport.authenticate('facebook'), { 
//     successRedirect: '/profile',
//     failureRedirect: '/'
//   });


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/',
}));

module.exports = router;
