const Order = require("../models/Order");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const newOrder = await Order.create(req.body);
  res.status(201).json({ success: true, order: newOrder });
});
