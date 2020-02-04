require('dotenv').config({ path : '../.env.dev' });
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

// Used to stuff a piece of information into a cookie
passport.serializeUser((user,done) => {
  done(null,user.id);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((id,done) => {
  User.findById(id).then((user) => {
    done(null,user);
  });
});

const {PASSPORT_CLIENT_ID,PASSPORT_CLIENT_SECRET,APP_URL} = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID : PASSPORT_CLIENT_ID,
      clientSecret : PASSPORT_CLIENT_SECRET,
      callbackURL : `${APP_URL}/auth/google/callback`,
      proxy : true,
    },
    async (accessToken,refreshToken,profile,cb,done) => {
      try {
        const existingUser = await User.findOne({ googleId : cb.id });
        if (existingUser) {
          return done(null,existingUser);
        }

        const pic = cb.photos[0].value ? cb.photos[0].value : '';
        const user = await new User({
          googleId : cb.id,
          name : cb.name.givenName,
          email : cb.emails[0].value,
          picture : pic,
        }).save();
        done(null,user);
      } catch (err) {
        done(err,null);
      }
    },
  ),
);
