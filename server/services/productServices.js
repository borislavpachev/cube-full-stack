const Product = require('../models/productModel');
const CustomError = require('../utils/CustomError');
const httpStatus = require('../utils/httpStatus');

exports.getAllProducts = async () => {
  const allProducts = await Product.find();
  return allProducts;
};

exports.getAllProductsByCategory = async (req, res, next) => {
  const { gender, category } = req.query;
  
  const products = await Product.find({gender,category});

  if (!products) {
    return next(
      new CustomError('No orders found for this user', httpStatus.NOT_FOUND)
    );
  }
  return products;
};

exports.createProduct = async (req) => {
  const newProduct = await Product.create(req.body);
  return newProduct;
};

exports.getProduct = async (req) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  return product;
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    next(
      new Error(`Product with id: ${id} does not exists`, httpStatus.NOT_FOUND)
    );
  }

  return updatedProduct;
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const productToDelete = await Product.findByIdAndDelete(id);

  if (!productToDelete) {
    next(
      new Error(`Product with id: ${id} does not exists`, httpStatus.NOT_FOUND)
    );
  }

  return productToDelete;
};
