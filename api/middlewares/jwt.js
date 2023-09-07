const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authheader = req.headers.token;
  if (!authheader) {
    return res.status(500).send("Token not found");
  } else {
    const token = authheader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.send("Token is not valid");
      } else {
        req.userData = user;
        next();
      }
    });
  }
};

module.exports = verifyToken;
