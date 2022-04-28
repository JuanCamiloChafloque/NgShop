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
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");

router
  .route("/")
  .get(getAllProducts)
  .post(isAuthenticatedUser, isAuthorizedRoles(), createProduct);

router.route("/featured").get(getFeaturedProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(isAuthenticatedUser, isAuthorizedRoles(), updateProductById)
  .delete(isAuthenticatedUser, isAuthorizedRoles(), deleteProduct);

module.exports = router;
