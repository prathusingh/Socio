import express from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { errorCodes } from "../../constants/constants";
import keys from "../../config/keys";

const router = express.Router();

/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public
 */
router.post("/register", (req, res) => {
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
router.post("/login", (req, res) => {
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
                token: "Bearer " + token
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
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

export default router;
