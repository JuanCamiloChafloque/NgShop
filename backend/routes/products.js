const express = require("express");
const router = express.Router();

//Controllers
const {
  createProduct,
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  updateProductById,
  deleteProduct,
} = require("../controllers/productController");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/featured").get(getFeaturedProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProduct);

module.exports = router;
