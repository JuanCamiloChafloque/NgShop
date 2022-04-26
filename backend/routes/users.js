const express = require("express");
const router = express.Router();

//Controllers
const { register, login } = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
