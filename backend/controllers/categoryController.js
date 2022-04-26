const Category = require("../models/Category");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const category = {
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  };

  const newCategory = await Category.create(category);
  res.status(201).json({ success: true, category: newCategory });
});

exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();
  console.log(categories);
  if (!categories) {
    return next(new ErrorHandler("There are no categories registered.", 404));
  }
  res.status(200).json({ success: true, categories: categories });
});

exports.getCategoryById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(
      new ErrorHandler("The category with id " + id + " does not exist", 404)
    );
  }
  res.status(200).json({ success: true, category: category });
});

exports.updateCategoryById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(
      new ErrorHandler("The category with id " + id + " does not exist", 404)
    );
  }

  const newCategory = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, category: newCategory });
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const category = Category.findById(id);
  if (!category) {
    return next(
      new ErrorHandler("The category with id " + id + " does not exist", 404)
    );
  }

  await Category.deleteOne({ _id: id });
  res
    .status(200)
    .json({ success: true, message: "Category deleted successfully." });
});
