/* eslint-disable no-unused-vars */
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const userService = require('../services/userService');

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await userService.getAllUsers();

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
    const newUser = await userService.createUser(req, res, next);

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
    const user = await userService.getUserById(req, res, next);
    if (!user) return;

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
    const updatedUser = await userService.updateUserById(req, res, next);
    if (!updatedUser) return;

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
    const user = await userService.deleteUserById(req, res, next);
    if (!user) return;

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
    const user = await userService.updateCurrentlyLoggedInUserPassword(
      req,
      res,
      next
    );

    if (!user) return;

    res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.updateCurrentlyLoggedInUserData = async (req, res, next) => {
  try {
    const user = await userService.updateCurrentlyLoggedInUserData(
      req,
      res,
      next
    );
    if (!user) return;

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
    const user = await userService.deleteCurrentlyLoggedInUser(req, res, next);
    if (!user) return;
    
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};
