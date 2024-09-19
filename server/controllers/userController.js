/* eslint-disable no-unused-vars */
const User = require('../models/userModel');
const AppError = require('../utils/AppError');

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({
      status: 'success',
      results: allUsers.length,
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return next(new AppError(`User with id: ${id} does not exists`, 404));
    }

    res.status(201).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToDelete = await User.findByIdAndDelete(id);

    if (!userToDelete) {
      return next(new AppError(`User with id: ${id} does not exists`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.updateCurrentlyLoggedInUserPassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!req.body.password || !req.body.passwordConfirm) {
      return next(new AppError('Password fields can not be empty', 404));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.save();

    res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.updateCurrentlyLoggedInUserData = async (req, res, next) => {
  try {
    const { id } = req.user;

    if (req.body.password || req.body.passwordConfirm || req.body.role) {
      return next(new AppError('This route is for user data update only', 404));
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
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.deleteCurrentlyLoggedInUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(new AppError(`No user with id: ${id}`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};
