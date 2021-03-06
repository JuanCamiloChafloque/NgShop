const dotenv = require("dotenv");
const database = require("../config/database");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

const products = require("../data/products.json");
const categories = require("../data/categories.json");
const orders = require("../data/orders.json");

dotenv.config();
database();

const seedDatabase = async () => {
  try {
    await Category.deleteMany({});
    await Category.insertMany(categories);

    await Product.deleteMany({});
    await Product.insertMany(products);

    await Order.deleteMany({});
    await Order.insertMany(orders);

    console.log("Database initialized!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDatabase();
