const User = require('../models/userModel');
const httpStatus = require('../utils/httpStatus');
const CustomError = require('../utils/CustomError');

exports.getAllUsers = async () => {
  const allUsers = await User.find();

  return allUsers;
};

exports.createUser = async (req, res, next) => {
  const newUser = await User.create(req.body);

  if (!newUser) {
    return next(
      new CustomError('Could not create this user', httpStatus.BAD_REQUEST)
    );
  }

  return newUser;
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(
      new CustomError(
        `User with id: ${id} does not exist`,
        httpStatus.NOT_FOUND
      )
    );
  }

  return user;
};

exports.findUserById = async (id, next) => {
  const user = await User.findById(id);

  if (!user) {
    return next(
      new CustomError(
        `User with id: ${id} does not exist`,
        httpStatus.NOT_FOUND
      )
    );
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
    return next(
      new CustomError(
        `User with id: ${id} does not exist`,
        httpStatus.NOT_FOUND
      )
    );
  }

  return updatedUser;
};

exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  const userToDelete = await User.findByIdAndDelete(id);

  if (!userToDelete) {
    return next(
      new CustomError(
        `User with id: ${id} does not exist`,
        httpStatus.NOT_FOUND
      )
    );
  }

  return userToDelete;
};

exports.updateLoggedInUserPassword = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError('User not found', httpStatus.NOT_FOUND));
  }

  if (!req.body.password || !req.body.passwordConfirm) {
    return next(
      new CustomError(
        'Password fields can not be empty',
        httpStatus.BAD_REQUEST
      )
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  return user;
};

exports.updateLoggedInUserData = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!user) {
    return next(new CustomError('User not found', httpStatus.NOT_FOUND));
  }

  if (req.body.password || req.body.passwordConfirm || req.body.role) {
    return next(
      new CustomError(
        'This route is for user data update only',
        httpStatus.NOT_FOUND
      )
    );
  }

  return user;
};

exports.deleteLoggedInUser = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(
      new CustomError(`No user with id: ${id}`, httpStatus.NOT_FOUND)
    );
  }

  return user;
};
