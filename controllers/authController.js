const User = require("../models/userModel");
const {validateEmail, validatePassword} = require("../utils/validators");
const {generateToken} = require("../utils/jwtUtils");

// In-memory array to store user data
const users = [];

const login = (req, res) => {
  const {email, password} = req.body;

  // Validation
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).json({error: "Invalid email or password"});
  }

  // Find user by email
  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({error: "Invalid email or password"});
  }

  // Generate and assign token
  const token = generateToken(user.email);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  user.token = token;

  res.json({email: user.email, password: user.password, token: user.token});
};

const registration = (req, res) => {
  const {email, password, passwordRepeat} = req.body;

  // Validation
  if (
    !validateEmail(email) ||
    !validatePassword(password) ||
    password !== passwordRepeat
  ) {
    return res.status(400).json({error: "Invalid email or password"});
  }

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(409).json({error: "User already exists"});
  }

  // Create a new user
  const user = new User(email, password, null);
  users.push(user);

  res.json({success: true});
};

module.exports = {login, registration};
