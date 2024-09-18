/* eslint-disable no-unused-vars */
const Product = require('../models/productModel');
const productServices = require('../services/productServices');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const allProducts = await productServices.getAllProducts();

  res.status(200).json({
    status: 'success',
    results: allProducts.length,
    data: {
      products: allProducts,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await productServices.createProduct(req, res);

  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await productServices.getProduct(req, res);

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await productServices.updateProduct(req, res, next);

  res.status(201).json({
    status: 'success',
    data: {
      product: updatedProduct,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  await productServices.deleteProduct(req, res, next);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
