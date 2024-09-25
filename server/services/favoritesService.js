const User = require('../models/userModel');
const Product = require('../models/productModel');
const httpStatus = require('../utils/httpStatus');
const CustomError = require('../utils/CustomError');
const userService = require('./userService');

const validateProduct = async (productId, productSize, next) => {
  let favorite;
  const product = await Product.findById(productId);

  if (!product) {
    return next(
      new CustomError('This product does not exist', httpStatus.NOT_FOUND)
    );
  } else {
    favorite = {
      productId,
      productSize,
    };
  }
  return favorite;
};

const checkProductExistence = (favorites, favorite, size) => {
  return favorites.some(
    (item) => item.productId === favorite.productId && item.productSize === size
  );
};

exports.getAllFavorites = async (req) => {
  const userId = req.user._id;
  const user = await userService.findUserById(userId);
  const favorites = user.favorites;

  return favorites;
};

exports.addFavorite = async (req, res, next) => {
  const { _id: productId, size: productSize } = req.body;

  const userId = req.user._id;
  const user = await userService.findUserById(userId, next);
  const favorites = user.favorites;

  const favorite = await validateProduct(productId, productSize, next);

  favorites.push(favorite);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { favorites: favorites },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedUser;
};

exports.removeFavorite = async (req, res, next) => {
  const { _id: productId, size: productSize } = req.body;

  const userId = req.user._id;
  const user = await userService.findUserById(userId, next);
  const favorites = user.favorites;

  const favorite = await validateProduct(productId, productSize, next);
  const productExists = checkProductExistence(favorites, favorite, productSize);

  if (!productExists) {
    return next(
      new CustomError(
        'This product is not in the favorites list',
        httpStatus.NOT_FOUND
      )
    );
  }

  const updatedFavorites = favorites.filter((item) => {
    if (
      item.productId === favorite.productId &&
      item.productSize !== favorite.productSize
    ) {
      return item;
    } else if (item.productId !== favorite.productId) {
      return item;
    }
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { favorites: updatedFavorites },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedUser;
};
