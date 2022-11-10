const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).json("A token is required for authentication");
    }
    try {
      const { sub } = jwt.verify(token, '*key secret token*');
      req.id = sub;
    } catch (err) {
      return res.status(401).json("Invalid Token");
    }
    return next();
  };
  
  module.exports = verifyToken;