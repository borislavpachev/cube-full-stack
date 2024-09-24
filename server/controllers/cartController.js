const CustomError = require('../utils/CustomError');
const httpStatus = require('../utils/httpStatus');
const cartService = require('../services/cartService');

exports.getCart = async (req, res, next) => {
  try {
    const shoppingCart = await cartService.getCart(req);

    if (!shoppingCart) return;

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        shoppingCart,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const updatedUser = await cartService.addToCart(req, res, next);

    if (!updatedUser) return;

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        shoppingCart: updatedUser.shoppingCart,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.removeItemFromCart = async (req, res, next) => {
  try {
    const updatedUser = await cartService.removeFromCart(req, res, next);

    if (!updatedUser) return;

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        shoppingCart: updatedUser.shoppingCart,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};
