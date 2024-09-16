const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

// exports.restrictTo = (...roles) => {
//   return catchAsync(async (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(new Error('You do not have permission for this action', 403));
//     }
//     next();
//   });
// };
