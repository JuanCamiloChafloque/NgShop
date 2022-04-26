const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "User email is required"],
  },
  password: {
    type: String,
    required: [true, "User password is required"],
  },
  phone: {
    type: String,
    required: [true, "User phone number is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  street: {
    type: String,
    default: "",
  },
  apartment: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", UserSchema);
