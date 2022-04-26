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

// Auth Middlewares
const { isAuthenticatedUser } = require("../middleware/auth");

router
  .route("/")
  .get(isAuthenticatedUser, getAllProducts)
  .post(isAuthenticatedUser, createProduct);

router.route("/featured").get(isAuthenticatedUser, getFeaturedProducts);
router
  .route("/:id")
  .get(isAuthenticatedUser, getProductById)
  .put(isAuthenticatedUser, updateProductById)
  .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
