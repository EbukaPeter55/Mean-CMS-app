const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Check the headers to see if a token is present and render appropriate messages
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_this_should_be_longer");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
