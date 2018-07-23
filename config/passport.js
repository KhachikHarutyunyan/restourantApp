const passport = require('passport');
const fbStrategy = require('passport-facebook').Strategy;
const ggStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const configAuth = require('./auth');

passport.use(new fbStrategy({
  clientID: configAuth.fbAuth.clientID,
  clientSecret: configAuth.fbAuth.clientSecret,
  clientURL: configAuth.fbAuth.clientURL,
  profileFields: ['id', 'email', 'first_name', 'last_name']
}, (token, refreshToken, profile, done) => {
  process.nextTick(() => {
    User.findOne({ 'facebook.id': profile.id }, (err, user) => {
      if (err) return done(err);

      if (user) {
        return done(null, user);
      } else {
        const newUser = new User();
        newUser.facebook.id = profile.id;
        newUser.facebook.token = token;
        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

        newUser.save((err) => {
          if (err) {
            throw err;
          } else {
            return done(null, newUser);
          }
        });
      }

    });
  });
} ));


passport.use(new ggStrategy({
  clientID: configAuth.ggAuth.clientID,
  clientSecret: configAuth.ggAuth.clientSecret,
  clientURL: configAuth.ggAuth.clientURL
}, 
//   (token, refreshToken, profile, done) => {
//   console.log(profile);
//   process.nextTick(() => {
//     User.findOne({ 'google.id': profile.id }, (err, user) => {
//       if (err) return done(err);

//       if (user) {
//         return done(null, user);
//       } else {
//         const newUser = new User();
//         newUser.google.id = profile.id;
//         newUser.google.token = token;
//         newUser.google.name = profile.displayName;
//         newUser.google.email = profile.emails[0].value;

//         newUser.save((err) => {
//           if (err) {
//             throw err;
//           } else {
//             return done(null, newUser);
//           }
//         });
//       }

//     });
//   });
// }

function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}

));
