const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");

//CREATE
router.post("/post", async (req, res) => {
  try {
    const post = await Post.create(req.body);

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//Update

router.put("/post/update/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//DELETE
router.delete("/post/delete/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete({
      _id: req.params.id,
    });
    return res.status(200).json("Post has been delete");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//GET POST
router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//GET ALL POSTS
router.get("/posts", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;
