const User = require('../models/userModel');
const AppError = require('../utils/AppError');

exports.getAllUsers = async () => {
  const allUsers = await User.find();

  return allUsers;
};

exports.createUser = async (req, res, next) => {
  const newUser = await User.create(req.body);

  if (!newUser) {
    return next(new AppError('Could not create this user', 404));
  }

  return newUser;
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError(`User with id: ${id} does not exists`, 404));
  }

  return user;
};

exports.updateUserById = async (req, res, next) => {
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(new AppError(`User with id: ${id} does not exists`, 404));
  }

  return updatedUser;
};

exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  const userToDelete = await User.findByIdAndDelete(id);

  if (!userToDelete) {
    return next(new AppError(`User with id: ${id} does not exists`, 404));
  }

  return userToDelete;
};

exports.updateCurrentlyLoggedInUserPassword = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new AppError('Password fields can not be empty', 404));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  return user;
};

exports.updateCurrentlyLoggedInUserData = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (req.body.password || req.body.passwordConfirm || req.body.role) {
    return next(new AppError('This route is for user data update only', 404));
  }

  return user;
};

exports.deleteCurrentlyLoggedInUser = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new AppError(`No user with id: ${id}`, 404));
  }

  return user;
};
