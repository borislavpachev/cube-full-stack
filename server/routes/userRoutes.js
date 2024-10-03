const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/auth', authController.authenticate);
router.use(authController.protect);

router.patch('/me/update-password', userController.updateLoggedInUserPassword);

router
  .route('/me')
  .patch(userController.updateLoggedInUserData)
  .delete(userController.deleteLoggedInUser);

router.use(authController.restrictTo('Admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
