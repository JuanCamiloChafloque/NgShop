const express = require("express");
const router = express.Router();

//Controllers
const {
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.route("/").post(createCategory);
router.route("/:id").delete(deleteCategory);

module.exports = router;
