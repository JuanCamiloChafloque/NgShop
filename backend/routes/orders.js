const express = require("express");
const router = express.Router();

//Controllers
const {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getTotalSales,
  getUserOrders,
} = require("../controllers/orderController");

// Auth Middlewares
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");

router.route("/").get(getAllOrders).post(isAuthenticatedUser, createOrder);

router
  .route("/sales")
  .get(isAuthenticatedUser, isAuthorizedRoles(), getTotalSales);

router.route("/order/me").get(isAuthenticatedUser, getUserOrders);

router
  .route("/:id")
  .get(getOrderById)
  .put(updateOrderStatus)
  .delete(deleteOrder);

module.exports = router;
