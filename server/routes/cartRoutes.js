const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

router.use(authController.protect);

router.route('/:userId').get(cartController.getCart);

module.exports = router;
