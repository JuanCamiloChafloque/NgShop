const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const newUser = await User.create(req.body);
  sendToken(newUser, 201, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password are entered
  if (!email || !password) {
    next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new ErrorHandler("Invalid Email: email not found", 401));
  }

  //Checks for password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Incorrect password.", 401));
  }

  sendToken(user, 200, res);
});
