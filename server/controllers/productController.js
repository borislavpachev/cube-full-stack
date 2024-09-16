/* eslint-disable no-unused-vars */
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const allProducts = await Product.find();

  res.status(200).json({
    status: 'success',
    results: allProducts.length,
    data: {
      products: allProducts,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    next(new Error(`Product with id: ${id} does not exists`, 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      product: updatedProduct,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  const productToDelete = await Product.findByIdAndDelete(id);

  if (!productToDelete) {
    next(new Error(`Product with id: ${id} does not exists`));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
