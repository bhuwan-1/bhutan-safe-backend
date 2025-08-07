const jwt = require("jsonwebtoken");

async function verifyUser(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Token verification failed",
      });
    }
  }
}

module.exports = { verifyUser };
