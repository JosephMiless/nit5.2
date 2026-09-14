const env = require("../config/env");
const jwt = require("jsonwebtoken");

const logger = (req, res, next) => {
  console.log(`you hit this route: ${req.url} ${new Date()}`);

  next();
};

const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({
      error: `Unauthorized!`,
    });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, env.aSecret, (error, decoded) => {
    if (error) {
      return res.status(400).json({
        error: `Invalid token`,
      });
    }

    req.user = decoded;
  });

  next();
};

const adminAuth = (req, res, next) => {
  const user = req.user;

  if(req.user !== 'ADMIN'){
    return res.status(403).json({error: "You do not have access to this endpoint"});
  };

  next();
}

module.exports = {logger, authorize, adminAuth};