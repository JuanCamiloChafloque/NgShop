const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({ success: true, user: newUser });
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

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({}).select("-password");
  if (!users) {
    return next(new ErrorHandler("There are no users registered.", 404));
  }
  res.status(200).json({ success: true, count: users.length, users: users });
});

exports.getUserById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) {
    return next(
      new ErrorHandler("The user with id " + id + " does not exist", 404)
    );
  }
  res.status(200).json({ success: true, user: user });
});

exports.getCurrentUser = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("There is no current user logged in", 404));
  }
  res.status(200).json({ success: true, user: req.user });
});

exports.updateUserById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!req.body.name || !req.body.email) {
    return next(new ErrorHandler("Please enter your name and email", 400));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(
      new ErrorHandler("The user with id " + id + " does not exist", 404)
    );
  }

  user.name = req.body.name;
  user.email = req.body.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const newUser = await user.save();

  res.status(200).json({ success: true, user: newUser });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(
      new ErrorHandler("The user with id " + id + " does not exist", 404)
    );
  }

  await User.deleteOne({ _id: id });
  res
    .status(200)
    .json({ success: true, message: "User deleted successfully." });
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: false });
  res.status(200).json({ success: true, message: "Logged out" });
});
