import express from "express";
import User from "../../models/User";

const router = express.Router();

/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public
 */
router.get("/register", (req, res) => {
  res.json({ msg: "route works" });
});

export default router;
