const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({ success: true, product: newProduct });
});

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const products = await Product.find(filter).populate("category");
  if (!products) {
    return next(new ErrorHandler("There are no products registered.", 404));
  }
  res
    .status(200)
    .json({ success: true, count: products.length, products: products });
});

exports.getFeaturedProducts = catchAsyncErrors(async (req, res, next) => {
  const count = req.query.count || Number.MAX_VALUE;
  const products = await Product.find({ isFeatured: true })
    .limit(count)
    .populate("category");
  if (!products) {
    return next(new ErrorHandler("There are no featured products.", 404));
  }
  res
    .status(200)
    .json({ success: true, count: products.length, products: products });
});

exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("category");
  if (!product) {
    return next(
      new ErrorHandler("The product with id " + id + " does not exist", 404)
    );
  }
  res.status(200).json({ success: true, product: product });
});

exports.updateProductById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(
      new ErrorHandler("The product with id " + id + " does not exist", 404)
    );
  }
  const newProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, product: newProduct });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(
      new ErrorHandler("The product with id " + id + " does not exist", 404)
    );
  }

  await Product.deleteOne({ _id: id });
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully." });
});
