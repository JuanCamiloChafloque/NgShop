const express = require("express");
const router = express.Router();

//Controllers
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
} = require("../controllers/userController");

// Auth Middlewares
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(getAllUsers);
router
  .route("/:id")
  .get(isAuthenticatedUser, getUserById)
  .put(isAuthenticatedUser, isAuthorizedRoles(), updateUserById)
  .delete(isAuthenticatedUser, isAuthorizedRoles(), deleteUser);

module.exports = router;
