const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const favoritesController = require('../controllers/favoritesController');

router.use(authController.protect);

router
  .route('/')
  .get(favoritesController.getAllFavorites)
  .patch(favoritesController.addFavorite)
  .delete(favoritesController.removeFavorite);

module.exports = router;
