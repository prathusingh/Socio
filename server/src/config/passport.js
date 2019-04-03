import passportJwt from 'passport-jwt';
import googleToken from 'passport-google-token';
import mongoose from 'mongoose';
import keys from './keys';
import User from '../models/User';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const GoogleStrategy = googleToken.Strategy;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretKey
};

const googleOpts = {
  clientID: keys.googleClientId,
  clientSecret: keys.googleClientSecret
};

export default passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id).then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );

  passport.use(
    new GoogleStrategy(
      googleOpts,
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ 'googleProvider.id': profile.id }).then(user => {
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleProvider: {
                id: profile.id,
                token: accessToken
              }
            });

            // save new user
            newUser
              .save()
              .then(user => {
                return done(null, user);
              })
              .catch(err => {
                return done(null, false);
              });
          }
        });
      }
    )
  );
};
