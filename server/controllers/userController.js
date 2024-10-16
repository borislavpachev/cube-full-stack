const CustomError = require('../utils/CustomError');
const userService = require('../services/userService');
const httpStatus = require('../utils/httpStatus');

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await userService.getAllUsers();

    res.status(httpStatus.OK).json({
      status: 'success',
      results: allUsers.length,
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req, res, next);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req, res, next);
    if (!user) return;

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUserById(req, res, next);
    if (!updatedUser) return;

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUserById(req, res, next);
    if (!user) return;

    res.status(httpStatus.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.updateLoggedInUserPassword = async (req, res, next) => {
  try {
    const user = await userService.updateLoggedInUserPassword(req, res, next);

    if (!user) return;

    res.status(httpStatus.CREATED).json({
      status: 'success',
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.updateLoggedInUserData = async (req, res, next) => {
  try {
    const user = await userService.updateLoggedInUserData(req, res, next);
    if (!user) return;

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.deleteLoggedInUser = async (req, res, next) => {
  try {
    const user = await userService.deleteLoggedInUser(req);

    if (!user) return;

    res.status(httpStatus.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.blockUser = async (req, res, next) => {
  try {
    const user = await userService.blockUser(req, res, next);
    if (!user) return;

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.unBlockUser = async (req, res, next) => {
  try {
    const user = await userService.unBlockUser(req, res, next);
    if (!user) return;

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};
