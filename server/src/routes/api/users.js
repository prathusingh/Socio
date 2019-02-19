import express from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";

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
      res.status(400).json("error: email already exists");
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
            throw err;
          }
          newUser.password = hash;

          // save new user
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

export default router;
