const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ msg: "Unauthorized HTTP, Token not provided." });
  try {
    token = token.replace("Bearer", "").trim(); // Remove Bearer from string
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

module.exports = authToken;
