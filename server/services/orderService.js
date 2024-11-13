const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const CustomError = require('../utils/CustomError');
const httpStatus = require('../utils/httpStatus');
const userService = require('../services/userService');

const getTotalPrice = async (shoppingCart) => {
  const allPrices = await Promise.all(
    shoppingCart.map(async (item) => {
      const product = await Product.findById(item._id);
      return product.price * item.quantity;
    })
  );

  const totalPrice = allPrices.reduce((total, price) => total + price, 0);
  return totalPrice;
};

exports.getAllOrdersByUser = async (req, res, next) => {
  const userId = req.user._id;
  const orders = (await Order.find({ userId: userId })) || [];

  if (!orders) {
    return next(
      new CustomError('No orders found for this user', httpStatus.NOT_FOUND)
    );
  }
  return orders;
};

exports.createOrder = async (req, res, next) => {
  const userId = req.user._id;
  const user = await userService.findUserById(userId, next);

  if (!user) return;

  const shoppingCart = user.shoppingCart;
  if (shoppingCart.length === 0) {
    return next(
      new CustomError('The shopping cart is empty', httpStatus.BAD_REQUEST)
    );
  }
  const totalPrice = await getTotalPrice(shoppingCart);

  const newOrder = await Order.create({
    userId,
    products: shoppingCart,
    totalPrice,
    orderStatus: 'In Progress',
    createdAt: new Date(Date.now()),
  });

  await User.findByIdAndUpdate(
    userId,
    { shoppingCart: [] },
    {
      new: true,
      runValidators: true,
    }
  );

  return newOrder;
};

exports.deleteOrder = async (req, res, next) => {
  const { id } = req.params;

  const deleted = await Order.findByIdAndDelete(id);
  if (!deleted) {
    return next(
      new CustomError(
        `Failed to delete order with id: ${id}`,
        httpStatus.NOT_FOUND
      )
    );
  }
  const products = deleted.products;

  await Promise.all(
    products.map(async (product) => {
      const productToUpdate = await Product.findById(product._id);

      const newQuantity =
        productToUpdate.quantity[product.size] + product.quantity;

      const updatedQuantity = {
        ...productToUpdate.quantity,
        [product.size]: newQuantity,
      };

      await Product.findByIdAndUpdate(
        product._id,
        { quantity: updatedQuantity },
        { new: true, runValidators: true }
      );
    })
  );

  return deleted;
};
