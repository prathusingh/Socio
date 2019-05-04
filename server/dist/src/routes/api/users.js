"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../../models/User"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _passport = _interopRequireDefault(require("passport"));

var _constants = require("../../constants/constants");

var _keys = _interopRequireDefault(require("../../config/keys"));

var _crypto = _interopRequireDefault(require("crypto"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var router = _express["default"].Router();
/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public
 */


router.post('/register', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password; // Check whether user exists

  _User["default"].findOne({
    email: email
  }).then(function (user) {
    console.log(user);

    if (user) {
      res.status(401).json({
        error: _constants.errorCodes.emailExists
      });
    } else {
      var newUser = new _User["default"]({
        name: name,
        email: email,
        password: password
      }); // encrypt password

      _bcrypt["default"].genSalt(10, function (err, salt) {
        _bcrypt["default"].hash(newUser.password, salt, function (err, hash) {
          if (err) {
            res.status(500).json({
              error: _constants.errorCodes.internalError
            });
          }

          newUser.password = hash;
          console.log(user); // save new user

          newUser.save().then(function (user) {
            return res.json(user);
          })["catch"](function (err) {
            return res.status(500).json({
              error: _constants.errorCodes.internalError
            });
          });
        });
      });
    }
  });
});
/**
 * @route POST api/users/login
 * @desc Login user / Returning JWT Token
 * @access Public
 */

router.post('/login', function (req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password; // Check for user

  _User["default"].findOne({
    email: email
  }).then(function (user) {
    if (!user) {
      res.status(401).json({
        error: _constants.errorCodes.incorrectCredentials
      });
    } // Validate password


    _bcrypt["default"].compare(password, user.password).then(function (isMatch) {
      if (isMatch) {
        // Define payload for the token
        var payload = {
          id: user.id,
          name: user.name
        }; // Sign token

        _jsonwebtoken["default"].sign(payload, _keys["default"].secretKey, {
          expiresIn: 3600
        }, function (err, token) {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
      } else {
        res.status(401).json({
          error: _constants.errorCodes.incorrectCredentials
        });
      }
    })["catch"](function (err) {
      return res.status(500).json({
        error: _constants.errorCodes.internalError
      });
    });
  });
});
/**
 * @route GET api/users/profile
 * @desc Return current user
 * @access private
 */

router.get('/profile', _passport["default"].authenticate('jwt', {
  session: false
}), function (req, res) {
  res.json(req.user);
});
/**
 * @route GET api/users/forgotpassword
 * @desc send reset password email
 * @access public
 */

router.post('/forgotpassword', function (req, res) {
  var email = req.body.email;

  var token = _crypto["default"].randomBytes(20).toString('hex'); // Check for user


  _User["default"].findOneAndUpdate({
    email: email
  }, {
    resetPasswordToken: token,
    resetPasswordExpires: Date.now() + 360000
  }, {
    "new": true
  }).then(function (user) {
    var transporter = _nodemailer["default"].createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    var mailOptions = {
      from: 'help.socio@gmail.com',
      to: user.email,
      subject: "Hey ".concat(user.name, ". Please reset using this link"),
      text: 'You are receiving this because you have requested the reset of password for your account \n \n' + 'Please click on the following link or paste this link in the browser to complete the process within one hour of receiving it \n \n' + "http://localhost:3000/resetpassword/".concat(token, " \n \n") + 'If you did not request this please ignore this password and your password will remain unchanged'
    };
    transporter.sendMail(mailOptions, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          message: 'Recovery mail sent. Please check your email associated with account'
        });
      }
    });
  })["catch"](function (err) {
    res.status(401).json({
      error: _constants.errorCodes.emailNotExists
    });
  });
});
/**
 * @route GET api/users/resetPassword
 * @desc verify token
 * @access public
 */

router.get('/resetpassword', function (req, res) {
  _User["default"].findOne({
    resetPasswordToken: req.query.resetPasswordToken,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }).then(function (user) {
    if (!user) {
      res.status(401).json({
        error: _constants.errorCodes.tokenExpired
      });
    } else {
      res.status(200).json('looks good');
    }
  });
});
/**
 * @route POST api/users/updatePassword
 * @desc update password
 * @access public
 */

router.post('/updatePassword', function (req, res) {
  var _req$body3 = req.body,
      password = _req$body3.password,
      resetPasswordToken = _req$body3.resetPasswordToken;

  _User["default"].findOneAndUpdate({
    resetPasswordToken: resetPasswordToken
  }, {
    password: password
  }, {
    "new": true
  }).then(function (user) {
    res.status(200).json('successfully updated');
  })["catch"](function (err) {
    res.status(401).json({
      error: _constants.errorCodes.passwordNotUpdated
    });
  });
});
/**
 * @route POST api/users/auth/google/token
 * @desc authentication with google
 * @access private
 */

router.post('/auth/google/token', _passport["default"].authenticate('google-token', {
  session: false
}), function (req, res) {
  if (!req.user) {
    res.status(401).json({
      error: _constants.errorCodes.incorrectCredentials
    });
  } else {
    // Define payload for the token
    var payload = {
      id: req.user.id,
      name: req.user.name
    }; // Sign token

    _jsonwebtoken["default"].sign(payload, _keys["default"].secretKey, {
      expiresIn: 3600
    }, function (err, token) {
      res.json({
        success: true,
        token: 'Bearer ' + token
      });
    });
  }
});
var _default = router;
exports["default"] = _default;