const User = require('../models/userModel');
const CustomError = require('../utils/CustomError');
const jwtService = require('./jwtService');
const httpStatus = require('../utils/httpStatus');

exports.signUpUser = async (req, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  if (!newUser) {
    return next(new CustomError('Sign Up failed', httpStatus.BAD_REQUEST));
  }

  return newUser;
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new CustomError(
        'No email or password provided. Please try again.',
        httpStatus.UNAUTHORIZED
      )
    );
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(
      new CustomError('Incorrect email or password!', httpStatus.UNAUTHORIZED)
    );
  }

  if (user.isBlocked) {
    return next(
      new CustomError('Your account is blocked!', httpStatus.UNAUTHORIZED)
    );
  }

  const correct = await user.correctPassword(password, user.password);

  if (!correct) {
    return next(
      new CustomError('Incorrect email or password', httpStatus.UNAUTHORIZED)
    );
  }

  const token = jwtService.signToken(user._id);

  if (!token) {
    return next(
      new CustomError('Incorrect email or password', httpStatus.UNAUTHORIZED)
    );
  }

  return [token, user];
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new CustomError('Please login to get access', httpStatus.UNAUTHORIZED)
    );
  }

  const decoded = jwtService.verifyToken(token, process.env.JWT_SECRET, next);

  if (!decoded) {
    return;
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new CustomError(
        'The user belonging this token does not exist',
        httpStatus.NOT_FOUND
      )
    );
  }

  return currentUser;
};

exports.authenticateUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(
      new CustomError('Please login to get access', httpStatus.UNAUTHORIZED)
    );
  }

  const decoded = jwtService.verifyToken(token, process.env.JWT_SECRET, next);

  if (!decoded) {
    return;
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new CustomError(
        'The user belonging this token does not exist',
        httpStatus.NOT_FOUND
      )
    );
  }

  return currentUser;
};
