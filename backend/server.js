const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const db = require("./config/database");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errors");
const bodyParser = require("body-parser");

dotenv.config();

//Routes
const categories = require("./routes/categories");
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");

//Middlewares
db();

const app = express();
const PORT = process.env.PORT || 5000;

//Multer Middleware
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: imageFilter }).single("image")
);

app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public", "uploads"))
);

//JSON Parser middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//CORS
app.use((req, res, next) => {
  res.header("Content-Type: application/json");
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

//Routes Initialization
app.use("/api/v1/categories", categories);
app.use("/api/v1/products", products);
app.use("/api/v1/users", users);
app.use("/api/v1/orders", orders);

//Error middleware
app.use(errorMiddleware);

//Port listener
const server = app.listen(
  PORT,
  console.log(
    "Server running on " + process.env.NODE_ENV + " mode on port " + PORT
  )
);

//Error handling for shutting down the server
process.on("uncaughtException", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down server due to uncaught rejection ");
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down server due to unhandled promise rejection ");
  server.close(() => {
    process.exit(1);
  });
});
