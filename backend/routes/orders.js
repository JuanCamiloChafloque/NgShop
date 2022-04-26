const express = require("express");
const router = express.Router();

//Controllers
const { createOrder } = require("../controllers/orderController");

// Auth Middlewares
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");

router.route("/").post(isAuthenticatedUser, createOrder);

module.exports = router;
