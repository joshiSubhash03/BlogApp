const router = require("express").Router();
const Category = require("../models/category");

//CREATE

router.post("/cat", async (req, res) => {
  try {
    const cat = await Category.create(req.body);
    return res.status(200).json(cat);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//GET
router.get("/cats", async (req, res) => {
  try {
    const cats = await Category.find();
    return res.status(200).json(cats);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;
