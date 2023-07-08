const jwt = require("jsonwebtoken");

const generateToken = (email) => {
  const payload = {user: email};
  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
};

module.exports = {generateToken};
