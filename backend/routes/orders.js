const express = require("express");
const router = express.Router();

//Controllers
const {
  createOrder,
  getOrderById,
  getAllOrders,
} = require("../controllers/orderController");

// Auth Middlewares
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");

router
  .route("/")
  .get(isAuthenticatedUser, isAuthorizedRoles(), getAllOrders)
  .post(isAuthenticatedUser, createOrder);

router.route("/:id").get(isAuthenticatedUser, getOrderById);

module.exports = router;
