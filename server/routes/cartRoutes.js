const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

router.use(authController.protect);

router
  .route('/')
  .get(cartController.getCart)
  .patch(cartController.addToCart)
//   .delete(cartController.emptyCart);

module.exports = router;
