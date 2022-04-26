const dotenv = require("dotenv");
const database = require("../config/database");
const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

const products = require("../data/products.json");
const users = require("../data/users.json");
const categories = require("../data/categories.json");
const orders = require("../data/orders.json");
const orderItems = require("../data/orderitems.json");

dotenv.config();
database();

const seedDatabase = async () => {
  try {
    await Category.deleteMany({});
    await Category.insertMany(categories);

    await Product.deleteMany({});
    await Product.insertMany(products);

    //await Order.deleteMany({});
    //await Order.insertMany(orders);

    //await User.deleteMany({});
    //await User.insertMany(users);

    console.log("Database initialized!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDatabase();
