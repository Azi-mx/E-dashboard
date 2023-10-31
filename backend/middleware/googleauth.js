const passport = require('passport')
let User = require('../db/User')
// const rolemodel = require('./role')

var GoogleStrategy = require('passport-google-oauth20').Strategy;
 
passport.serializeUser((user , done) => { 
  done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
  done(null, user); 
}); 

passport.use(new GoogleStrategy({
    clientID: '134056057308-6nnhjp5udd7o7gq4f8ka2i2ns5ivrmrc.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://e-dashboard-azim.netlify.app/auth/google/callback",
    passReqToCallback: true
  },
  function(request,accessToken, refreshToken, profile, cb) {
    console.log(profile)
    User.findOrCreate({ googleId: profile.id }, function (err, user,created) {
      if(created) {
        
        user.created = true;
        user.profile = profile;
        // console.log("Created ",created);
        return cb(err, user);
      } else {
        user.created = false;
         console.log('Updated "%s"', user.googleId);
          return cb(err, user);
        
      }
    });
  }
));

const googleauthenticate = async (req,res)=>{
    console.log(req.user.profile)
    res.redirect('/');
 }
 module.exports = googleauthenticate