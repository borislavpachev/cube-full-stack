const CustomError = require('../utils/CustomError');
const httpStatus = require('../utils/httpStatus');
const orderService = require('../services/orderService');

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrdersByUser(req, res, next);

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.code));
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await orderService.createOrder(req, res, next);

    if (!newOrder) return;

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.code));
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const deleted = await orderService.deleteOrder(req, res, next);
    if (!deleted) return;

    res.status(httpStatus.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(new CustomError(error.message, error.code));
  }
};
