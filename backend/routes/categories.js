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
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");

router
  .route("/")
  .get(getAllCategories)
  .post(isAuthenticatedUser, isAuthorizedRoles(), createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategoryById)
  .delete(isAuthenticatedUser, isAuthorizedRoles(), deleteCategory);

module.exports = router;
