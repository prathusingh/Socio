"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

var _passportGoogleToken = _interopRequireDefault(require("passport-google-token"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _keys = _interopRequireDefault(require("./keys"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JwtStrategy = _passportJwt["default"].Strategy;
var ExtractJwt = _passportJwt["default"].ExtractJwt;
var GoogleStrategy = _passportGoogleToken["default"].Strategy;
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: _keys["default"].secretKey
};
var googleOpts = {
  clientID: _keys["default"].googleClientId,
  clientSecret: _keys["default"].googleClientSecret
};

var _default = function _default(passport) {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    _User["default"].findById(jwt_payload.id).then(function (user) {
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    });
  }));
  passport.use(new GoogleStrategy(googleOpts, function (accessToken, refreshToken, profile, done) {
    _User["default"].findOne({
      'googleProvider.id': profile.id
    }).then(function (user) {
      if (user) {
        return done(null, user);
      } else {
        var newUser = new _User["default"]({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleProvider: {
            id: profile.id,
            token: accessToken
          }
        }); // save new user

        newUser.save().then(function (user) {
          return done(null, user);
        })["catch"](function (err) {
          return done(null, false);
        });
      }
    });
  }));
};

exports["default"] = _default;