const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

router.route('/').get(productController.getAllProducts);
router.route('/q').get(productController.getAllProductsByCategory);

router.route('/:id').get(productController.getProduct);

router.use(authController.protect);
router
  .route('/')
  .post(authController.restrictTo('Admin'), productController.createProduct);

router
  .route('/:id')
  .patch(authController.restrictTo('Admin'), productController.updateProduct)
  .delete(authController.restrictTo('Admin'), productController.deleteProduct);

module.exports = router;
