const jwt = require("jsonwebtoken");
const env = require("./env");

const aToken = (payload) => {
  return jwt.sign(payload, env.aSecret, { expiresIn: "1h" });
};

module.exports = aToken;
