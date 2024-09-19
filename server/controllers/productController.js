/* eslint-disable no-unused-vars */
const productServices = require('../services/productServices');
const AppError = require('../utils/AppError');

exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await productServices.getAllProducts();

    res.status(200).json({
      status: 'success',
      results: allProducts.length,
      data: {
        products: allProducts,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await productServices.createProduct(req);

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await productServices.getProduct(req);

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productServices.updateProduct(req, res, next);

    res.status(201).json({
      status: 'success',
      data: {
        product: updatedProduct,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await productServices.deleteProduct(req, res, next);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(new AppError(error.message, error.status));
  }
};
