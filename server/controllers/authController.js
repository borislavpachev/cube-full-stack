const CustomError = require('../utils/CustomError');
const httpStatus = require('../utils/httpStatus');
const authService = require('../services/authService');
const jwtService = require('../services/jwtService');

const jwtInCookie = (res, token) => {
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const jwtCookieExpires = new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * oneDayInMs
  );

  res.cookie('jwt', token, {
    expires: jwtCookieExpires,
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await authService.signUpUser(req, next);
    if (!newUser) return;
    const token = jwtService.signToken(newUser._id);

    jwtInCookie(res, token);

    newUser.password = undefined;
    newUser.passwordConfirm = undefined;

    res.status(httpStatus.CREATED).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.login = async (req, res, next) => {
  try {
    const [token, user] = await authService.loginUser(req, res, next);

    if (!token || !user) {
      return;
    }

    jwtInCookie(res, token);

    res.status(httpStatus.OK).json({
      status: 'success',
      token,
      user,
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.logout = async (req, res, next) => {
  try {
    jwtInCookie(res, null);

    res.status(httpStatus.OK).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const user = await authService.authenticateUser(req, res, next);

    if (!user) {
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      user,
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.protect = async (req, res, next) => {
  try {
    const currentUser = await authService.protect(req, res, next);
    req.user = currentUser;

    next();
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomError(
          'You do not have permission for this action',
          httpStatus.FORBIDDEN
        )
      );
    }
    next();
  };
};
