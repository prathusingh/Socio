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

  // Check for user
  User.findOne({ email }).then(user => {
    if (!user) {
      res.status(401).json({ error: errorCodes.emailNotExists });
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      console.log(token);
      User.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000
      });
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          password: process.env.PASSWORD
        }
      });
      const mailOptions = {
        from: 'help.socio@gmail.com',
        to: user.email,
        subject: 'Link to reset password',
        text:
          'You are receiving this because you have requested the reset of password for your account \n \n' +
          'Please click on the following link or paste this link in the browser to complete the process within one hour of receiving it \n \n' +
          `http://localhost:3000/reset/${token} \n \n` +
          'If you did not request this please ignore this password and your password will remain unchanged'
      };

      console.log('sending mail');
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.log(err);
        } else {
          res
            .status(200)
            .json(
              'Recovery mail sent. Please check your email associated with account'
            );
        }
      });
    }
  });
});

export default router;
