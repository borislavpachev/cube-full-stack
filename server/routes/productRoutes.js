const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(authController.restrictTo('Admin'), productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(authController.restrictTo('Admin'), productController.updateProduct)
  .delete(authController.restrictTo('Admin'), productController.deleteProduct);

module.exports = router;
