const favoritesService = require('../services/favoritesService');
const CustomError = require('../utils/CustomError');
const httpStatus = require('../utils/httpStatus');

exports.getAllFavorites = async (req, res, next) => {
  try {
    const favorites = await favoritesService.getAllFavorites(req);
    if (!favorites) return;

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        favorites,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    const updatedUser = await favoritesService.addFavorite(req, res, next);

    if (!updatedUser) return;

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: {
        favorites: updatedUser.favorites,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    const updatedUser = await favoritesService.removeFavorite(req, res, next);

    if (!updatedUser) return;

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        favorites: updatedUser.favorites,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};
