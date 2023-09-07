const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const path = require("path");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
const multer = require("multer");
const verifyToken = require("./middlewares/jwt");
const connectDB = require("./db");
const { verify } = require("jsonwebtoken");

connectDB();
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post(
  "/upload",
  upload.single("file", (req, res) => {
    try {
      return res.status(200).json("file uploaded sucessfully");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  })
);

app.use("/", authRoute);
app.use("/api", verifyToken, userRoute);
app.use("/api/post", verifyToken, postRoute);
app.use("/", catRoute);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
