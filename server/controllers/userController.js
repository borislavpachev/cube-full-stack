/* eslint-disable no-unused-vars */
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find();

  res.status(200).json({
    status: 'success',
    results: allUsers.length,
    data: {
      users: allUsers,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    next(new Error(`User with id: ${id} does not exists`, 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userToDelete = await User.findByIdAndDelete(id);

  if (!userToDelete) {
    next(new Error(`User with id: ${id} does not exists`));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateCurrentUserPassword = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new Error('Password fields can not be empty'));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.save();

  res.status(201).json({
    status: 'success',
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  if (req.body.password || req.body.passwordConfirm || req.body.role) {
    return next(new Error('This route is for user data update only'));
  }

  const user = await User.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new Error(`No user with id: ${id}`));
  }

  res.status(204).json({
    status: 'success',
    message: 'Sorry for see you leaving...',
    data: null,
  });
});
