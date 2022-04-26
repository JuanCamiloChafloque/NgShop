const express = require("express");
const router = express.Router();

//Controllers
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} = require("../controllers/categoryController");

// Auth Middlewares
const { isAuthenticatedUser } = require("../middleware/auth");

router
  .route("/")
  .get(isAuthenticatedUser, getAllCategories)
  .post(isAuthenticatedUser, createCategory);
router
  .route("/:id")
  .get(isAuthenticatedUser, getCategoryById)
  .put(isAuthenticatedUser, updateCategoryById)
  .delete(isAuthenticatedUser, deleteCategory);

module.exports = router;
