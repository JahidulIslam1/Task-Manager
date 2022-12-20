const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      message: 'User Created Successfully',
      _id: user.id,
      name: user.name,
      email: user.email,
      // password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && email && password) {
    res.json({
      message: 'User Login Successful',
      _id: user.id,
      name: user.name,
      email: user.email,
      // password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: 'Login Fail',
    });
    throw new Error('Invalid credentials');
  }
});

// @desc    Get user data
// @route   GET /api/users/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    message: `User Found Successfully for id: ${req.params.id}`,
    user,
  });
});

// @desc    Get all user data for admin
// @route   GET /api/users/alluser
// @access  Private
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Generate JWT
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getAllUser,
};
