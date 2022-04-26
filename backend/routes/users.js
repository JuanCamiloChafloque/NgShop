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

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUserById);

module.exports = router;
