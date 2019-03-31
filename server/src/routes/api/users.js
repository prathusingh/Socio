import express from 'express';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { errorCodes } from '../../constants/constants';
import keys from '../../config/keys';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
require('dotenv').config();

const router = express.Router();

/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public
 */
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Check whether user exists
  User.findOne({ email }).then(user => {
    if (user) {
      res.status(401).json({ error: errorCodes.emailExists });
    } else {
      const newUser = new User({
        name,
        email,
        password
      });

      // encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            res.status(500).json({ error: errorCodes.internalError });
          }
          newUser.password = hash;

          // save new user
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err =>
              res.status(500).json({ error: errorCodes.internalError })
            );
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
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check for user
  User.findOne({ email }).then(user => {
    if (!user) {
      res.status(401).json({ error: errorCodes.incorrectCredentials });
    }

    // Validate password
    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // Define payload for the token
          const payload = { id: user.id, name: user.name };
          // Sign token
          jwt.sign(
            payload,
            keys.secretKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          res.status(401).json({ error: errorCodes.incorrectCredentials });
        }
      })
      .catch(err => res.status(500).json({ error: errorCodes.internalError }));
  });
});

/**
 * @route GET api/users/profile
 * @desc Return current user
 * @access private
 */
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

/**
 * @route GET api/users/forgotpassword
 * @desc send reset password email
 * @access public
 */
router.post('/forgotpassword', (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(20).toString('hex');
  // Check for user
  User.findOneAndUpdate(
    { email },
    {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 360000
    },
    { new: true }
  )
    .then(user => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
      const mailOptions = {
        from: 'help.socio@gmail.com',
        to: user.email,
        subject: `Hey ${user.name}. Please reset using this link`,
        text:
          'You are receiving this because you have requested the reset of password for your account \n \n' +
          'Please click on the following link or paste this link in the browser to complete the process within one hour of receiving it \n \n' +
          `http://localhost:3000/resetpassword/${token} \n \n` +
          'If you did not request this please ignore this password and your password will remain unchanged'
      };
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            message:
              'Recovery mail sent. Please check your email associated with account'
          });
        }
      });
    })
    .catch(err => {
      res.status(401).json({ error: errorCodes.emailNotExists });
    });
});

/**
 * @route GET api/users/resetPassword
 * @desc verify token
 * @access public
 */
router.get('/resetpassword', (req, res) => {
  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken.trim(),
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }).then(user => {
    if (!user) {
      res.status(401).json({ error: errorCodes.tokenExpired });
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
router.post('/updatePassword', (req, res) => {
  const { password, resetPasswordToken } = req.body;
  User.findOneAndUpdate(
    {
      resetPasswordToken
    },
    {
      password
    },
    {
      new: true
    }
  )
    .then(user => {
      res.status(200).json('successfully updated');
    })
    .catch(err => {
      res.status(401).json({ error: errorCodes.passwordNotUpdated });
    });
});

export default router;
