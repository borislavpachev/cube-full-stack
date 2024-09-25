const Product = require('../models/productModel');
const User = require('../models/userModel');
const httpStatus = require('../utils/httpStatus');
const CustomError = require('../utils/CustomError');
const validateMongoId = require('../utils/validateMongo');
const userService = require('./userService');

const validateAddProduct = async (id, size, quantity, next) => {
  const _id = await validateMongoId(id, next);
  let shoppingCartItem;

  const product = await Product.findById(_id);

  if (!product) {
    return next(
      new CustomError('This product does not exist', httpStatus.NOT_FOUND)
    );
  } else if (product.quantity[size] < quantity) {
    return next(
      new CustomError('Not enough products left in stock', httpStatus.NOT_FOUND)
    );
  } else {
    shoppingCartItem = {
      _id,
      quantity,
      size,
    };
  }

  return [product, shoppingCartItem];
};

const validateRemoveProduct = async (id, size, quantity, next) => {
  const _id = await validateMongoId(id, next);

  let shoppingCartItem;

  const product = await Product.findById(_id);
  if (!product) {
    return next(
      new CustomError('This product does not exist', httpStatus.NOT_FOUND)
    );
  } else {
    shoppingCartItem = {
      _id,
      quantity,
      size,
    };
  }
  return [product, shoppingCartItem];
};

const checkProductExistence = (shoppingCart, shoppingCartItem, size) => {
  return shoppingCart.some(
    (item) => item._id === shoppingCartItem._id && item.size === size
  );
};

const updateCartItems = (
  shoppingCart,
  shoppingCartItem,
  size,
  quantity,
  action
) => {
  return shoppingCart.reduce((cart, item) => {
    if (item._id === shoppingCartItem._id && item.size === size) {
      if (action === 'add') {
        item.quantity += quantity;
      } else if (action === 'remove') {
        if (item.quantity <= quantity) {
          return cart;
        } else {
          item.quantity -= quantity;
        }
      }
      cart.push(item);
    } else {
      cart.push(item);
    }
    return cart;
  }, []);
};

const updateQuantity = (product, size, quantity, action) => {
  let newProductQuantity;
  if (action === 'add') {
    newProductQuantity = product.quantity[size] - quantity;
  } else if (action === 'remove') {
    newProductQuantity = product.quantity[size] + quantity;
  }
  const updatedQuantity = {
    ...product.quantity,
    [size]: newProductQuantity,
  };

  return updatedQuantity;
};

const checkQuantity = (shoppingCart, shoppingCartItem) => {
  return shoppingCart.some((item) => {
    return (
      item._id === shoppingCartItem._id &&
      item.size === shoppingCartItem.size &&
      item.quantity < shoppingCartItem.quantity
    );
  });
};

exports.getCart = async (req, res, next) => {
  const userId = req.user._id;
  const user = await userService.findUserById(userId, next);
  if (!user) return;

  const shoppingCart = user.shoppingCart;

  return shoppingCart;
};

exports.addToCart = async (req, res, next) => {
  const { _id, quantity = 1, size } = req.body;

  const userId = req.user._id;
  const user = await userService.findUserById(userId, next);

  const shoppingCart = user.shoppingCart;

  const [product, shoppingCartItem] = await validateAddProduct(
    _id,
    size,
    quantity,
    next
  );
  if (!product) return;

  const updatedShoppingCart = updateCartItems(
    shoppingCart,
    shoppingCartItem,
    size,
    quantity,
    'add'
  );

  const productExists = checkProductExistence(
    shoppingCart,
    shoppingCartItem,
    size
  );

  if (!productExists) {
    updatedShoppingCart.push(shoppingCartItem);
  }

  const updatedQuantity = updateQuantity(product, size, quantity, 'add');

  await Product.findByIdAndUpdate(
    _id,
    { quantity: updatedQuantity },
    { runValidators: true }
  );

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { shoppingCart: updatedShoppingCart },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedUser;
};

exports.removeFromCart = async (req, res, next) => {
  const { _id, quantity = 1, size } = req.body;

  const userId = req.user._id;
  const user = await userService.findUserById(userId, next);

  const shoppingCart = user.shoppingCart;
  const [product, shoppingCartItem] = await validateRemoveProduct(
    _id,
    size,
    quantity,
    next
  );
  if (!product) return;

  const productExists = checkProductExistence(
    shoppingCart,
    shoppingCartItem,
    size
  );

  if (!productExists) {
    return next(
      new CustomError(
        'This product is not in the shopping cart',
        httpStatus.NOT_FOUND
      )
    );
  }

  const checkProductQuantity = checkQuantity(shoppingCart, shoppingCartItem);

  if (checkProductQuantity) {
    return next(
      new CustomError(
        'Can not remove more elements than the elements in the cart',
        httpStatus.BAD_REQUEST
      )
    );
  }

  const updatedQuantity = updateQuantity(product, size, quantity, 'remove');

  await Product.findByIdAndUpdate(
    _id,
    { quantity: updatedQuantity },
    { runValidators: true }
  );

  const updatedShoppingCart = updateCartItems(
    shoppingCart,
    shoppingCartItem,
    size,
    quantity,
    'remove'
  );

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { shoppingCart: updatedShoppingCart },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedUser;
};
