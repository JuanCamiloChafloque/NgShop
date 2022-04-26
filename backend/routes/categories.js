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

router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategoryById)
  .delete(deleteCategory);

module.exports = router;
