const express = require("express");
const router = express.Router();

//Controllers
const {} = require("../controllers/orderController");

// Auth Middlewares
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");

module.exports = router;
