const express = require("express");
const router = express.Router();

//Controllers
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
} = require("../controllers/categoryController");

router.route("/").get(getAllCategories).post(createCategory);
router.route("/:id").get(getCategoryById).delete(deleteCategory);

module.exports = router;
