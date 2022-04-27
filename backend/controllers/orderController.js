const Order = require("../models/Order");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const newOrder = await Order.create(req.body);
  const order = await Order.findById(newOrder._id).populate(
    "orderItems.product"
  );
  const totalPrice = order.orderItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  order.totalPrice = totalPrice;
  await order.save();
  res.status(201).json({ success: true, order: order });
});

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({})
    .populate(["orderItems.product", "user"])
    .sort({ dateOrdered: -1 });
  if (!orders) {
    return next(new ErrorHandler("There are no orders registered.", 404));
  }
  res.status(200).json({ success: true, count: orders.length, orders: orders });
});

exports.getTotalSales = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({});
  console.log(orders);
  if (!orders) {
    return next(new ErrorHandler("There are no orders registered.", 404));
  }

  const totalSales = orders.reduce((acc, item) => acc + item.totalPrice, 0);

  res.status(200).json({ success: true, totalSales: totalSales });
});

exports.getOrderById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate([
    "orderItems.product",
    "user",
  ]);
  if (!order) {
    return next(
      new ErrorHandler("The order with id " + id + " does not exist", 404)
    );
  }
  res.status(200).json({ success: true, order: order });
});

exports.getUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate([
    "orderItems.product",
    "user",
  ]);
  if (!orders) {
    return next(new ErrorHandler("User does not have any orders placed", 404));
  }
  res.status(200).json({ success: true, orders: orders });
});

exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return next(
      new ErrorHandler("The order with id " + id + " does not exist", 404)
    );
  }

  order.status = req.body.status;
  const newOrder = await order.save();

  res.status(200).json({ success: true, order: newOrder });
});

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return next(
      new ErrorHandler("The order with id " + id + " does not exist", 404)
    );
  }

  await Order.deleteOne({ _id: id });
  res
    .status(200)
    .json({ success: true, message: "Order deleted successfully." });
});
