const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER

router.post("/register", async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(500).json("Username Required");
    }
    if (!req.body.email) {
      return res.status(500).json("Email Required");
    }
    if (!req.body.password) {
      return res.status(500).json("Password Required");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(500).json("Email feild empty");
    }
    if (!req.body.password) {
      return res.status(500).json("Password feild empty");
    }
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(500).json("user not found");
    }
    const originalPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!originalPassword) {
      return res.status(500).json("Wrong password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SEC);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
