const User = require('../models/userModel');
const Product = require('../models/productModel');
const CustomError = require('../utils/CustomError');
const httpStatus = require('../utils/httpStatus');

exports.getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const userCart = user.shoppingCart;

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        shoppingCart: userCart,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const {
      _id: productId,
      quantity: productQuantity,
      size: productSize,
    } = req.body;

    const userId = req.user._id;
    const user = await User.findById(userId);

    let shoppingCartItem;
    let shoppingCart = [...user.shoppingCart];

    const product = await Product.findById(productId);

    if (!product) {
      return next(
        new CustomError('This product does not exist', httpStatus.NOT_FOUND)
      );
    } else if (product.quantity[productSize] < productQuantity) {
      return next(
        new CustomError(
          'Not enough products left in stock',
          httpStatus.BAD_REQUEST
        )
      );
    } else {
      shoppingCartItem = {
        productId,
        quantity: productQuantity,
        size: productSize,
      };
    }

    const final = shoppingCart.reduce((acc, item) => {
      if (
        item.productId === shoppingCartItem.productId &&
        item.size === productSize
      ) {
        item.quantity += productQuantity;
        acc.push(item);
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    const productExists = shoppingCart.some(
      (item) =>
        item.productId === shoppingCartItem.productId &&
        item.size === productSize
    );

    if (!productExists) {
      final.push(shoppingCartItem);
    }

    product.quantity[productSize] - productQuantity;
    const updatedQuantity = product.quantity;
    console.log(updatedQuantity);
    // await Product.findByIdAndUpdate(productId,
    //     {quantity: },
    //   {  runValidators:true,}
    // )

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { shoppingCart: final },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        shoppingCart: updatedUser.shoppingCart,
      },
    });
  } catch (error) {
    return next(new CustomError(error.message, error.status));
  }
};

// exports.emptyCart = async (req, res, next) => {
//   try {
//   } catch (error) {
//     return next(new CustomError(error.message, error.status));
//   }
// };
