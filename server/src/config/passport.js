import passportJwt from 'passport-jwt';
import googleToken from 'passport-google-token';
import mongoose from 'mongoose';
import keys from './keys';
import User from '../models/User';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const GoogleTokenStrategy = googleToken.Strategy;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretKey
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
    new GoogleTokenStrategy(
      {
        clientID: keys.googleClientId,
        clientSecret: keys.googleClientSecret
      },
      (accessToken, refreshToken, profile, done) => {
        User.upsertGoogleUser(
          accessToken,
          refreshToken,
          profile,
          (err, user) => {
            return done(err, user);
          }
        );
      }
    )
  );
};
