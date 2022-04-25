const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./config/database");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errors");
const bodyParser = require("body-parser");

//Dot ENV Init
if (process.env.NODE_ENV === "production") {
  dotenv.config();
}

//Routes

//Middlewares
db();

const app = express();
const PORT = process.env.PORT || 5000;

//JSON Parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes Initialization

//Error middleware
app.use(errorMiddleware);

//Build to deployment
/*if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}*/

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
