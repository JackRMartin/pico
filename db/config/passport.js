var passport = require('passport');
var path = require('path');
var Strategy = require('passport-local')
var db = require('../config');
var User = require('../../models/User');
const bcrypt = require('bcrypt');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
  console.log('serialize useradkjaskjfadskjkjhadfkjadsfkjl', user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('deserializeUser userasdfasdfasdfasd', obj)
  done(null, obj);
});

passport.use(new Strategy({  
  passReqToCallback : true
},
  function(req, username, password, done) {
    User.findOne({where: { username: username }})
    .then( function(user) { 
      console.log('useruseruserusersuer', user)
      if (!user) {
        console.log('No user found');
        return done(null, false, { message: 'No User Found.' });        
      } else {
        console.log('Found one user');
        bcrypt.compare(password, user.dataValues.password, function(err, isMatch) {
          if (err) {
            console.log('bycrupt match error');
            done(err);
          } 
          if (isMatch) {
            console.log('bycrypt match true');
            done(null, user);
          } else {
            console.log('bycrtup match false', isMatch);
            done(null, false, { message: 'No User Found.' });
          }
        });
      }
    }).catch(function(err) {
      console.error('err', err)
      done(err, null, null);
    });
  }
));


passport.use(new GitHubStrategy({
    clientID: 'f864f0df17178ff53b7b',
    clientSecret: 'd37ad17231f09cf864805e8ffa832b56ba59a855',
    callbackURL: 'http://picoshell.com//github/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    if (profile.displayName) {
      var nameArray = profile.displayName.split(' ');
    } else {
      var nameArray = ['', ''];
    }
    var user = {
      username: profile.username,
      bio: profile._json.bio || '',
      firstName: nameArray[0],
      lastName: nameArray[nameArray.length - 1],
      email: profile.emails[0].value,
      authenticatedWith: 'github'
    };
    User.updateOrCreate(user, function(err, user1) {
      console.log('user1', user1)
      cb(null, user);
    });
  }
));
