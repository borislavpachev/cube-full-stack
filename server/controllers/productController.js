const productServices = require('../services/productServices');
const CustomError = require('../utils/CustomError');
const httpStatus = require('../utils/httpStatus');

exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await productServices.getAllProducts();

    res.status(httpStatus.OK).json({
      status: 'success',
      results: allProducts.length,
      data: {
        products: allProducts,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.getAllProductsByCategory = async (req, res, next) => {
  try {
    const products = await productServices.getAllProductsByCategory(
      req,
      res,
      next
    );

    res.status(httpStatus.OK).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await productServices.createProduct(req);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await productServices.getProduct(req);

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productServices.updateProduct(req, res, next);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: {
        product: updatedProduct,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await productServices.deleteProduct(req, res, next);

    res.status(httpStatus.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};
