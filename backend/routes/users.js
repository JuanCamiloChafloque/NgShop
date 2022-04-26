const express = require("express");
const router = express.Router();

//Controllers
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
} = require("../controllers/userController");

// Auth Middlewares
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(isAuthenticatedUser, getAllUsers);
router
  .route("/:id")
  .get(isAuthenticatedUser, getUserById)
  .put(isAuthenticatedUser, updateUserById);

module.exports = router;
