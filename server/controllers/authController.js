/* eslint-disable no-unused-vars */
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const authService = require('../services/authService');
const jwtService = require('../services/jwtService');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await authService.signUpUser(req);
    const token = jwtService.signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await authService.loginUser(req, res, next);

    if (!token) {
      return;
    }
    // res.cookie = ('jwt', token, {
    // expires: Here we set the expires in ms
    // })

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.protect = async (req, res, next) => {
  try {
    const currentUser = await authService.protect(req, res, next);
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission for this action', 403)
      );
    }
    next();
  };
};
