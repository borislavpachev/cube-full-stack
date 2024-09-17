/* eslint-disable no-unused-vars */
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('../utils/jwt');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return next(new Error('No email or password provided. Please try again.'));
  }

  const user = await User.findOne({ email }).select('+password');
  const correct = await user?.correctPassword(password, user.password);

  if (!user || !correct) {
    return next(new Error('Incorrect user or password'));
  }

  const token = jwt.signToken(user._id);

  // res.cookie = ('jwt', token, {
  // expires: Here we set the expires in ms
  // })

  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new Error('Please login to get access'));
  }
  const decoded = jwt.verifyToken(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new Error('The user belonging this token does not exist'));
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error('You do not have permission for this action'));
    }
    next();
  });
};
