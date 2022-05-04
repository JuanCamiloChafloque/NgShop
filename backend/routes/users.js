const express = require("express");
const router = express.Router();

//Controllers
const {
  register,
  login,
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUserById,
  deleteUser,
  logout,
} = require("../controllers/userController");

// Auth Middlewares
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/current").get(isAuthenticatedUser, getCurrentUser);
router.route("/").get(isAuthenticatedUser, isAuthorizedRoles(), getAllUsers);
router
  .route("/:id")
  .get(isAuthenticatedUser, isAuthorizedRoles(), getUserById)
  .put(isAuthenticatedUser, isAuthorizedRoles(), updateUserById)
  .delete(isAuthenticatedUser, isAuthorizedRoles(), deleteUser);

module.exports = router;
