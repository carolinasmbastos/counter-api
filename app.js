const express = require("express");
const app = express();

bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

counter = 0;
validUsers = [];

app.use(express.urlencoded({ extended: true }));

// register a new user and retrieves a valid JWT
const { authRouter } = require("./routes/authRouter");
app.use("/auth", authRouter);

// router that handles requests to read and modify a counter
const { counterRouter } = require("./routes/counterRouter");
app.use("/api", counterRouter);

app.all("*", (req, res, next) => {
  next({
    status: 404,
    errors: `Requested path ${req.originalUrl} does not exist`
  });
});

let errorHandler = (error, req, res, next) => {
  console.log("--> error Handler: ", error);
  res.status(error.status != undefined ? error.status : "500");
  res.send(error);
};

app.use(errorHandler);

module.exports = app;
