const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

router.use(authController.protect);

router
  .route('/')
  .get(orderController.getAllOrders)
  .put(orderController.createOrder);

router.use(authController.restrictTo('Admin'));
router.route('/:id').delete(orderController.deleteOrder);

module.exports = router;
