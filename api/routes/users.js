const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/update/:id", async (req, res) => {
  const userdata = req.userData;

  try {
    if (!req.params.id) {
      return res.status(500).json("user not found");
    }
    if (req.params.id !== userdata.id) {
      return res.status(500).json("You are not authorized");
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
    }

    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
  const userdata = req.userData;
  try {
    if (req.params.id !== userdata.id) {
      return res.status(500).json("You are not authorized");
    }
    const user = await User.findById({ _id: req.params.id });
    const post = await Post.deleteMany({ username: user.username });
    await User.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json("User has been deleted");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;
