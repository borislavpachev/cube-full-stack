const Product = require('../models/productModel');
const User = require('../models/userModel');
const CustomError = require('../utils/CustomError');
const httpStatus = require('../utils/httpStatus');
const userService = require('./userService');

const validateProduct = async (productId, size, quantity, next) => {
  let shoppingCartItem;
  const product = await Product.findById(productId);

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
      productId,
      quantity,
      size,
    };
  }

  return [product, shoppingCartItem];
};

const checkProductExistence = (shoppingCart, shoppingCartItem, size) => {
  return shoppingCart.some(
    (item) =>
      item.productId === shoppingCartItem.productId && item.size === size
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
    if (item.productId === shoppingCartItem.productId && item.size === size) {
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
      item.productId === shoppingCartItem.productId &&
      item.size === shoppingCartItem.size &&
      item.quantity < shoppingCartItem.quantity
    );
  });
};

exports.getCart = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    return next(
      new CustomError(
        `User with id: ${userId} does not exist`,
        httpStatus.NOT_FOUND
      )
    );
  }
  const shoppingCart = user.shoppingCart;

  return shoppingCart;
};

exports.addToCart = async (req, res, next) => {
  const {
    _id: productId,
    quantity: productQuantity = 1,
    size: productSize,
  } = req.body;

  const userId = req.user._id;
  const user = await userService.findUserById(userId, next);

  const shoppingCart = user.shoppingCart;

  const [product, shoppingCartItem] = await validateProduct(
    productId,
    productSize,
    productQuantity,
    next
  );

  const updatedShoppingCart = updateCartItems(
    shoppingCart,
    shoppingCartItem,
    productSize,
    productQuantity,
    'add'
  );

  const productExists = checkProductExistence(
    shoppingCart,
    shoppingCartItem,
    productSize
  );

  if (!productExists) {
    updatedShoppingCart.push(shoppingCartItem);
  }

  const updatedQuantity = updateQuantity(
    product,
    productSize,
    productQuantity,
    'add'
  );

  await Product.findByIdAndUpdate(
    productId,
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
  const {
    _id: productId,
    quantity: productQuantity = 1,
    size: productSize,
  } = req.body;

  const userId = req.user._id;
  const user = await userService.findUserById(userId, next);

  const shoppingCart = user.shoppingCart;
  let shoppingCartItem;

  const product = await Product.findById(productId);
  if (!product) {
    return next(
      new CustomError('This product does not exist', httpStatus.NOT_FOUND)
    );
  } else {
    shoppingCartItem = {
      productId,
      quantity: productQuantity,
      size: productSize,
    };
  }

  const productExists = checkProductExistence(
    shoppingCart,
    shoppingCartItem,
    productSize
  );

  if (!productExists) {
    return next(
      new CustomError(
        'This product is not in the shopping cart',
        httpStatus.NOT_FOUND
      )
    );
  }

  const check = checkQuantity(shoppingCart, shoppingCartItem);
  if (check) {
    return next(
      new CustomError(
        'Can not remove more elements than the elements in the cart',
        httpStatus.BAD_REQUEST
      )
    );
  }

  const updatedQuantity = updateQuantity(
    product,
    productSize,
    productQuantity,
    'remove'
  );

  await Product.findByIdAndUpdate(
    productId,
    { quantity: updatedQuantity },
    { runValidators: true }
  );

  const updatedShoppingCart = updateCartItems(
    shoppingCart,
    shoppingCartItem,
    productSize,
    productQuantity,
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
